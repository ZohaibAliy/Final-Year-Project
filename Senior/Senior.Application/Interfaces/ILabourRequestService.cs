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
  public interface ILabourRequestService
    {
        Task<List<LabourRequest>> GetLabourRequest();
        Task<List<LabourRequest>> GetMyLabourRequest(int id);
        Task<ApiResponse<string>> PlaceLabourRequest(LabourRequest labourRequest);
        Task<ApiResponse<string>> ChangeStatus(int id, string status);
        Task<ApiResponse<string>> UpdateLabourRequest(UpdateLabourRequestRequest request);
    }
}
