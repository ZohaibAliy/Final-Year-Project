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
    public interface IProjectService
    {

        Task<ApiResponse<string>> AddProject(AddProjectRequest request);
        Task<List<Project>> GetProject();
        Task<ApiResponse<string>> UpdateProject(UpdateProjectRequest request);
        Task<ApiResponse<string>> RemoveProject(int id);
        Task<ApiResponse<string>> RemoveProjectEquipemnt(int request);
        Task<ApiResponse<string>> RemoveProjectLabour(int request);
        Task<ApiResponse<bool>> AssignLabour(AssignLabourRequest request);
        Task<ApiResponse<bool>> AssignEquipment(AssignEquipmentRequest request);
        Task<List<Contractorlist>> GetContractor();
        Task<List<ProjectEquipmentList>> GetProjectEquipment(int projectId);
        Task<List<ProjectLabourList>> GetProjectLabour(int projectId);
        Task<List<Project>> GetMyProject(int id);
        Task<ApiResponse<string>> UpdateActualbudget(UpdateProjectActualbudget request);

    }
        

    }

