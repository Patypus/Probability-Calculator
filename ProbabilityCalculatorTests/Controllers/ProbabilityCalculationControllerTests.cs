using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using ProbabilityCalculator.Controllers;
using ProbabilityCalculator.Enums;
using ProbabilityCalculator.Models;
using ProbabilityCalculator.Requests;

namespace ProbabilityCalculatorTests.Controllers
{

    public class ProbabilityCalculationControllerTests
    {
        private Mock<ILogger<ProbabilityCalculationController>> _logger = new Mock<ILogger<ProbabilityCalculationController>>();
        private Mock<IMediator> _mediator = new Mock<IMediator>();

        [Fact]
        public async Task GetTypesAsync_ReturnsAllEnumValues()
        {
            // Arrange
            var controller = GetSystemUnderTest();

            // Act
            var result = await controller.GetTypesAsync();

            // Assert
            var jsonResult = result as JsonResult;
            Assert.NotNull(jsonResult);

            var expectedTypes = Enum.GetNames(typeof(ProbabilityCalculationTypes));
            Assert.Equal(expectedTypes, jsonResult.Value);
        }

        [Theory]
        [InlineData(-0.1)]
        [InlineData(1.1)]
        [InlineData(15)]
        public async Task ExecuteAsync_WhenOperandAIsInvalid_ReturnsBadRequest(double operandA)
        {
            // Arrange
            var controller = GetSystemUnderTest();

            // Act
            var result = await controller.ExecuteAsync(ProbabilityCalculationTypes.CombinedWith, operandA, 0.2);

            // Assert
            Assert.True(result is BadRequestObjectResult);
        }

        [Theory]
        [InlineData(-0.1)]
        [InlineData(1.1)]
        [InlineData(15)]
        public async Task ExecuteAsync_WhenOperandBIsInvalid_ReturnsBadRequest(double operandB)
        {
            // Arrange
            var controller = GetSystemUnderTest();

            // Act
            var result = await controller.ExecuteAsync(ProbabilityCalculationTypes.CombinedWith, 0.2, operandB);

            // Assert
            Assert.True(result is BadRequestObjectResult);
        }

        [Fact]
        public async Task ExecuteAsync_WhenCalculationTypeIsCombinedWith_CreatesRequestCorrectly()
        {
            // Arrange
            _mediator
                .Setup(mock => mock.Send(It.IsAny<object>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(new ProbabilityCalculationResult());

            var operandA = 0.3;
            var operandB = 0.4;
            var controller = GetSystemUnderTest();

            // Act
            var result = await controller.ExecuteAsync(ProbabilityCalculationTypes.CombinedWith, operandA, operandB);

            // Assert
            _mediator.Verify(mock => mock.Send(It.Is<object>(arg =>
                ((CombinedWithProbabilityRequest)arg).OperandA == operandA &&
                ((CombinedWithProbabilityRequest)arg).OperandB == operandB
            ), It.IsAny<CancellationToken>()));
        }

        [Fact]
        public async Task ExecuteAsync_WhenCalculationTypeIsEither_CreatesRequestCorrectly()
        {
            // Arrange
            _mediator
                .Setup(mock => mock.Send(It.IsAny<object>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(new ProbabilityCalculationResult());

            var operandA = 0.3;
            var operandB = 0.4;
            var controller = GetSystemUnderTest();

            // Act
            var result = await controller.ExecuteAsync(ProbabilityCalculationTypes.Either, operandA, operandB);

            // Assert
            _mediator.Verify(mock => mock.Send(It.Is<object>(arg =>
                ((EitherProbabilityRequest)arg).OperandA == operandA &&
                ((EitherProbabilityRequest)arg).OperandB == operandB
            ), It.IsAny<CancellationToken>()));
        }

        [Fact]
        public async Task ExecuteAsync_ReturnsValueFromMediator()
        {
            // Arrange
            var calculationResult = new ProbabilityCalculationResult
            {
                Probability = 0.5
            };
            _mediator
                .Setup(mock => mock.Send(It.IsAny<object>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(calculationResult);

            var operandA = 0.3;
            var operandB = 0.4;
            var controller = GetSystemUnderTest();

            // Act
            var result = await controller.ExecuteAsync(ProbabilityCalculationTypes.CombinedWith, operandA, operandB);

            // Assert
            var jsonResult = result as JsonResult;
            Assert.NotNull(jsonResult);

            Assert.Equal(calculationResult, jsonResult.Value);
        }

        private ProbabilityCalculationController GetSystemUnderTest()
        {
            return new ProbabilityCalculationController(_logger.Object, _mediator.Object);
        }
    }
}
