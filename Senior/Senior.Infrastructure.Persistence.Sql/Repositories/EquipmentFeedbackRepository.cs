using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Senior.Infrastructure.Persistence.Sql.Models;
using Microsoft.EntityFrameworkCore;
using Senior.Domain.Entities.Contractor_list;
using Senior.Infrastructure.Persistence.Sql.Context;
using Senior.Infrastructure.Persistence.Sql.Interfaces;
using Senior.Infrastructure.Persistence.Sql.Models;

namespace Senior.Infrastructure.Persistence.Sql.Repositories
{
    public class EquipmentFeedbackRepository : IEquipmentFeedbackRepoaitory
    {
        private readonly SeniorContext _context;
        public async Task<EquipmentFeedback> AddEquipmentFeedback(EquipmentFeedback entity)
        {
            var response = await _context.EquipmentFeedback.AddAsync(entity);

            await _context.SaveChangesAsync();

            return response.Entity;
        }
    }
}
