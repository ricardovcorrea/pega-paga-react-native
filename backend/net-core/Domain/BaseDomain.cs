using System;
using System.Security.Claims;
using Api.Configurations;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;

namespace Api.Domain
{
    public class BaseDomain
    {
        protected readonly IWebHostEnvironment _environment;
        protected readonly IGeneralSettings _generalSettings;

        protected readonly string _authenticatedUserId;

        public BaseDomain(IWebHostEnvironment environment, IHttpContextAccessor httpContextAccessor, IGeneralSettings generalSettings)
        {
            _environment = environment;
            _generalSettings = generalSettings;

            _authenticatedUserId = httpContextAccessor?.HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        }
    }
}
