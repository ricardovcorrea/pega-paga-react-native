using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

using Api.DTO;
using Api.Domain.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("user")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly IUserDomain _userDomain;

        public UserController(ILogger<UserController> logger, IUserDomain userDomain)
        {
            _logger = logger;
            _userDomain = userDomain;
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("login")]
        public DTOResponse<DTOUser> Login(DTOInfo loginInfo)
        {
            return _userDomain.Login(loginInfo);
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("email/exists")]
        public DTOResponse<bool> CheckIfEmailExists(DTOInfo checkIfEmailExistsInfo)
        {
            return _userDomain.CheckIfEmailExists(checkIfEmailExistsInfo.Email);
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("create")]
        public DTOResponse<DTOUser> Create(DTOCreateUser createUserInfo)
        {
            return _userDomain.Create(createUserInfo);
        }


        [AllowAnonymous]
        [HttpPost]
        [Route("activate")]
        public DTOResponse<DTOUser> Activate(DTOInfo activateUserInfo)
        { 
            return _userDomain.Activate(activateUserInfo);
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("code")]
        public DTOResponse<bool> SendActivationCode(DTOInfo activateUserInfo)
        {
            return _userDomain.SendVerificationCode(activateUserInfo.Email);
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("code/validate")]
        public DTOResponse<bool> ValidateVerificationCode(DTOInfo validateCodeInfo)
        {
            return _userDomain.ValidateVerificationCode(validateCodeInfo);
        }

        [HttpPost]
        [Route("changePassword")]
        public DTOResponse<bool> ChangePassword(DTOInfo changePasswordInfo)
        {
            return _userDomain.ChangePassword(changePasswordInfo);
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("forgotPassword")]
        public DTOResponse<bool> ForgotPassword(DTOInfo forgetPasswordInfo)
        {
            return _userDomain.ForgetPassword(forgetPasswordInfo);
        }

        [HttpGet]
        [Route("list")]
        public DTOResponse<List<DTOUser>> GetAllUsers ()
        {
            return _userDomain.GetAllUsers();
        }

        [HttpGet]
        [Route("info")]
        public DTOResponse<DTOUser> GetLoggedUserInfo()
        {
            return _userDomain.GetLoggedUserInfo();
        }
    }
}
