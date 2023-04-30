using MediatR;
using ProbabilityCalculator.Attributes;
using ProbabilityCalculator.Models;

namespace ProbabilityCalculator.Requests
{
    [CalculationType(Enums.ProbabilityCalculationTypes.Either)]
    public class EitherProbabilityRequest : IRequest<ProbabilityCalculationResult>
    {
        public double OperandA { get; protected set; }
        public double OperandB { get; protected set; }

        public EitherProbabilityRequest(double operandA, double operandB)
        {
            OperandA = operandA;
            OperandB = operandB;
        }
    }
}
