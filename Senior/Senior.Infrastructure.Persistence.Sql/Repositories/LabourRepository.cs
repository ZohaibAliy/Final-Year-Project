using Microsoft.EntityFrameworkCore;
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
    }
}




    
