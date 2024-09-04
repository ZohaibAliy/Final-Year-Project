
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Senior.Application.Interfaces;
using Senior.Application.Services;
using Senior.Infrastructure.Persistence.Sql.Interfaces;
using Senior.Infrastructure.Persistence.Sql.Repositories;
using Microsoft.ApplicationInsights.Extensibility;
using Microsoft.ApplicationInsights.Extensibility.PerfCounterCollector.QuickPulse;
using Microsoft.ApplicationInsights;
using Microsoft.Extensions.Configuration;

namespace Senior.Application.Bootstrap
{
    public static class DependencyInjections
    {
          
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {
            AddAppServices(services);
            return services;
        }
        private static void AddAppServices(IServiceCollection services)
        {
            services.AddTransient<IAuthenticationService, AuthenticationService>();
            services.AddTransient<IProductService, ProductService>();
            services.AddTransient<IOrderService, OrderService>();
            services.AddTransient<ILabourService, LabourService>();
            services.AddTransient<ILabourRequestService, LabourRequestService>();


        }
        public static void BootstrapLogComponents(this IServiceCollection serviceCollection, IConfiguration configuration)
        {

            var AppInsightsConnectionString = configuration.GetConnectionString("AppInsightConnectionString");
            // register ILogger
            serviceCollection.AddLogging();

            // register Telemetry client
            var telemetryConfiguration = TelemetryConfiguration.CreateDefault();
            telemetryConfiguration.ConnectionString = AppInsightsConnectionString;

            QuickPulseTelemetryProcessor quickPulseProcessor = null;
            telemetryConfiguration.DefaultTelemetrySink.TelemetryProcessorChainBuilder
                .Use((next) =>
                {
                    quickPulseProcessor = new QuickPulseTelemetryProcessor(next);
                    return quickPulseProcessor;
                })
                .Build();

            var quickPulseModule = new QuickPulseTelemetryModule();

            quickPulseModule.Initialize(telemetryConfiguration);
            quickPulseModule.RegisterTelemetryProcessor(quickPulseProcessor);
            var telemetryClient = new TelemetryClient(telemetryConfiguration);
            serviceCollection.AddSingleton(telemetryClient);
        }

    } }
