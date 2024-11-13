using Microsoft.EntityFrameworkCore;
using Senior.Domain.Entities.Contractor_list;
using Senior.Infrastructure.Persistence.Sql.Context;
using Senior.Infrastructure.Persistence.Sql.Interfaces;
using Senior.Infrastructure.Persistence.Sql.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Senior.Infrastructure.Persistence.Sql.Repositories
{

    public class LabourRepository : ILabourRepository
    {
        private readonly SeniorContext _context;
        public LabourRepository(SeniorContext context)
        {
            _context = context;
        }
        public async Task<Labour?> AddLabour(Labour entity)
        {
            var response = await _context.Labour.AddAsync(entity);

            await _context.SaveChangesAsync();

            return response.Entity;
        }
        public async Task<bool> UpdateLabour(Labour request)
        {




            _context.Labour.Update(request);

            _context.SaveChanges();
            return true;



        }
        public async Task<List<Contractorlist>> GetContractor()
        {
            var contractorlist = await _context.User.Where(x => x.Role == "Contractor").Select(x => new Contractorlist
            {
                Id = x.Id,
                Name = x.FirstName + " " + x.LastName
            }).ToListAsync();
            return contractorlist;


        }
    
    }
}




    
