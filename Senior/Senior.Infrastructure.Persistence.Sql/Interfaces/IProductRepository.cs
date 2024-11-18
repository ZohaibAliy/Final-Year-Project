using Senior.Infrastructure.Persistence.Sql.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Senior.Infrastructure.Persistence.Sql.Interfaces
{
    public interface IProductRepository
    {
        Task<Product> AddProduct(Product entity);
        Task<bool> UpdateProduct(Product request);
        


    }
}
