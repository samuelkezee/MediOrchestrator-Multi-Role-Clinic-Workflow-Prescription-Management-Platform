using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace MediOrchestratorAPI.Middleware.GException
{
    public class GlobalExcptionHandler : IExceptionHandler
    {
        private readonly ILogger<GlobalExcptionHandler> logger;

        public GlobalExcptionHandler(ILogger<GlobalExcptionHandler> logger)
        {
            this.logger = logger;
        }

        public async ValueTask<bool> TryHandleAsync(HttpContext context, Exception exception, CancellationToken cancellationToken)
        {
            logger.LogError(exception, "Error message: {Message}, occured at :{Time} ", exception.Message, DateTime.UtcNow);

            ProblemDetails problemDetails = new ProblemDetails()
            {
                Status = StatusCodes.Status500InternalServerError,
                Title = exception.GetType().Name,
                Detail = exception.Message
            };

            context.Response.StatusCode = problemDetails.Status.Value;
            await context.Response.WriteAsJsonAsync(problemDetails, cancellationToken);

            return true;
        }
    }
}

