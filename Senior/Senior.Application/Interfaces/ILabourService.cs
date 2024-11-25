using Senior.Application.Contracts.Requests;
using Senior.Application.Contracts.Response;
using Senior.Domain.Entities.Contractor_list;
using Senior.Infrastructure.Persistence.Sql.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Senior.Application.Interfaces
{
    public interface ILabourService
    {
        Task<ApiResponse<string>> AddLabour(AddLabourRequest request);
        Task<List<Labour>> GetLabour();
        Task<List<Labour>> GetActiveLabour();
        Task<ApiResponse<string>> UpdateLabour(UpdateLabourRequest request);
        Task<ApiResponse<string>> RemoveLabour(int id);
     

    }
}