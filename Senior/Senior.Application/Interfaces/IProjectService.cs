﻿using Senior.Application.Contracts.Requests;
using Senior.Application.Contracts.Response;
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
    }
}