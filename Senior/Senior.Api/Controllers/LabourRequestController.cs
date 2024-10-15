using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Senior.Application.Contracts.Requests;
using Senior.Application.Contracts.Response;
using Senior.Application.Interfaces;
using Senior.Infrastructure.Persistence.Sql.Models;


namespace Senior.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class    LabourRequestController : ControllerBase
    {

        private readonly ILabourRequestService _laborrequestservice;

        public LabourRequestController(ILabourRequestService laborrequestservice)
        {
            _laborrequestservice = laborrequestservice;
        }
        [HttpGet]
        [Route("GetLabourRequest")]
        [Produces(typeof(List<LabourRequest>))]
        public async Task<IActionResult> GetLabourRequest()
        {

            var response = await _laborrequestservice.GetLabourRequest();
            return Ok(response);
        }
        [HttpGet]
        [Route("MyLabourRequest")]
        [Produces(typeof(ApiResponse<string>))]
        public async Task<IActionResult> GetMyLabourRequest(int id)
        {

            var response = await _laborrequestservice.GetMyLabourRequest(id);
            return Ok(response);
        }

        [HttpPut]
        [Route("ChangeStatus")]
        [Produces(typeof(ApiResponse<string>))]
        public async Task<IActionResult> ChangeStatus(ChangeStatusRequest request)
        {

            var response = await _laborrequestservice.ChangeStatus(request.id, request.status);
            return Ok(response);
        }


        [HttpPost]
        [Route("PlaceLabourRequest")]
        [Produces(typeof(ApiResponse<string>))]
        public async Task<IActionResult> PlaceLabourRequest(LabourRequest request)
        {

            var response = await _laborrequestservice.PlaceLabourRequest(request);
            return Ok(response);
        }

        [HttpPut]
        [Route("UpdateLabourRequest")]
        [Produces(typeof(ApiResponse<string>))]
        public async Task<IActionResult> UpdateLabourRequest(UpdateLabourRequestRequest request)
        {

            var response = await _laborrequestservice.UpdateLabourRequest(request);
            return Ok(response);
        }

    }
}
