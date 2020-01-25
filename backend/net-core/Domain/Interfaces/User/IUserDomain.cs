using System;
using System.Collections.Generic;
using Api.DTO;

namespace Api.Domain.Interfaces
{
    public interface IUserDomain
    {
        DTOResponse<DTOUser> Login(DTOInfo loginInfo);
        DTOResponse<DTOUser> Create(DTOCreateUser createUserInfo);
        DTOResponse<DTOUser> Activate(DTOInfo activateUserInfo);
        DTOResponse<bool> SendVerificationCode(string userEmail);
        DTOResponse<bool> CheckIfEmailExists(string userEmail);
        DTOResponse<bool> ValidateVerificationCode(DTOInfo validateCodeInfo);
        DTOResponse<bool> ChangePassword(DTOInfo changePasswordInfo);
        DTOResponse<bool> ForgetPassword(DTOInfo forgetPasswordInfo);
        DTOResponse<DTOUser> GetUserByEmail(string email);
        DTOResponse<DTOUser> GetUserById(string email);

        DTOResponse<List<DTOUser>> GetAllUsers();

        DTOResponse<DTOUser> GetLoggedUserInfo();
        DTOResponse<DTOUser> GetPublicUserInfo(string userId);

        
    }
}
