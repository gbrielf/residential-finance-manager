using System.Text.Json;

namespace ResidentialFinanceManager.Api.Middleware;

public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;

    public ExceptionMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch(Exception exception)
        {
            context.Response.ContentType = "application/json";

            var response = new
            {
                message = exception.Message
            };

            switch (exception)
            {
                case ArgumentException:
                    context.Response.StatusCode = StatusCodes.Status400BadRequest;
                    break;

                case InvalidOperationException:
                    context.Response.StatusCode = StatusCodes.Status400BadRequest;
                    break;

                case KeyNotFoundException:
                    context.Response.StatusCode = StatusCodes.Status404NotFound;
                    break;

                default:
                    context.Response.StatusCode = StatusCodes.Status500InternalServerError;
                    break;
            }

            await context.Response.WriteAsync(
                JsonSerializer.Serialize(response)
            );
        }
        
    }
}