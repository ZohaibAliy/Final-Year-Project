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

    public class LabourRequestRepository : ILabourRequestRepository
    {

        private readonly SeniorContext _context;
        public LabourRequestRepository(SeniorContext context)
        {
            _context = context;
        }
        public async Task<LabourRequest?> PlaceLabourRequest(LabourRequest entity)
        {
            var response = await _context.LabourRequest.AddAsync(entity);

            await _context.SaveChangesAsync();

            return response.Entity;
        }

        public async Task<bool> ChangeStatus(int id, string status)
        {


            var LabourRequest = new LabourRequest()
            {
                Id = id,
                Status = status,
            };


            _context.LabourRequest.Attach(LabourRequest);
            var response = _context.Entry(LabourRequest).Property(x => x.Status).IsModified = true;
            _context.SaveChanges();
            return response;



        }

    }
}
