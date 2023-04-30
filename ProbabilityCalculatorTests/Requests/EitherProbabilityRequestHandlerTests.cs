using Microsoft.Extensions.Logging;
using Moq;
using ProbabilityCalculator.Enums;
using ProbabilityCalculator.Requests;

namespace ProbabilityCalculatorTests.Requests
{
    public class EitherProbabilityRequestHandlerTests : ProbabilityRequestHandlerTestBase<EitherProbabilityRequestHandler>
    {
        [Fact]
        public async Task Handle_MultipliesRequestOperands()
        {
            // Arrange
            var operandA = 0.5;
            var operandB = 0.5;
            var request = new EitherProbabilityRequest(operandA, operandB);

            var systemUnderTest = GetSystemUnderTest();

            // Act
            var result = await systemUnderTest.Handle(request, default(CancellationToken));

            // Assert
            var expectedResult = GetExpectedResult(operandA, operandB);
            Assert.Equal(expectedResult, result.Probability);
        }

        [Fact]
        public async Task Handle_LogsOutComeOfOperation()
        {
            // Arrange
            var operandA = 0.75;
            var operandB = 0.3;
            var request = new EitherProbabilityRequest(operandA, operandB);

            var systemUnderTest = GetSystemUnderTest();

            // Act
            await systemUnderTest.Handle(request, default(CancellationToken));

            // Assert
            var expectedResult = GetExpectedResult(operandA, operandB);
            var expectedDate = DateTime.Now.ToString("dd/MM/yyyy");
            var exppectedMessage = $"At {expectedDate} performed calculation of type {ProbabilityCalculationTypes.Either} with parameters {operandA} and {operandB} with result of: {expectedResult}";
            VerifyLoggerCall(LogLevel.Information, exppectedMessage);
        }

        private EitherProbabilityRequestHandler GetSystemUnderTest()
        {
            _mockLogger = new Mock<ILogger<EitherProbabilityRequestHandler>>();

            return new EitherProbabilityRequestHandler(_mockLogger.Object);
        }

        private double GetExpectedResult(double operandA, double operandB) => operandA + operandB - operandA * operandB;
    }
}
