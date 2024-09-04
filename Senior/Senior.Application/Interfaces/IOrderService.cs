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
    public interface IOrderService
    {
        Task<List<Order>> GetOrder();
        Task<List<Order>> GetMyOrder(int id);
        Task<ApiResponse<string>> PlaceOrder(OrderRequest orderrequest);
        Task<ApiResponse<string>> ChangeStatus(int id,string status);
        Task<ApiResponse<string>> UpdateOrder(UpdateOrderRequest request);

    }
}
