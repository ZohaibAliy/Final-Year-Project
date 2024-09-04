using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Senior.Application.Contracts.Requests;
using Senior.Application.Contracts.Response;
using Senior.Application.Interfaces;
using Senior.Infrastructure.Persistence.Sql.Models;

namespace Senior.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {

        private readonly IOrderService _orderservice;

        public OrderController(IOrderService orderservice)
        {
            _orderservice = orderservice;
        }
        [HttpGet]
        [Route("GetOrders")]
        [Produces(typeof(List<Order>))]
        public async Task<IActionResult> GetProduct()
        {

            var response = await _orderservice.GetOrder();
            return Ok(response);
        }
        [HttpGet]
        [Route("MyOrders")]
        [Produces(typeof(ApiResponse<string>))]
        public async Task<IActionResult> GetMyOrders(int id)
        {

            var response = await _orderservice.GetMyOrder(id);
            return Ok(response);
        }

        [HttpPut]
        [Route("ChangeStatus")]
        [Produces(typeof(ApiResponse<string>))]
        public async Task<IActionResult> ChangeStatus(ChangeStatusRequest request)
        {

            var response = await _orderservice.ChangeStatus(request.id, request.status);
            return Ok(response);
        }


        [HttpPost]
        [Route("PlaceOrders")]
        [Produces(typeof(ApiResponse<string>))]
        public async Task<IActionResult> PlaceOrder(OrderRequest request)
        {

            var response = await _orderservice.PlaceOrder(request);
            return Ok(response);
        }

        [HttpPut]
        [Route("UpdateOrder")]
        [Produces(typeof(ApiResponse<string>))]
        public async Task<IActionResult> UpdateOrder(UpdateOrderRequest request)
        {

            var response = await _orderservice.UpdateOrder(request);
            return Ok(response);
        }

    }
}
