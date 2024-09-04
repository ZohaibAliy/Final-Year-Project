using Senior.Application.Contracts.Requests;
using Senior.Application.Contracts.Response;
using Senior.Infrastructure.Persistence.Sql.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Senior.Application.Interfaces
{
    public interface IAuthenticationService
    {
        Task<LoginResponse> UserAuthentication(LoginRequest request);
        Task<ApiResponse<string>> RegisterUser(RegisterRequest request);
        Task<ApiResponse<string>> AddAdmin(AddUserRequest request);
        Task<ApiResponse<string>> UpdateUser(UpdateUserRequest request);
        Task<ApiResponse<string>> RemoveUser(int id);
        Task<List<User>> GetAllUser();

    }
}
