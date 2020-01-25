using System;
using Api.DTO;
using Api.enumerators;
using Api.Models;

namespace Api.Extensions
{
    public static class UserExtension
    {
        public static DTOUser ToDTO(this UserModel userModel)
        {
            return new DTOUser()
            {
                Id = userModel.Id,

                Email = userModel.Email,
                IsActive = userModel.IsActive,
                VerificationCode = userModel.VerificationCode,

                FirstName = userModel.Name,
                Surname = userModel.Surname,
                Document = userModel.Document,
                HasAcceptedEmailMarketing = userModel.HasAcceptedEmailMarketing,

                Type = (UserType)userModel.Type,

                AccessLevel = (UserAccessLevel)userModel.AccessLevel
            };
        }

        public static UserModel ToModel(this DTOUser dtoUser)
        {
            return new UserModel()
            {
                Id = dtoUser.Id,

                Email = dtoUser.Email,
                IsActive = dtoUser.IsActive,
                VerificationCode = dtoUser.VerificationCode,

                Name = dtoUser.FirstName,
                Surname = dtoUser.Surname,
                Document = dtoUser.Document,
                ImageId = dtoUser.Portrait?.Id ?? null,
                HasAcceptedEmailMarketing = dtoUser.HasAcceptedEmailMarketing,

                Type = (int)dtoUser.Type,

                AccessLevel = (int)dtoUser.AccessLevel
            };
        }
    }
}
