using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Senior.Infrastructure.Persistence.Sql.Context;
using Senior.Infrastructure.Persistence.Sql.Interfaces;
using Senior.Infrastructure.Persistence.Sql.Repositories;

namespace Senior.Infrastructure.Bootstrap
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<SeniorContext>(options => options.UseSqlServer(configuration.GetConnectionString("SeniorDb")));

            
            services.AddTransient(typeof(IGenericRepository<>), typeof(GenericRepository<>));
            services.AddTransient<IProductRepository, ProductRepository>();
            services.AddTransient<IOrderRepository, OrderRepository>();
            services.AddTransient<ILabourRepository, LabourRepository>();
            
            services.AddTransient<IProjectRepository, ProjectRepository>();
            services.AddTransient<ILabourRequestRepository, LabourRequestRepository>();


            return services;
        }
    }
}
