using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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
        public async Task<bool> UpdateProject(Project request)
        {




            _context.Project.Update(request);

            _context.SaveChanges();
            return true;


        }
    }
}
