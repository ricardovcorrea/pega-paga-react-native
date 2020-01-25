using System;
using System.Collections.Generic;
using Api.Configurations;
using Api.Domain.Interfaces;
using Api.DTO;
using Api.enumerators;
using Api.Extensions;
using Api.Infrastructure;
using Api.Models;
using MongoDB.Driver;

using System.IdentityModel;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;

namespace Api.Domain
{
    public class UserDomain : BaseDomain, IUserDomain
    {
        private readonly IMongoCollection<UserModel> _userCollection;
        private readonly IEmailSender _emailSender;
        private readonly ITransactionDomain _transactionDomain;

        public UserDomain(IWebHostEnvironment environment, IHttpContextAccessor httpContextAccessor, IGeneralSettings generalSettings, IDBSettings dbSettings, IEmailSender emailSender, ITransactionDomain transactionDomain) : base(environment, httpContextAccessor, generalSettings)
        {
            var client = new MongoClient(dbSettings.ConnectionString);
            var database = client.GetDatabase(dbSettings.DatabaseName);

            _userCollection = database.GetCollection<UserModel>(dbSettings.UsersCollectionName);
            _emailSender = emailSender;
            _transactionDomain = transactionDomain;
        }


        #region Publics
        public DTOResponse<DTOUser> Login(DTOInfo loginInfo)
        {
            if (string.IsNullOrWhiteSpace(loginInfo.Email) || string.IsNullOrWhiteSpace(loginInfo.Password))
            {
                return new DTOResponse<DTOUser>()
                {
                    Code = 400,
                    Message = "Email and Password are required!"
                };
            }

            var getUserResponse = GetUserByEmail(loginInfo.Email);
            if (getUserResponse.Code != 200)
            {
                return new DTOResponse<DTOUser>()
                {
                    Code = 401,
                    Message = "Invalid user email or password!"
                };
            }

            var existingUser = getUserResponse.Data;

            //if (!existingUser.IsActive)
            //{
            //    return new DTOApiResponse()
            //    {
            //        Code = 400,
            //        Message = "This user is not active, please check your email, we have sent you a verification code!"
            //    };
            //}

            var userSavedPasswordHash = this.GetUserPasswordHash(existingUser.Id);
            var passwordIsValid = SecurePasswordHasher.Verify(loginInfo.Password, userSavedPasswordHash);
            if (!passwordIsValid)
            {
                return new DTOResponse<DTOUser>()
                {
                    Code = 401,
                    Message = "Invalid user email or password!"
                };
            }

            LoadUserInfo(existingUser);

            var token = new JwtSecurityToken(
                expires: DateTime.Now.AddDays(7),
                claims: new[] { new Claim(JwtRegisteredClaimNames.Sub, existingUser.Id) },
                signingCredentials: new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_generalSettings.JwtSecret)), SecurityAlgorithms.HmacSha256)
                );

            existingUser.Token = new JwtSecurityTokenHandler().WriteToken(token);

            return new DTOResponse<DTOUser>()
            {
                Code = 200,
                Data = existingUser
            };
        }

        public DTOResponse<DTOUser> Create(DTOCreateUser createUserInfo)
        {

            if (string.IsNullOrWhiteSpace(createUserInfo.Email) || string.IsNullOrWhiteSpace(createUserInfo.Password) || string.IsNullOrWhiteSpace(createUserInfo.ConfirmPassword))
            {
                return new DTOResponse<DTOUser>()
                {
                    Code = 400,
                    Message = "Email, Password and Confirm Password are required!"
                };
            }

            var getUserResponse = GetUserByEmail(createUserInfo.Email);
            if (getUserResponse.Code == 200)
            {
                return new DTOResponse<DTOUser>()
                {
                    Code = 400,
                    Message = "This user email is already registered!"
                };
            }

            if (createUserInfo.Password != createUserInfo.ConfirmPassword)
            {
                return new DTOResponse<DTOUser>()
                {
                    Code = 400,
                    Message = "The password and confirm password dont match!"
                };
            }

            if (!createUserInfo.HasAcceptedTermsAndPrivacyPolice)
            {
                return new DTOResponse<DTOUser>()
                {
                    Code = 400,
                    Message = "The user must accept Terms and Privacy police!"
                };
            }

            createUserInfo.User.Email = createUserInfo.Email;

            var userModel = createUserInfo.User.ToModel();

            var passwordHash = SecurePasswordHasher.Hash(createUserInfo.Password);
            userModel.PasswordHash = passwordHash;

            _userCollection.InsertOne(userModel);

            getUserResponse = GetUserByEmail(createUserInfo.Email);
            var existingUser = getUserResponse.Data;

            LoadUserInfo(existingUser);

            return new DTOResponse<DTOUser>()
            {
                Code = 200,
                Data = existingUser
            };
        }

        public DTOResponse<DTOUser> Activate(DTOInfo activateUserInfo)
        {
            var getUserResponse = GetUserByEmail(activateUserInfo.Email);
            if (getUserResponse.Code != 200)
            {
                return new DTOResponse<DTOUser>()
                {
                    Code = 400,
                    Message = "This user email incorrect or not registered!"
                };
            }

            var existingUser = getUserResponse.Data;

            if (string.IsNullOrWhiteSpace(existingUser.VerificationCode) || existingUser.VerificationCode != activateUserInfo.Code)
            {
                return new DTOResponse<DTOUser>()
                {
                    Code = 400,
                    Message = "This verification code is not valid!"
                };
            }

            _userCollection.UpdateOne<UserModel>(user => user.Id == existingUser.Id, Builders<UserModel>.Update.Set("VerificationCode", "").Set("IsActive", true));

            return new DTOResponse<DTOUser>()
            {
                Code = 200,
                Data = existingUser
            };
        }

        public DTOResponse<bool> SendVerificationCode(string userEmail)
        {
            if (string.IsNullOrWhiteSpace(userEmail))
            {
                return new DTOResponse<bool>()
                {
                    Code = 400,
                    Message = "Email is required!"
                };
            }

            var getUserResponse = GetUserByEmail(userEmail);
            if (getUserResponse.Code != 200)
            {
                return new DTOResponse<bool>()
                {
                    Code = 400,
                    Message = "This user email incorrect or not registered!"
                };
            }

            var existingUser = getUserResponse.Data;

            var verificationCode = GenerateVerificationCode();

            _userCollection.UpdateOne<UserModel>(user => user.Id == existingUser.Id, Builders<UserModel>.Update.Set("VerificationCode", verificationCode));

            _emailSender.Send(userEmail, "Pega Paga - Here is your code", verificationCode);

            return new DTOResponse<bool>()
            {
                Code = 200
            };

        }

        public DTOResponse<bool> ForgetPassword(DTOInfo forgetPasswordInfo)
        {
            if (string.IsNullOrWhiteSpace(forgetPasswordInfo.Email) || string.IsNullOrWhiteSpace(forgetPasswordInfo.Code) || string.IsNullOrWhiteSpace(forgetPasswordInfo.Password) || string.IsNullOrWhiteSpace(forgetPasswordInfo.ConfirmPassword))
            {
                return new DTOResponse<bool>()
                {
                    Code = 400,
                    Message = "Email, Code, Password and ConfirmPassword are required!"
                };
            }

            var getUserResponse = GetUserByEmail(forgetPasswordInfo.Email);
            if (getUserResponse.Code != 200)
            {
                return new DTOResponse<bool>()
                {
                    Code = 400,
                    Message = "This user email incorrect or not registered!"
                };
            }

            var existingUser = getUserResponse.Data;

            if (string.IsNullOrWhiteSpace(existingUser.VerificationCode) || existingUser.VerificationCode != forgetPasswordInfo.Code)
            {
                return new DTOResponse<bool>()
                {
                    Code = 400,
                    Message = "This verification code is not valid!"
                };
            }

            if (forgetPasswordInfo.Password != forgetPasswordInfo.ConfirmPassword)
            {
                return new DTOResponse<bool>()
                {
                    Code = 400,
                    Message = "The password and confirm password dont match!"
                };
            }

            var newUserPasswordHash = SecurePasswordHasher.Hash(forgetPasswordInfo.ConfirmPassword);

            _userCollection.UpdateOne<UserModel>(user => user.Id == existingUser.Id, Builders<UserModel>.Update.Set("VerificationCode", "").Set("PasswordHash", newUserPasswordHash));

            return new DTOResponse<bool>()
            {
                Code = 200
            };
        }

        public DTOResponse<bool> ChangePassword(DTOInfo changePasswordInfo)
        {
            if (string.IsNullOrWhiteSpace(changePasswordInfo.Email) || string.IsNullOrWhiteSpace(changePasswordInfo.Password) || string.IsNullOrWhiteSpace(changePasswordInfo.ConfirmPassword))
            {
                return new DTOResponse<bool>()
                {
                    Code = 400,
                    Message = "Email, New Password and Confirm Password are required!"
                };
            }

            var getUserResponse = GetUserByEmail(changePasswordInfo.Email);
            if (getUserResponse.Code != 200)
            {
                return new DTOResponse<bool>()
                {
                    Code = 400,
                    Message = "This user email incorrect or not registered!"
                };
            }

            var existingUser = getUserResponse.Data;

            if (changePasswordInfo.Password != changePasswordInfo.ConfirmPassword)
            {
                return new DTOResponse<bool>()
                {
                    Code = 400,
                    Message = "The password and confirm password dont match!"
                };
            }

            var newUserPasswordHash = SecurePasswordHasher.Hash(changePasswordInfo.ConfirmPassword);

            _userCollection.UpdateOne<UserModel>(user => user.Id == existingUser.Id, Builders<UserModel>.Update.Set("PasswordHash", newUserPasswordHash));

            return new DTOResponse<bool>()
            {
                Code = 200
            };
        }

        public DTOResponse<DTOUser> GetUserByEmail(string email)
        {
            var foundUserModel = _userCollection.Find<UserModel>(user => user.Email == email).FirstOrDefault();

            if (foundUserModel == null)
            {
                return new DTOResponse<DTOUser>()
                {
                    Code = 400
                };
            }

            var dtoUser = foundUserModel.ToDTO();

            LoadUserInfo(dtoUser);

            return new DTOResponse<DTOUser>()
            {
                Code = 200,
                Data = dtoUser
            };
        }

        public DTOResponse<DTOUser> GetUserById(string userId)
        {
            var foundUserModel = _userCollection.Find<UserModel>(user => user.Id == userId).FirstOrDefault();

            if (foundUserModel == null)
            {
                return new DTOResponse<DTOUser>()
                {
                    Code = 400
                };
            }

            var dtoUser = foundUserModel.ToDTO();

            LoadUserInfo(dtoUser);

            return new DTOResponse<DTOUser>()
            {
                Code = 200,
                Data = dtoUser
            };
        }

        public DTOResponse<bool> ValidateVerificationCode(DTOInfo validateCodeInfo)
        {
            if (string.IsNullOrWhiteSpace(validateCodeInfo.Email) || string.IsNullOrWhiteSpace(validateCodeInfo.Code))
            {
                return new DTOResponse<bool>()
                {
                    Code = 400,
                    Message = "Email and Code are required!"
                };
            }

            var getUserResponse = GetUserByEmail(validateCodeInfo.Email);
            if (getUserResponse.Code != 200)
            {
                return new DTOResponse<bool>()
                {
                    Code = 400,
                    Message = "This user email incorrect or not registered!"
                };
            }

            var existingUser = getUserResponse.Data;

            if (string.IsNullOrWhiteSpace(existingUser.VerificationCode) || existingUser.VerificationCode != validateCodeInfo.Code)
            {
                return new DTOResponse<bool>()
                {
                    Code = 400,
                    Message = "This verification code is not valid!"
                };
            }

            return new DTOResponse<bool>()
            {
                Code = 200
            };
        }

        public DTOResponse<bool> CheckIfEmailExists(string email)
        {
            if (string.IsNullOrWhiteSpace(email))
            {
                return new DTOResponse<bool>()
                {
                    Code = 400,
                    Message = "Email is required!"
                };
            }

            var getUserResponse = GetUserByEmail(email);
            if (getUserResponse.Code == 200)
            {
                return new DTOResponse<bool>()
                {
                    Code = 400,
                    Message = "This email is already registered!"
                };
            }

            return new DTOResponse<bool>()
            {
                Code = 200
            };
        }

        public DTOResponse<List<DTOUser>> GetAllUsers()
        {
            var foundUsersModelList = _userCollection.Find<UserModel>(user => user.Id != null).ToList();

            var foundUsersDTOList = new List<DTOUser>();

            foreach (var userModel in foundUsersModelList)
            {
                var dtoUser = userModel.ToDTO();

                LoadUserInfo(dtoUser);

                foundUsersDTOList.Add(dtoUser);
            }

            return new DTOResponse<List<DTOUser>>()
            {
                Code = 200,
                Data = foundUsersDTOList,
                Total = foundUsersDTOList.Count
            };
        }

        public DTOResponse<DTOUser> GetLoggedUserInfo()
        {
            return GetUserById(_authenticatedUserId);
        }

        public DTOResponse<DTOUser> GetPublicUserInfo(string userId)
        {
            var foundUserModel = _userCollection.Find<UserModel>(user => user.Id == userId).FirstOrDefault();

            if (foundUserModel == null)
            {
                return new DTOResponse<DTOUser>()
                {
                    Code = 400
                };
            }

            return new DTOResponse<DTOUser>()
            {
                Code = 200,
                Data = new DTOUser()
                {
                    Id = foundUserModel.Id,
                    FirstName = foundUserModel.Name,
                    Surname = foundUserModel.Surname,
                    Email = foundUserModel.Email,
                }
            };
        }
        #endregion


        #region Privates
        private string GetUserPasswordHash(string userId)
        {
            var foundUserModel = _userCollection.Find<UserModel>(user => user.Id == userId).FirstOrDefault();
            return foundUserModel.PasswordHash;
        }

        private string GenerateVerificationCode()
        {
            int _min = 1000;
            int _max = 9999;
            Random _rdm = new Random();
            return _rdm.Next(_min, _max).ToString();
        }

        private void LoadUserInfo(DTOUser dtoUser)
        {
            var getUserBalanceResponse = _transactionDomain.GetUserBalance(dtoUser.Id);
            if(getUserBalanceResponse.Code == 200)
            {
                dtoUser.Balance = getUserBalanceResponse.Data;
            }

            var getUserTransactionsResult = _transactionDomain.GetUserTransactions(dtoUser.Id);
            if (getUserTransactionsResult.Code == 200)
            {
                dtoUser.Transactions = getUserTransactionsResult.Data;

                foreach (var transaction in dtoUser.Transactions)
                {
                    var getFromUserPublicInfoResponse = GetPublicUserInfo(transaction.From.Id);
                    if (getFromUserPublicInfoResponse.Code == 200)
                    {
                        transaction.From = getFromUserPublicInfoResponse.Data;
                    }

                    var getToUserPublicInfoResponse = GetPublicUserInfo(transaction.To.Id);
                    if (getToUserPublicInfoResponse.Code == 200)
                    {
                        transaction.To = getToUserPublicInfoResponse.Data;
                    }
                }
            }

        }

        #endregion
    }
}
