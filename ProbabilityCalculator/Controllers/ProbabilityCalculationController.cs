using Microsoft.AspNetCore.Mvc;
using ProbabilityCalculator.Models;

namespace ProbabilityCalculator.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProbabilityCalculationController : ControllerBase
    {
        private readonly ILogger<ProbabilityCalculationController> _logger;
        public ProbabilityCalculationController(ILogger<ProbabilityCalculationController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetAsync()
        {
            var result = await Task.Run(() => new ProbabilityCalculationResult
            {
                Probability = 0.5
            });

            return new JsonResult(result);
        }
    }
}
