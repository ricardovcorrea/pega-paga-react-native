using System;
using Api.Domain.Interfaces;
using Api.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
namespace ImageUploadDemo.Controllers
{
    [Authorize]
    [Route("files")]
    public class FilesController : ControllerBase
	{
        private readonly IFilesDomain _filesDomain;

        public FilesController(IFilesDomain filesDomain)
        {
            _filesDomain = filesDomain;
        }

        [HttpPost]
        [Route("uploadFile")]
        public DTOResponse<DTOFile> UploadFile(DTOFileUpload uploadFileInfo)
        {
            return _filesDomain.UploadFile(uploadFileInfo);
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("docs/{documentId}")]
        public IActionResult GetFileById(string documentId)
        {
            try
            {
                var documentResponse = _filesDomain.GetFileDocumentById(documentId);
                return new FileContentResult(documentResponse.Data.Bytes, "application/octet-stream")
                {
                    FileDownloadName = $"{documentResponse.Data.Key ?? documentId}.{documentResponse.Data.Extension}"
                };
            }
            catch (Exception)
            {
                return NotFound();
            }
        }

        [HttpPost]
        [Route("uploadImage")]
        public DTOResponse<DTOFile> UploadImage(DTOFileUpload uploadFileInfo)
		{
            return _filesDomain.UploadImage(uploadFileInfo);
		}

        [AllowAnonymous]
        [HttpGet]
        [Route("images/{imageId}")]
        public IActionResult GetImageFileById(string imageId)
        {
            try
            {
                var imageResponse = _filesDomain.GetImageFileById(imageId);
                return File(imageResponse.Data.Bytes, imageResponse.Data.MimeType);
            }
            catch (Exception)
            {
                return NotFound();
            }
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("thumbnails/{imageId}")]
        public IActionResult GetImageThumbnailFileById(string imageId)
        {
            try
            {
                var imageResponse = _filesDomain.GetImageFileById(imageId, true);
                return File(imageResponse.Data.Bytes, imageResponse.Data.MimeType);
            }
            catch (Exception)
            {
                return NotFound();
            }
        }
    }
}