using MediatR;
using Microsoft.AspNetCore.Mvc;
using ProbabilityCalculator.Attributes;
using ProbabilityCalculator.Commands;
using ProbabilityCalculator.Enums;
using ProbabilityCalculator.Models;
using ProbabilityCalculator.Probabilities;
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
        public async Task<IActionResult> ExecuteAsync(ProbabilityCalculationTypes calculationType, double operandA, double operandB)
        {
            var calcType = Assembly.GetExecutingAssembly().GetTypes()
                .Where(type => type.GetCustomAttribute<CalculationTypeAttribute>()?.ProbabilityCalculationType == calculationType);

            var calculation = Activator.CreateInstance(calcType.First());

            var result = await _mediator.Send(calculation);

            return new JsonResult(result);
        }
    }
}
