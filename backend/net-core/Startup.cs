using System.Text;
using Api.Configurations;
using Api.Domain;
using Api.Domain.Interfaces;
using Api.Infrastructure;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {

            var helpetGeneralSettingsConfigSection = Configuration.GetSection(nameof(GeneralSettings));
            services.Configure<GeneralSettings>(helpetGeneralSettingsConfigSection);

            services.Configure<DBSettings>(Configuration.GetSection(nameof(DBSettings)));
            services.Configure<EmailSettings>(Configuration.GetSection(nameof(EmailSettings)));

            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(helpetGeneralSettingsConfigSection.Get<GeneralSettings>().JwtSecret)),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            services.AddSingleton<IGeneralSettings>(sp => sp.GetRequiredService<IOptions<GeneralSettings>>().Value);
            services.AddSingleton<IDBSettings>(sp => sp.GetRequiredService<IOptions<DBSettings>>().Value);
            services.AddSingleton<IEmailSettings>(sp => sp.GetRequiredService<IOptions<EmailSettings>>().Value);

            services.AddTransient<IFilesDomain, FilesDomain>();

            services.AddTransient<IUserDomain, UserDomain>();

            services.AddTransient<ITransactionDomain, TransactionDomain>();

            services.AddTransient<IEmailSender, EmailSender>();
            services.AddTransient<IGooglePlaces, GooglePlaces>();

            services.AddControllers().AddJsonOptions(options => {
                options.JsonSerializerOptions.IgnoreNullValues = true;
            });

            services.AddCors();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            app.UseCors(option => option.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());

            app.UseAuthentication();
            app.UseAuthorization();
            
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
