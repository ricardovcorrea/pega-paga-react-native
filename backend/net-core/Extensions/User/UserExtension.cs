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
                VerificationCode = userModel.VerificationCode,

                FirstName = userModel.Name,
                Surname = userModel.Surname,
            };
        }

        public static UserModel ToModel(this DTOUser dtoUser)
        {
            return new UserModel()
            {
                Id = dtoUser.Id,

                Email = dtoUser.Email,
                VerificationCode = dtoUser.VerificationCode,

                Name = dtoUser.FirstName,
                Surname = dtoUser.Surname,
            };
        }
    }
}
