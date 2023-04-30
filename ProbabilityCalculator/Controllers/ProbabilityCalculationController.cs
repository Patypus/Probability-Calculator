using MediatR;
using Microsoft.AspNetCore.Mvc;
using ProbabilityCalculator.Attributes;
using ProbabilityCalculator.Enums;
using System.Net;
using System.Reflection;

namespace ProbabilityCalculator.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProbabilityCalculationController : ControllerBase
    {
        private readonly ILogger<ProbabilityCalculationController> _logger;
        private readonly IMediator _mediator;

        public ProbabilityCalculationController(ILogger<ProbabilityCalculationController> logger, IMediator mediator)
        {
            _logger = logger;
            _mediator = mediator;
        }

        [HttpGet]
        [Route("types")]
        public async Task<IActionResult> GetTypesAsync()
        {
            var result = await Task.Run(() => Enum.GetNames(typeof(ProbabilityCalculationTypes)));

            return new JsonResult(result);
        }

        [HttpGet]
        [Route("execute")]
        public async Task<IActionResult> ExecuteAsync(ProbabilityCalculationTypes type, double operandA, double operandB)
        {
            if (!IsOperandValid(operandA) || !IsOperandValid(operandB))
            {
                return BadRequest(new { message = "Both operands must be >= 0 and <= 1" });
            }

            var calculationType = GetAvailableCalculationTypes(type);
            if (!calculationType.Any())
            {
                return new StatusCodeResult((int)HttpStatusCode.NotImplemented);
            }

            var calculationRequest = Activator.CreateInstance(Enumerable.First(calculationType), operandA, operandB);
            if (calculationRequest == null)
            {
                return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
            }

            var result = await _mediator.Send(calculationRequest);
            return new JsonResult(result);
        }

        private bool IsOperandValid(double operand) => operand >= 0 && operand <= 1.0;

        private IEnumerable<Type> GetAvailableCalculationTypes(ProbabilityCalculationTypes type) => 
            Assembly.GetExecutingAssembly()
                .GetTypes()
                .Where(assemblyType => assemblyType.GetCustomAttribute<CalculationTypeAttribute>()?.ProbabilityCalculationType == type);
    }
}
