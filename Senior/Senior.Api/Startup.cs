using Senior.Api.Extension;
using Senior.Application.Common.Configuration;
using Senior.Application.Common.Constants;

namespace Senior.Api
{
  

            public class Startup
    {

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            configuration.Bind(AppSettings.Configuration);

        }

        private IConfiguration Configuration { get; }


        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

           services.RegisterServices(Configuration);
           services.AddSwaggerGen();
           
        }
       
        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
          
            app.ConfigureRequestPipeline();
            app.UseCors(ApiConstants.CorsPolicy);

            app.UseHttpsRedirection();
            app.UseRouting();


            //app.UseAuthorization();
        }
    }
}


