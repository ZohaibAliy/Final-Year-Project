using System.Text;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.IO;
namespace Senior.Api.Middleware

{
    public class RequestLoggingMiddleware

    { 

        private readonly RequestDelegate _next;
    private readonly ILogger<RequestLoggingMiddleware> _logger;
    private readonly RecyclableMemoryStreamManager _recyclableMemoryStreamManager;


    /// <summary>
    /// Initializes logger specific dependencies
    /// </summary>
    /// <param name="next"></param>
    /// <param name="logger"></param>
    public RequestLoggingMiddleware(RequestDelegate next, ILogger<RequestLoggingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
        _recyclableMemoryStreamManager = new RecyclableMemoryStreamManager();
    }

    /// <summary>
    /// Log the specific request/response
    /// </summary>
    /// <param name="context"></param>
    /// <returns></returns>
    public async Task Invoke(HttpContext context)
    {
        await LogRequest(context);

        await _next(context);
    }
    /// <summary>
    /// Log the specific request/response
    /// </summary>
    /// <param name="context"></param>
    /// <returns></returns>
    private async Task LogRequest(HttpContext context)
    {
        //This line allows us to set the reader for the request back at the beginning of its stream.
        context.Request.EnableBuffering();

        await using var requestBodyStream = _recyclableMemoryStreamManager.GetStream();

        await context.Request.Body.CopyToAsync(requestBodyStream);
        requestBodyStream.Seek(0, SeekOrigin.Begin);

        var url = context.Request.GetDisplayUrl();
        var requestBodyText = await new StreamReader(requestBodyStream).ReadToEndAsync();
        var headers = GetHeaders(context.Request.Headers);

        _logger.LogInformation(
            $"REQUEST METHOD: {context.Request.Method}{Environment.NewLine}" +
            $"REQUEST HEADERS: {headers}{Environment.NewLine}" +
            $"REQUEST BODY: {requestBodyText}{Environment.NewLine}" +
            $"REQUEST URL: {url}");

        context.Request.Body.Seek(0, SeekOrigin.Begin);
    }

    private static string GetHeaders(IHeaderDictionary headers)
    {
        var headerBuilder = new StringBuilder(Environment.NewLine);

        foreach (var (key, value) in headers)
        {
            headerBuilder.AppendLine($"{key}:{value}");
        }

        return headerBuilder.ToString();
    }
}
}
