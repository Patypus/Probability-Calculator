using Microsoft.Extensions.Logging;
using Moq;

namespace ProbabilityCalculatorTests.Requests
{
    public class ProbabilityRequestHandlerTestBase<T>
    {
        protected Mock<ILogger<T>> _mockLogger;

        protected void VerifyLoggerCall(LogLevel expectededLevel, string expectedMessage)
        {
            _mockLogger.Verify(mock =>
                mock.Log(It.Is<LogLevel>(level => level == expectededLevel),
                    It.IsAny<EventId>(),
                    It.Is<It.IsAnyType>((v, t) => v.ToString() == expectedMessage),
                    It.IsAny<Exception>(),
                    It.Is<Func<It.IsAnyType, Exception, string>>((v, t) => true)), Times.Once);
        }
    }
}
