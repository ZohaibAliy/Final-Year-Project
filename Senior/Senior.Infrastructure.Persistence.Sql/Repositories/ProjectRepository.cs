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
                            id = p.Id,
                            EquipmentName = e.ProductName,
                            Description = e.Description,
                            price = e.Price
                        };
            return await query.ToListAsync();
        }
        public async Task<List<ProjectLabourList>> GetProjectLabour(int projectId)
        {
            var query = from p in _context.ProjectLabour
                        join l in _context.Labour on p.LabourId equals l.Id
                        where p.ProjectId == projectId
                        select new ProjectLabourList
                        {
                            id = p.Id,
                            FirstName = l.FirstName,
                            LastName = l.LastName,
                            Speciality = l.Speciality,
                            PhNumber = l.PhNumber,
                            Charges = l.Charges,

                        };
            return await query.ToListAsync();
        }
    

            public async Task<bool> UpdateProject(Project request)
        {




            _context.Project.Update(request);

            _context.SaveChanges();
            return true;


        }
        public async Task<bool> UpdateActualbudget(Project request)
        {




            _context.Project.Update(request);

            _context.SaveChanges();
            return true;


        }
        public async Task<bool> RemoveProjectLabour(int request)
        {
            var projectlabour = await _context.ProjectLabour.Where(x => x.Id == request).FirstOrDefaultAsync();
            if (projectlabour == null)
            {
                return false;
            }
            _context.ProjectLabour.Remove(projectlabour);
            await _context.SaveChangesAsync();
            return true;
        }
        public async Task<bool> RemoveProjectEquipment(int request)
        {
            var projectequipment = await _context.ProjectEquipment.Where(x => x.Id == request).FirstOrDefaultAsync();
            if (projectequipment == null)
            {
                return false;
            }
            _context.ProjectEquipment.Remove(projectequipment);
            await _context.SaveChangesAsync();
            return true;
        }
        public async Task<Product> GetEquipmentbyid(int Id)
        {
            var product =await _context.Product.Where(x => x.Id == Id).FirstOrDefaultAsync();
            return product;


        }
        public async Task<Labour> GetLabourbyid(int Id)
        {
            var labour = await _context.Labour.Where(x=> x.Id == Id).FirstOrDefaultAsync();
            return labour;
        }
        public async Task<Project> GetProjectbyid(int Id)
        {
            var project = await _context.Project.Where(x => x.Id == Id).FirstOrDefaultAsync();
            return project;
        }
        public async Task<ProjectLabour> GetProjectLabourByLabourId(int id)
        {
            var query = from p in _context.ProjectLabour
                        where p.Id == id
                        select new ProjectLabour
                        {
                            Id=p.Id,
                            ProjectId=p.ProjectId,
                            LabourId=p.LabourId
                            
                        };

            return await query.FirstOrDefaultAsync();
        }
        public async Task<ProjectEquipment> GetProjectEquipmentByEquipmentId(int id)
        {
            var query = from p in _context.ProjectEquipment
                        where p.Id == id
                        select new ProjectEquipment
                        {
                            Id = p.Id,
                            ProjectId = p.ProjectId,
                            EquipmentId = p.EquipmentId

                        };

            return await query.FirstOrDefaultAsync();
        }





    }
}
