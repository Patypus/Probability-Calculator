using ProbabilityCalculator.Enums;

namespace ProbabilityCalculator.Attributes
{
    [AttributeUsage(AttributeTargets.Class)]
    public class CalculationTypeAttribute : Attribute
    {
        public ProbabilityCalculationTypes ProbabilityCalculationType { get; private set; }

        public CalculationTypeAttribute(ProbabilityCalculationTypes supportedType) 
        {
            ProbabilityCalculationType = supportedType;
        }
    }
}
