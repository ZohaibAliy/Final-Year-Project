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
        [HttpPost]
        [Route("AssignLabour")]
        [Produces(typeof(ApiResponse<string>))]
        public async Task<IActionResult> AssignLabour(AssignLabourRequest request)
        {
            if (request == null) return BadRequest();
            var response = await _projectservice.AssignLabour(request);
            return Ok(response);
        }

        [HttpPost]
        [Route("AssignEquipment")]
        [Produces(typeof(ApiResponse<string>))]
        public async Task<IActionResult> AssignEquipment(AssignEquipmentRequest request)
        {
            if (request == null) return BadRequest();
            var response = await _projectservice.AssignEquipment(request);
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
        [HttpGet]
        [Route("GetMyProject")]
        [Produces(typeof(List<Project>))]
        public async Task<IActionResult> GetMyProject(int id)
        {

            var response = await _projectservice.GetMyProject(id);
            return Ok(response);
        }
        [HttpGet]
        [Route("GetProjectEquipment")]
        [Produces(typeof(List<ProjectEquipmentList>))]
        public async Task<IActionResult> GetProjectEquipment(int projectId)
        {

            var response = await _projectservice.GetProjectEquipment(projectId);
            return Ok(response);
        }
        [HttpGet]
        [Route("GetProjectLabour")]
        [Produces(typeof(List<ProjectLabourList>))]
        public async Task<IActionResult> GetProjectLabour(int labourId)
        {

            var response = await _projectservice.GetProjectLabour(labourId);
            return Ok(response);
        }
        [HttpPut]
        [Route("UpdateProject")]
        [Produces(typeof(ApiResponse<string>))]
        public async Task<IActionResult> UpdateProject( UpdateProjectRequest request)
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
        [HttpGet]
        [Route("GetContractor")]
        [Produces(typeof(List<Contractorlist>))]
        public async Task<IActionResult> GetContractor()
        {

            var response = await _projectservice.GetContractor();
            return Ok(response);
        }
        

    }
}
