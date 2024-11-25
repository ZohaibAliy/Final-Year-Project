using Senior.Application.Contracts.Requests;
using Senior.Application.Contracts.Response;
using Senior.Infrastructure.Persistence.Sql.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Senior.Application.Interfaces
{
    public interface IProductService
    {
        Task<ApiResponse<string>> AddProduct(AddProductRequest request);
        Task<List<Product>> GetProduct();
        Task<List<Product>> GetActiveProduct();
        Task<ApiResponse<string>> UpdateProduct(UpdateProductRequest request);
        Task<ApiResponse<string>> RemoveProduct(int id);

    }
}
