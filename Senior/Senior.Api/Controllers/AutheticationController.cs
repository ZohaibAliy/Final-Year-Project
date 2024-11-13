using Microsoft.AspNetCore.Mvc;
using Senior.Application.Contracts.Requests;
using Senior.Application.Contracts.Response;
using Senior.Application.Interfaces;
using Senior.Infrastructure.Persistence.Sql.Models;

namespace Senior.Api.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class AutheticationController : ControllerBase
    {
        private readonly IAuthenticationService _authenticationService;

        public AutheticationController(IAuthenticationService authenticationService)
        {
            _authenticationService = authenticationService;
        }
        [HttpPost]
        [Route("Login")]
        [Produces(typeof(LoginResponse))]
        public async Task<IActionResult> Login(LoginRequest request)
        {
            if (request == null) return BadRequest();
            var response = await _authenticationService.UserAuthentication(request);
            return Ok(response);
        }

        [HttpPost]
        [Route("Register")]
        [Produces(typeof(ApiResponse<string>))]
        public async Task<IActionResult> RegisterUser(RegisterRequest request)
        {
            if (request == null) return BadRequest();
            var response = await _authenticationService.RegisterUser(request);
            return Ok(response);
        }

        [HttpGet]
        [Route("GetAllUsers")]
        [Produces(typeof(List<User>))]
        public async Task<IActionResult> GetAllUsers()
        {

            var response = await _authenticationService.GetAllUser();
            return Ok(response);
        }
        [HttpGet]
        

        [HttpPost]
        [Route("AddAdmin")]
        [Produces(typeof(ApiResponse<string>))]
        public async Task<IActionResult> AddAdmin(AddUserRequest request)
        {

            if (request == null) return BadRequest();
            var response = await _authenticationService.AddAdmin(request);
            return Ok(response);
        }

        [HttpPut]
        [Route("UpdateUser")]
        [Produces(typeof(ApiResponse<string>))]
        public async Task<IActionResult> UpdateUser(UpdateUserRequest request)
        {

            if (request == null) return BadRequest();
            var response = await _authenticationService.UpdateUser(request);
            return Ok(response);
        }

        [HttpPut]
        [Route("RemoveUser")]
        [Produces(typeof(ApiResponse<string>))]
        public async Task<IActionResult> RemoveUser(UpdateRequest request)
        {

            if (request == null) return BadRequest();
            var response = await _authenticationService.RemoveUser(request.Id);
            return Ok(response);
        }
    }

}
