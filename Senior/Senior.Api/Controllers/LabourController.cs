using Microsoft.AspNetCore.Mvc;
using Senior.Application.Contracts.Requests;
using Senior.Application.Contracts.Response;
using Senior.Application.Interfaces;
using Senior.Infrastructure.Persistence.Sql.Models;

namespace Senior.Api.Controllers
{


        [Route("api/[controller]")]
        [ApiController]
        public class LabourController : Controller
        {

            private readonly ILabourService _Labourservice;

            public LabourController(ILabourService Labourservice)
            {
                _Labourservice = Labourservice;
            }
            [HttpPost]
            [Route("AddLabour")]
            [Produces(typeof(ApiResponse<string>))]
            public async Task<IActionResult> AddLabour([FromForm] AddLabourRequest request)
            {
                if (request == null) return BadRequest();
                var response = await _Labourservice.AddLabour(request);
                return Ok(response);
            }
            [HttpGet]
            [Route("GetLabour")]
            [Produces(typeof(List<Labour>))]
            public async Task<IActionResult> GetProduct()
            {

                var response = await _Labourservice.GetLabour();
                return Ok(response);
            }
            [HttpPut]
            [Route("UpdateLabour")]
            [Produces(typeof(ApiResponse<string>))]
            public async Task<IActionResult> UpdateLabour([FromForm] UpdateLabourRequest request)
            {

                var response = await _Labourservice.UpdateLabour(request);
                return Ok(response);
            }
            [HttpPut]
            [Route("RemoveLabour")]
            [Produces(typeof(ApiResponse<string>))]
            public async Task<IActionResult> RemoveLabour(UpdateRequest request)
            {

                var response = await _Labourservice.RemoveLabour(request.Id);
                return Ok(response);
            }
        }
    }

