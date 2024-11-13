﻿using Senior.Domain.Entities.Contractor_list;
using Senior.Infrastructure.Persistence.Sql.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Senior.Infrastructure.Persistence.Sql.Interfaces
{
    public interface IProjectRepository
    {
        Task<Project> AddProject(Project entity);
        Task<bool> UpdateProject(Project request);
        Task<bool> AssignLabour(ProjectLabour request);
        Task<bool> AssignEquipment(ProjectEquipment request);
        Task<List<Contractorlist>> GetContractor();
    }
}
