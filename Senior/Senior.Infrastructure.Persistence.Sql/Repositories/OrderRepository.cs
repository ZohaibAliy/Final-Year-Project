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
    public class OrderRepository : IOrderRepository
    {

        private readonly SeniorContext _context;
        public OrderRepository(SeniorContext context)
        {
            _context = context;
        }
        public async Task<Order?> PlaceOrder(Order entity)
        {
            var response = await _context.Order.AddAsync(entity);

            await _context.SaveChangesAsync();

            return response.Entity;
        }

        public async Task<bool> ChangeStatus(int id,string status)
        {


            var order = new Order()
            {
                Id=id,
                Status = status,
            };


            _context.Order.Attach(order);
            var response = _context.Entry(order).Property(x => x.Status).IsModified = true;
            _context.SaveChanges();
            return response;



        }

    }
}
