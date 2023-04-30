using MediatR;
using ProbabilityCalculator.Attributes;
using ProbabilityCalculator.Models;

namespace ProbabilityCalculator.Requests
{
    [CalculationType(Enums.ProbabilityCalculationTypes.CombinedWith)]
    public class CombinedWithProbabilityRequest : IRequest<ProbabilityCalculationResult>
    {
        public double OperandA { get; protected set; }
        public double OperandB { get; protected set; }

        public CombinedWithProbabilityRequest(double operandA, double operandB) 
        {
            OperandA = operandA;
            OperandB = operandB;
        }
    }
}
