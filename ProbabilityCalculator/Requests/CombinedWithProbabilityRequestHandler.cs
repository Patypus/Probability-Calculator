using ProbabilityCalculator.Enums;
using ProbabilityCalculator.Models;

namespace ProbabilityCalculator.Requests
{
    public class CombinedWithProbabilityRequestHandler : BaseProbabilityRequestHandler<CombinedWithProbabilityRequest>
    {
        public CombinedWithProbabilityRequestHandler(ILogger<CombinedWithProbabilityRequestHandler> logger)
            : base(logger)
        {
        }

        public override Task<ProbabilityCalculationResult> Handle(CombinedWithProbabilityRequest request, CancellationToken cancellationToken)
        {
            return Task.Run(() =>
            {
                var result = request.OperandA * request.OperandB;

                LogCalculationResult(ProbabilityCalculationTypes.CombinedWith, request.OperandA, request.OperandB, result);

                return new ProbabilityCalculationResult
                {
                    Probability = result
                };
            });
        }
    }
}
