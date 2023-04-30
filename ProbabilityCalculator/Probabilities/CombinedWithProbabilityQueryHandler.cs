using MediatR;
using ProbabilityCalculator.Commands;
using ProbabilityCalculator.Models;

namespace ProbabilityCalculator.Probabilities
{
    public class CombinedWithProbabilityQueryHandler : IRequestHandler<CombinedWithProbabilityQuery, ProbabilityCalculationResult>
    {
        public Task<ProbabilityCalculationResult> Handle(CombinedWithProbabilityQuery request, CancellationToken cancellationToken)
        {
            return Task.Run(() => new ProbabilityCalculationResult { Probability = 0.22 });
        }
    }
}
