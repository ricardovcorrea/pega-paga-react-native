using System;
using System.Collections.Generic;
using Api.DTO;
using Microsoft.AspNetCore.Mvc;

namespace Api.Domain.Interfaces
{
    public interface IFilesDomain
    {
        DTOResponse<DTOFile> GetDocumentById(string documentId);
        DTOResponse<DTOFile> UploadFile(DTOFileUpload uploadFileInfo);
        DTOResponse<DTOFile> GetFileDocumentById(string imageId);

        DTOResponse<DTOFile> GetImageById(string imageId);
        DTOResponse<DTOFile> UploadImage(DTOFileUpload uploadFileInfo);
        DTOResponse<DTOFile> GetImageFileById(string imageId, bool getThumbnail = false);
    }
}
