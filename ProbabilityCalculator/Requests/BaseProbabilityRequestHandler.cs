using MediatR;
using ProbabilityCalculator.Enums;
using ProbabilityCalculator.Models;

namespace ProbabilityCalculator.Requests
{
    public abstract class BaseProbabilityRequestHandler<T> : IRequestHandler<T, ProbabilityCalculationResult> where T : IRequest<ProbabilityCalculationResult>
    {
        protected readonly ILogger<BaseProbabilityRequestHandler<T>> _logger;

        public BaseProbabilityRequestHandler(ILogger<BaseProbabilityRequestHandler<T>> logger)
        {
            _logger = logger;
        }

        public abstract Task<ProbabilityCalculationResult> Handle(T request, CancellationToken cancellationToken);

        protected void LogCalculationResult(ProbabilityCalculationTypes calculationType, double OperandA, double OperandB, double result)
        {
            var dateOfOperation = DateTime.Now.ToString("dd/MM/yyyy");
            _logger.LogInformation("At {0} performed calculation of type {1} with parameters {2} and {3} with result of: {4}",
                dateOfOperation,
                calculationType,
                OperandA,
                OperandB,
                result);
        }
    }
}
