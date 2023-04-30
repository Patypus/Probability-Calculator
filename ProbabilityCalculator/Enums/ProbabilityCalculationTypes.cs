using System.Text.Json.Serialization;

namespace ProbabilityCalculator.Enums
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum ProbabilityCalculationTypes
    {
        CombinedWith,
        Either
    }
}
