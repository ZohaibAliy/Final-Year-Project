using Microsoft.AspNetCore.Mvc;
using Senior.Application.Contracts.Requests;
using Senior.Application.Contracts.Response;
using Senior.Application.Interfaces;
using Senior.Infrastructure.Persistence.Sql.Models;

namespace Senior.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : Controller
    {
        private readonly IProjectService _projectservice;

        public ProjectController(IProjectService projectservice)
        {
            _projectservice = projectservice;
        }
        [HttpPost]
        [Route("AddProject")]
        [Produces(typeof(ApiResponse<string>))]
        public async Task<IActionResult> AddProject( AddProjectRequest request)
        {
            if (request == null) return BadRequest();
            var response = await _projectservice.AddProject(request);
            return Ok(response);
        }
        [HttpGet]
        [Route("GetProject")]
        [Produces(typeof(List<Project>))]
        public async Task<IActionResult> GetProject()
        {

            var response = await _projectservice.GetProject();
            return Ok(response);
        }
        [HttpPut]
        [Route("UpdateProject")]
        [Produces(typeof(ApiResponse<string>))]
        public async Task<IActionResult> UpdateProject([FromForm] UpdateProjectRequest request)
        {

            var response = await _projectservice.UpdateProject(request);
            return Ok(response);
        }
        [HttpPut]
        [Route("RemoveProject")]
        [Produces(typeof(ApiResponse<string>))]
        public async Task<IActionResult> RemoveProject(UpdateRequest request)
        {

            var response = await _projectservice.RemoveProject(request.Id);
            return Ok(response);
        }
    }
}
