using System.Net;
using System.Text.Json;
using PortfolioApi.Common.Exceptions;
using PortfolioApi.Common.Responses;

namespace PortfolioApi.Common.Middleware;

/// <summary>
/// Catches unhandled exceptions and returns them through the same
/// ApiResponse envelope as every other endpoint, instead of the default
/// ASP.NET Core problem-details page.
/// </summary>
public class ExceptionHandlingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionHandlingMiddleware> _logger;
    private static readonly JsonSerializerOptions SerializerOptions = new()
    {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase
    };

    public ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (ApiException ex)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = ex.StatusCode;

            var body = ApiResponse<object>.Fail(ex.Message);
            await context.Response.WriteAsync(JsonSerializer.Serialize(body, SerializerOptions));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unhandled exception while processing {Path}", context.Request.Path);

            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

            var body = ApiResponse<object>.Fail("An unexpected error occurred.");
            await context.Response.WriteAsync(JsonSerializer.Serialize(body, SerializerOptions));
        }
    }
}
