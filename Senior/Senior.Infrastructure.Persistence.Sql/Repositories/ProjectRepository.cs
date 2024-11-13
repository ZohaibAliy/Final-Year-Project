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
        public async Task<List<ProjectEquipmentList>> GetProjectEquipment(int projetId)
        {
            var query = from p in _context.ProjectEquipment
                        join e in _context.Product on p.EquipmentId equals e.Id
                        where p.ProjectId == projetId
                        select new ProjectEquipmentList
                        {
                            id = e.Id,
                            EquipmentName = e.ProductName,
                            Description = e.Description,
                            price = e.Price
                        };
            return await query.ToListAsync();
        }
        public async Task<List<ProjectLabourList>> GetProjectLabour(int labourId)
        {
            var query = from p in _context.ProjectLabour
                        join e in _context.Labour on p.LabourId equals e.Id
                        where p.LabourId == labourId
                        select new ProjectLabourList
                        {
                            id = e.Id,
                            FirstName = e.FirstName,
                            LastName = e.LastName,
                            Speciality = e.Speciality,
                            PhNumber = e.PhNumber,
                            Charges = e.Charges,

                        };
            return await query.ToListAsync();
        }
    

            public async Task<bool> UpdateProject(Project request)
        {




            _context.Project.Update(request);

            _context.SaveChanges();
            return true;


        }
    }
}
