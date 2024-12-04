using Microsoft.AspNetCore.Mvc;
using Senior.Application.Contracts.Requests;
using Senior.Application.Contracts.Response;
using Senior.Application.Interfaces;
using Senior.Application.Services;
using Senior.Domain.Entities.Contractor_list;
using Senior.Infrastructure.Persistence.Sql.Models;

namespace Senior.Api.Controllers
{


    [Route("api/[controller]")]
    [ApiController]
    public class EquipmentFeedbackController : Controller
    {

        private readonly IEquipmentFeedbackService _equipmentFeedbackService;

        public EquipmentFeedbackController(IEquipmentFeedbackService equipmentFeedbackService)
        {
            _equipmentFeedbackService = equipmentFeedbackService;
        }
        [HttpPost]
        [Route("AddEquipmentFeedback")]
        [Produces(typeof(ApiResponse<string>))]
        public async Task<IActionResult> AddEuipmentFeedback( AddEquipmentFeedback request)
        {
            if (request == null) return BadRequest();
            var response = await _equipmentFeedbackService.AddEquipmentFeedback(request);
            return Ok(response);
        }

    }
}
