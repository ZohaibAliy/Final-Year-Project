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
    public class ProductRepository: IProductRepository
    {
        private readonly SeniorContext _context;
        public ProductRepository(SeniorContext context)
        {
            _context = context;
        }
        public async Task<Product> GetActiveProduct()
        {
            var res = await _context.Product.Where(x=> x.IsAvailable==true && x.IsActive==true).ToListAsync();
            return res.FirstOrDefault();
        }
        public async Task<Product> GetUnactiveProducts()
        {
            var res = await _context.Product.Where(x => x.IsActive == false).ToListAsync();
            return res.FirstOrDefault();
        }
        public async Task<Product?> AddProduct(Product entity)
        {
            var response = await _context.Product.AddAsync(entity);

            await _context.SaveChangesAsync();

            return response.Entity;
        }
        public async Task<bool> UpdateProduct(Product request)
        {

            _context.Product.Update(request);
          
          await  _context.SaveChangesAsync();
            return true;



        }
        public async Task<bool> ActiveProduct(Product request)
        {
            _context.Product.Update(request);
            await _context.SaveChangesAsync();
            return true;
        }

    }
}
