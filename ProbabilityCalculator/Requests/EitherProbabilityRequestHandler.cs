using ProbabilityCalculator.Enums;
using ProbabilityCalculator.Models;

namespace ProbabilityCalculator.Requests
{
    public class EitherProbabilityRequestHandler : BaseProbabilityRequestHandler<EitherProbabilityRequest>
    {

        public EitherProbabilityRequestHandler(ILogger<EitherProbabilityRequestHandler> logger)
            : base(logger)
        {
        }

        public override Task<ProbabilityCalculationResult> Handle(EitherProbabilityRequest request, CancellationToken cancellationToken)
        {
            return Task.Run(() =>
            {
                var result = request.OperandA + request.OperandB - request.OperandA * request.OperandB;

                LogCalculationResult(ProbabilityCalculationTypes.Either, request.OperandA, request.OperandB, result);

                return new ProbabilityCalculationResult
                {
                    Probability = result
                };
            });
        }
    }
}
