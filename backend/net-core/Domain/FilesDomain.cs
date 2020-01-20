using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Amazon;
using Amazon.S3;
using Amazon.S3.Model;
using Amazon.S3.Transfer;
using Api.Configurations;
using Api.Domain.Interfaces;
using Api.DTO;
using Api.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using MongoDB.Driver;

namespace Api.Domain
{
    public class FilesDomain : BaseDomain, IFilesDomain
    {
        private readonly IMongoCollection<ImageModel> _imagesCollection;
        private readonly IMongoCollection<FileModel> _filesCollection;

        public FilesDomain(IWebHostEnvironment environment, IHttpContextAccessor httpContextAccessor, IGeneralSettings generalSettings, IDBSettings dbSettings) : base(environment, httpContextAccessor, generalSettings)
        {
            var client = new MongoClient(dbSettings.ConnectionString);
            var database = client.GetDatabase(dbSettings.DatabaseName);

            _filesCollection = database.GetCollection<FileModel>(dbSettings.FilesCollectionName);
            _imagesCollection = database.GetCollection<ImageModel>(dbSettings.ImagesCollectionName);
        }

        #region Publics
        public DTOResponse<DTOFile> GetDocumentById(string documentId)
        {
            var existingFile = _filesCollection.Find<FileModel>(document => document.Id == documentId).FirstOrDefault();
            if (existingFile != null)
            {
                return new DTOResponse<DTOFile>()
                {
                    Code = 200,
                    Data = new DTOFile()
                    {
                        Id = existingFile.Id,
                        Url = existingFile.Url
                    }
                };
            }

            return new DTOResponse<DTOFile>()
            {
                Code = 400,
                Message = "File not found!"
            };
        }

        public DTOResponse<DTOFile> GetImageById(string imageId)
        {
            var existingFile = _imagesCollection.Find<ImageModel>(image => image.Id == imageId).FirstOrDefault();
            if(existingFile != null)
            {
                return new DTOResponse<DTOFile>()
                {
                    Code = 200,
                    Data = new DTOFile()
                    {
                        Id = existingFile.Id,
                        Url = existingFile.Url,
                        ThumbnailUrl = existingFile.ThumbnailUrl
                    }
                };
            }


            return new DTOResponse<DTOFile>()
            {
                Code = 400,
                Message = "File not found!"
            };
        }

        public DTOResponse<DTOFile> GetFileDocumentById(string documentId)
        {
            var existingFile = _filesCollection.Find<FileModel>(document => document.Id == documentId).FirstOrDefault();

            if (existingFile == null || string.IsNullOrWhiteSpace(existingFile.Path))
            {
                throw new FileNotFoundException();
            }

            if (!File.Exists(existingFile.Path))
            {
                this.DownloadFileFromS3(existingFile);

                existingFile = _filesCollection.Find<FileModel>(document => document.Id == documentId).FirstOrDefault();
            }

            _filesCollection.UpdateOne<FileModel>(document => document.Id == documentId, Builders<FileModel>.Update.Set("LastView", DateTime.Now));

            return new DTOResponse<DTOFile>()
            {
                Code = 200,
                Data = new DTOFile()
                {
                    Bytes = File.ReadAllBytes(existingFile.Path),
                    Extension = existingFile.Extension,
                    Key = existingFile.Key
                }
            };
        }

        public DTOResponse<DTOFile> UploadFile(DTOFileUpload uploadFileInfo)
        {
            if (uploadFileInfo.Files.Length == 0)
            {
                return new DTOResponse<DTOFile>()
                {
                    Code = 400,
                    Message = "You must send an file to upload!"
                };
            }

            try
            {
                var filenameParts = uploadFileInfo.Files.FileName.Split('.');
                var fileExtension = filenameParts[filenameParts.Length - 1];

                var uploadFolder = uploadFileInfo.Folder ?? "general";
                var localFileName = uploadFileInfo.Key ?? Guid.NewGuid().ToString();
                var localFinalFileName = $"{localFileName}.{fileExtension}";

                var fileUploadDirPath = $"files/docs/{uploadFolder}/{fileExtension}/";
                if (!Directory.Exists(fileUploadDirPath))
                {
                    Directory.CreateDirectory(fileUploadDirPath);
                }

                var finalFilePath = $"{fileUploadDirPath}{localFinalFileName}";
                using (FileStream filestream = File.Create(finalFilePath))
                {
                    uploadFileInfo.Files.CopyTo(filestream);
                    filestream.Flush();
                }

                FileModel fileToUpload = new FileModel()
                {
                    Key = uploadFileInfo.Key
                };

                if (!string.IsNullOrWhiteSpace(uploadFileInfo.Key))
                {
                    var existingFile = _filesCollection.Find<FileModel>(image => image.Key == uploadFileInfo.Key).FirstOrDefault();
                    if (existingFile != null)
                    {
                        fileToUpload = existingFile;
                    }
                }

                fileToUpload.Folder = uploadFolder;
                fileToUpload.Path = finalFilePath;
                fileToUpload.Extension = fileExtension;

                if (string.IsNullOrWhiteSpace(fileToUpload.Id))
                {
                    _filesCollection.InsertOne(fileToUpload);
                }
                else
                {
                    _filesCollection.UpdateOne<FileModel>(file => file.Id == fileToUpload.Id, Builders<FileModel>.Update.Set("Path", fileToUpload.Path).Set("Folder", fileToUpload.Folder).Set("Extension", fileToUpload.Extension));
                }

                this.UploadFileToS3(fileToUpload);

                fileToUpload.Url = _environment.EnvironmentName == "Development" ? $"https://localhost:5001/files/docs/{fileToUpload.Id}" : $"https://api.helpetgroup.net/files/docs/{fileToUpload.Id}";

                _filesCollection.UpdateOne<FileModel>(file => file.Id == fileToUpload.Id, Builders<FileModel>.Update.Set("Url", fileToUpload.Url));

                return new DTOResponse<DTOFile>()
                {
                    Code = 200,
                    Data = new DTOFile()
                    {
                        Id = fileToUpload.Id,
                        Url = fileToUpload.Url
                    }
                };

            }
            catch (Exception ex)
            {
                return new DTOResponse<DTOFile>()
                {
                    Code = 400,
                    Message = ex.Message
                };
            }
        }

        public DTOResponse<DTOFile> GetImageFileById(string imageId, bool getThumbnail = false)
        {
            var existingImage = _imagesCollection.Find<ImageModel>(image => image.Id == imageId).FirstOrDefault();

            if (existingImage == null)
            {
                throw new FileNotFoundException();
            }

            if (!getThumbnail)
            {
                if (string.IsNullOrWhiteSpace(existingImage.Path))
                {
                    throw new FileNotFoundException();
                }

                if (!File.Exists(existingImage.Path))
                {
                    this.DownloadImageFromS3(existingImage);

                    existingImage = _imagesCollection.Find<ImageModel>(image => image.Id == imageId).FirstOrDefault();
                }
            }
            else
            {
                if (string.IsNullOrWhiteSpace(existingImage.ThumbnailPath))
                {
                    throw new FileNotFoundException();
                }

                if (!File.Exists(existingImage.ThumbnailPath))
                {
                    this.DownloadImageFromS3(existingImage, true);

                    existingImage = _imagesCollection.Find<ImageModel>(image => image.Id == imageId).FirstOrDefault();
                }
            }

            _imagesCollection.UpdateOne<ImageModel>(image => image.Id == imageId, Builders<ImageModel>.Update.Set("LastView", DateTime.Now));

            var imagePath = !getThumbnail ? existingImage.Path : existingImage.ThumbnailPath;

            return new DTOResponse<DTOFile>()
            {
                Code = 200,
                Data = new DTOFile()
                {
                    Bytes = File.ReadAllBytes(imagePath),
                    MimeType = existingImage.MimeType,
                    Extension = existingImage.Extension,
                    Key = existingImage.Key
                }
            };
        }
        
        public DTOResponse<DTOFile> UploadImage(DTOFileUpload uploadFileInfo)
        {
            if (uploadFileInfo.Files.Length == 0)
            {
                return new DTOResponse<DTOFile>()
                {
                    Code = 400,
                    Message = "You must send an file to upload!"
                };
            }

            try
            {
                var filenameParts = uploadFileInfo.Files.FileName.Split('.');
                var fileExtension = filenameParts[filenameParts.Length-1];

                if (fileExtension != "png" && fileExtension != "jpg" && fileExtension != "jpeg")
                {
                    return new DTOResponse<DTOFile>()
                    {
                        Code = 400,
                        Message = "Uploaded images must be in PNG or JPG formats!"
                    };
                }

                var uploadFolder = uploadFileInfo.Folder ?? "general";
                var localFileName = uploadFileInfo.Key ?? Guid.NewGuid().ToString();
                var localFinalFileName = $"{localFileName}.{fileExtension}";

                var imageUploadDirPath = $"files/images/{uploadFolder}/";
                if (!Directory.Exists(imageUploadDirPath))
                {
                    Directory.CreateDirectory(imageUploadDirPath);
                }

                var finalImageFilePath = $"{imageUploadDirPath}{localFinalFileName}";
                using (FileStream filestream = File.Create(finalImageFilePath))
                {
                    uploadFileInfo.Files.CopyTo(filestream);
                    filestream.Flush();
                }

                var thumbnailUploadDirPath = $"files/images/{uploadFolder}/thumbnails/";
                if (!Directory.Exists(thumbnailUploadDirPath))
                {
                    Directory.CreateDirectory(thumbnailUploadDirPath);
                }

                var finalThumbnailFilePath = $"{thumbnailUploadDirPath}{localFinalFileName}";

                try
                {
                    this.GenerateThumbnail(finalImageFilePath, finalThumbnailFilePath, fileExtension == "png" ? "image/png" : "image/jpeg");
                }
                catch (Exception)
                {
                    finalThumbnailFilePath = "";
                }

                ImageModel imageToUpload = new ImageModel()
                {
                    Key = uploadFileInfo.Key
                };

                if (!string.IsNullOrWhiteSpace(uploadFileInfo.Key))
                {
                    var existingImage = _imagesCollection.Find<ImageModel>(image => image.Key == uploadFileInfo.Key).FirstOrDefault();
                    if (existingImage != null)
                    {
                        imageToUpload = existingImage;
                    }
                }

                imageToUpload.Folder = uploadFolder;
                imageToUpload.MimeType = fileExtension == "png" ? "image/png" : "image/jpeg";
                imageToUpload.Path = finalImageFilePath;
                imageToUpload.ThumbnailPath = finalThumbnailFilePath;
                imageToUpload.Extension = fileExtension;

                if (string.IsNullOrWhiteSpace(imageToUpload.Id))
                {
                    _imagesCollection.InsertOne(imageToUpload);
                }
                else
                {
                    _imagesCollection.UpdateOne<ImageModel>(image => image.Id == imageToUpload.Id, Builders<ImageModel>.Update.Set("Path", imageToUpload.Path).Set("ThumbnailPath", imageToUpload.ThumbnailPath).Set("MimeType", imageToUpload.MimeType).Set("Folder", imageToUpload.Folder).Set("Extension", imageToUpload.Extension));
                }

                this.UploadImageToS3(imageToUpload);

                imageToUpload.Url = _environment.EnvironmentName == "Development" ? $"https://localhost:5001/files/images/{imageToUpload.Id}" : $"https://api.helpetgroup.net/files/images/{imageToUpload.Id}";
                imageToUpload.ThumbnailUrl = _environment.EnvironmentName == "Development" ? $"https://localhost:5001/files/thumbnails/{imageToUpload.Id}" : $"https://api.helpetgroup.net/files/thumbnails/{imageToUpload.Id}";

                _imagesCollection.UpdateOne<ImageModel>(file => file.Id == imageToUpload.Id, Builders<ImageModel>.Update.Set("Url", imageToUpload.Url).Set("ThumbnailUrl", imageToUpload.ThumbnailUrl));

                return new DTOResponse<DTOFile>()
                {
                    Code = 200,
                    Data = new DTOFile()
                    {
                        Id = imageToUpload.Id,
                        Url = imageToUpload.Url,
                        ThumbnailUrl = !string.IsNullOrWhiteSpace(finalThumbnailFilePath) ? imageToUpload.ThumbnailUrl : imageToUpload.Url
                    }
                };

            }
            catch (Exception ex)
            {
                return new DTOResponse<DTOFile>()
                {
                    Code = 400,
                    Message = ex.Message
                };
            }
        }
       
        #endregion


        #region Privates

        public async Task UploadFileToS3(FileModel fileToUpload)
        {
            var filesBucketName = $"helpet/{_environment.EnvironmentName}/docs/{fileToUpload.Folder}/{fileToUpload.Extension}";

            var client = new AmazonS3Client(_generalSettings.S3AccessKey, _generalSettings.S3SecretKey, RegionEndpoint.USEast1);

            var fileTransferUtility = new TransferUtility(client);

            try
            {
                await fileTransferUtility.S3Client.PutBucketAsync(new PutBucketRequest() { BucketName = "helpet" });
            }
            catch { }


            fileTransferUtility.Upload(new TransferUtilityUploadRequest()
            {
                FilePath = fileToUpload.Path,
                BucketName = filesBucketName,
                Key = $"{fileToUpload.Key ?? fileToUpload.Id}.{fileToUpload.Extension}"
            });

            fileTransferUtility.Dispose();

            client.Dispose();
        }

        public void DownloadFileFromS3(FileModel fileToDownload)
        {
            var client = new AmazonS3Client(_generalSettings.S3AccessKey, _generalSettings.S3SecretKey, RegionEndpoint.USEast1);

            var fileTransferUtility = new TransferUtility(client);

            var fileName = $"{fileToDownload.Key ?? fileToDownload.Id}.{fileToDownload.Extension}";

            var fileDownloadDirPath = $"files/docs/{fileToDownload.Folder}/{fileToDownload.Extension}/{fileName}";
            var filesBucketName = $"helpet/{_environment.EnvironmentName}/docs/{fileToDownload.Folder}/{fileToDownload.Extension}";

            fileTransferUtility.Download(fileDownloadDirPath, filesBucketName, fileName);
            _filesCollection.UpdateOne<FileModel>(document => document.Id == fileToDownload.Id, Builders<FileModel>.Update.Set("Path", fileDownloadDirPath));

            fileTransferUtility.Dispose();

            client.Dispose();
        }

        public async Task UploadImageToS3(ImageModel imageToUpload)
        {
            var imagesBucketName = $"helpet/{_environment.EnvironmentName}/images/{imageToUpload.Folder}";
            var thumbnailsBucketName = $"helpet/{_environment.EnvironmentName}/images/{imageToUpload.Folder}/thumbnails";

            var client = new AmazonS3Client(_generalSettings.S3AccessKey, _generalSettings.S3SecretKey, RegionEndpoint.USEast1);

            var fileTransferUtility = new TransferUtility(client);

            try
            {
                await fileTransferUtility.S3Client.PutBucketAsync(new PutBucketRequest() { BucketName = "helpet" });
            }
            catch { }

            if (!string.IsNullOrWhiteSpace(imageToUpload.Path))
            {
                fileTransferUtility.Upload(new TransferUtilityUploadRequest()
                {
                    FilePath = imageToUpload.Path,
                    BucketName = imagesBucketName,
                    Key = $"{imageToUpload.Key ?? imageToUpload.Id}.{imageToUpload.Extension}"
                });
            }

            if (!string.IsNullOrWhiteSpace(imageToUpload.ThumbnailPath))
            {
                fileTransferUtility.Upload(new TransferUtilityUploadRequest()
                {
                    FilePath = imageToUpload.ThumbnailPath,
                    BucketName = thumbnailsBucketName,
                    Key = $"{imageToUpload.Key ?? imageToUpload.Id}.{imageToUpload.Extension}"
                });
            }

            fileTransferUtility.Dispose();

            client.Dispose();
        }

        public void DownloadImageFromS3(ImageModel imageToDownload, bool getThumbnail = false)
        {
            var client = new AmazonS3Client(_generalSettings.S3AccessKey, _generalSettings.S3SecretKey, RegionEndpoint.USEast1);

            var fileTransferUtility = new TransferUtility(client);

            var fileName = $"{imageToDownload.Key ?? imageToDownload.Id}.{imageToDownload.Extension}";

            if (!getThumbnail)
            {
                var imageDownloadDirPath = $"files/images/{imageToDownload.Folder}/{fileName}";
                var imagesBucketName = $"helpet/{_environment.EnvironmentName}/images/{imageToDownload.Folder}";

                fileTransferUtility.Download(imageDownloadDirPath, imagesBucketName, fileName);
                _imagesCollection.UpdateOne<ImageModel>(image => image.Id == imageToDownload.Id, Builders<ImageModel>.Update.Set("Path", imageDownloadDirPath));
            }
            else
            {
                var thumbnailDownloadDirPath = $"files/images/{imageToDownload.Folder}/thumbnails/{fileName}";
                var thumbnailsBucketName = $"helpet/{_environment.EnvironmentName}/images/{imageToDownload.Folder}/thumbnails";

                fileTransferUtility.Download(thumbnailDownloadDirPath, thumbnailsBucketName, fileName);
                _imagesCollection.UpdateOne<ImageModel>(image => image.Id == imageToDownload.Id, Builders<ImageModel>.Update.Set("ThumbnailPath", thumbnailDownloadDirPath));
            }

            fileTransferUtility.Dispose();

            client.Dispose();
        }

        public void GenerateThumbnail(string filePath, string outputPath, string mimeType)
        {
            int size = _generalSettings.ThumbnailSize;
            const int quality = 75;

            using (var image = new Bitmap(System.Drawing.Image.FromFile(filePath)))
            {
                int width, height;
                if (image.Width > image.Height)
                {
                    width = size;
                    height = Convert.ToInt32(image.Height * size / (double)image.Width);
                }
                else
                {
                    width = Convert.ToInt32(image.Width * size / (double)image.Height);
                    height = size;
                }
                var resized = new Bitmap(width, height);
                using (var graphics = Graphics.FromImage(resized))
                {
                    graphics.CompositingQuality = CompositingQuality.HighSpeed;
                    graphics.InterpolationMode = InterpolationMode.HighQualityBicubic;
                    graphics.CompositingMode = CompositingMode.SourceCopy;
                    graphics.DrawImage(image, 0, 0, width, height);
                    using (var output = File.Open(outputPath, FileMode.Create))
                    {
                        var qualityParamId = Encoder.Quality;
                        var encoderParameters = new EncoderParameters(1);
                        encoderParameters.Param[0] = new EncoderParameter(qualityParamId, quality);
                        var codec = ImageCodecInfo.GetImageDecoders().FirstOrDefault(codec => codec.FormatID == (mimeType == "image/png" ? ImageFormat.Png.Guid : ImageFormat.Jpeg.Guid));
                        resized.Save(output, codec, encoderParameters);
                    }
                }
            }

        }

        #endregion

    }
}
