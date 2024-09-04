using Senior.Api.Bootstraping;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.AspNetCore.ResponseCompression;
using System.Text.Json.Serialization;
using FluentValidation.AspNetCore;
using Senior.Application.Common.Constants;
using Senior.Application.Common.Configuration;

namespace Senior.Api.Extension
{
    public static class ServiceExtension
    {
        public static IServiceCollection RegisterServices(this IServiceCollection services, IConfiguration configuration)
        {
            ConfigureCompression(services);
            ConfigureSwagger(services);
            ConfigureCors(services, configuration);
            ConfigureControllers(services);
            services.ConfigureAzureAd(configuration);
            //Register custom services

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddHttpContextAccessor();
            services.AddMemoryCache();
            services = services.Bootstrap(configuration);


            return services;
        }
        /// <summary>
        ///    Configure Azure AD to validate Jwt Token
        /// </summary>
        /// <param name="services"></param>
        /// <param name="configuration"></param>
        private static void ConfigureAzureAd(this IServiceCollection services, IConfiguration configuration)
        {
            var appRole = configuration.GetValue<string>("AppRole") ?? null;

            // If AppRole is provided then, authorized according to role else just authenticate.
            if (!string.IsNullOrWhiteSpace(appRole))
            {
                services.AddAuthorization(options =>
                {
                    options.DefaultPolicy = new AuthorizationPolicyBuilder().RequireRole(appRole).Build();
                });

                return;
            }
            services.AddAuthorization();
        }

        private static void ConfigureControllers(IServiceCollection services)
        {
            services.AddFluentValidationAutoValidation();
            services.AddFluentValidationClientsideAdapters();
            services.AddControllers(options =>
            {
                // By default, string return types are formatted as text / plain.
                options.OutputFormatters.RemoveType<StringOutputFormatter>();
                // Replace '204 No Content' with Null.
                options.OutputFormatters.RemoveType<HttpNoContentOutputFormatter>();

            })
                // Since dictionary with non-string keys is not supported in System.Text.Json yet
                // so using NewtonsoftJson for now.
                // https://docs.microsoft.com/en-us/dotnet/standard/serialization/system-text-json-migrate-from-newtonsoft-how-to
                //.AddNewtonsoftJson()
                .AddJsonOptions(options =>
                {
                    var enumConverter = new JsonStringEnumConverter();
                    options.JsonSerializerOptions.Converters.Add(enumConverter);

                });

        }

       private static void ConfigureCors(IServiceCollection services, IConfiguration configuration)
        {
            services.AddCors(options =>
            {
                options.AddPolicy(ApiConstants.CorsPolicy,
              builder =>
              {
                  builder.WithOrigins(AppSettings.Configuration.CorsPolicyConfig.AllowedOrigin)
                      .SetIsOriginAllowedToAllowWildcardSubdomains()
                      .AllowAnyMethod()
                      .AllowAnyHeader()
                      .AllowCredentials().WithMethods("PUT", "DELETE", "GET");
              });
        });
        }
        private static void ConfigureSwagger(IServiceCollection services)
        {
 
       

        }

        private static void ConfigureCompression(IServiceCollection services)
        {
            services.AddResponseCompression(options =>
            {
                options.EnableForHttps = true;
                options.Providers.Add<GzipCompressionProvider>();
            });
        }
    }
}
