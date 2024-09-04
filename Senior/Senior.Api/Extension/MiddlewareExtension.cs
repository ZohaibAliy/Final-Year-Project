using Senior.Api.Middleware;
using Senior.Application.Common.Constants;

namespace Senior.Api.Extension
{
    public static class MiddlewareExtension
    {
        public static IApplicationBuilder ConfigureRequestPipeline(this IApplicationBuilder app)
        {
            app.UseResponseCompression();
            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseCors(ApiConstants.CorsPolicy);
            app.UseSwagger();
            app.UseSwaggerUI();
            app.UseAuthentication();
            // Execute only request is sent to api methods.

            app.UseWhen(context => context.Request.Path.StartsWithSegments(ApiConstants.Api),
                appBuilder =>
                {
                    appBuilder.UseMiddleware<RequestLoggingMiddleware>();
                    
                });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
            return app;
        }
    }
}
