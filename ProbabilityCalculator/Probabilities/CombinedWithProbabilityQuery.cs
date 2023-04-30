using MediatR;
using ProbabilityCalculator.Attributes;
using ProbabilityCalculator.Models;

namespace ProbabilityCalculator.Commands
{
    [CalculationType(Enums.ProbabilityCalculationTypes.CombinedWith)]
    public class CombinedWithProbabilityQuery : IRequest<ProbabilityCalculationResult>
    {
    }
}
