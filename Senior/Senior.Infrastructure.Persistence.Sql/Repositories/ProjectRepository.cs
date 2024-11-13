using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Senior.Domain.Entities.Contractor_list;
using Senior.Infrastructure.Persistence.Sql.Context;
using Senior.Infrastructure.Persistence.Sql.Interfaces;
using Senior.Infrastructure.Persistence.Sql.Models;

namespace Senior.Infrastructure.Persistence.Sql.Repositories
{
    public class ProjectRepository :IProjectRepository
    {

        private readonly SeniorContext _context;
        public ProjectRepository(SeniorContext context)
        {
            _context = context;
        }
        public async Task<Project?> AddProject(Project entity)
        {
            var response = await _context.Project.AddAsync(entity);

            await _context.SaveChangesAsync();

            return response.Entity;
        }

        public async Task<bool> AssignLabour(ProjectLabour request)
        {
            var response = await _context.ProjectLabour.AddAsync(request);

            await _context.SaveChangesAsync();

            return true;
        }
        public async Task<bool> AssignEquipment(ProjectEquipment request)
        {
            var response = await _context.ProjectEquipment.AddAsync(request);

            await _context.SaveChangesAsync();

            return true;
        }
        public async Task<List<Contractorlist>> GetContractor()
        {
            var contractorlist = await _context.User.Where(x => x.Role == "Contractor").Select(x=> new Contractorlist{Id=x.Id,
            Name=x.FirstName + " " + x.LastName }).ToListAsync();
            return contractorlist;


        }

        public async Task<bool> UpdateProject(Project request)
        {




            _context.Project.Update(request);

            _context.SaveChanges();
            return true;


        }
    }
}
