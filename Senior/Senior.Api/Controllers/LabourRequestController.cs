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

        private readonly ILabourRequestService _orderservice;

        public LabourRequestController(ILabourRequestService orderservice)
        {
            _orderservice = orderservice;
        }
        [HttpGet]
        [Route("GetLabourRequest")]
        [Produces(typeof(List<LabourRequest>))]
        public async Task<IActionResult> GetLabourRequest()
        {

            var response = await _orderservice.GetLabourRequest();
            return Ok(response);
        }
        [HttpGet]
        [Route("MyLabourRequest")]
        [Produces(typeof(ApiResponse<string>))]
        public async Task<IActionResult> GetMyLabourRequest(int id)
        {

            var response = await _orderservice.GetMyLabourRequest(id);
            return Ok(response);
        }

        [HttpPut]
        [Route("ChangeStatus")]
        [Produces(typeof(ApiResponse<string>))]
        public async Task<IActionResult> ChangeStatus(ChangeStatusRequest request)
        {

            var response = await _orderservice.ChangeStatus(request.id, request.status);
            return Ok(response);
        }


        [HttpPost]
        [Route("PlaceLabourRequest")]
        [Produces(typeof(ApiResponse<string>))]
        public async Task<IActionResult> PlaceLabourRequest(LabourRequest request)
        {

            var response = await _orderservice.PlaceLabourRequest(request);
            return Ok(response);
        }

        [HttpPut]
        [Route("UpdateLabourRequest")]
        [Produces(typeof(ApiResponse<string>))]
        public async Task<IActionResult> UpdateLabourRequest(UpdateLabourRequestRequest request)
        {

            var response = await _orderservice.UpdateLabourRequest(request);
            return Ok(response);
        }

    }
}
