using Senior.Application.Bootstrap;
using Senior.Application.Common.Configuration;
using Senior.Infrastructure.Bootstrap;

namespace Senior.Api.Bootstraping
{
    public static class Bootstrapper
    {
        public static IServiceCollection Bootstrap(this IServiceCollection serviceCollection, IConfiguration configuration)
        {

            configuration.Bind(AppConfigurations.Configuration);
            serviceCollection.AddApplication();
            serviceCollection.AddInfrastructure(configuration);

            serviceCollection.Configure<SwaggerConfig>(configuration.GetSection(nameof(SwaggerConfig)));
            // serviceCollection.BootstrapLogComponents(configuration);

            return serviceCollection;
        }
    }
}
