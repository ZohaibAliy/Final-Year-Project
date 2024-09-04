using Senior.Application.Contracts.Requests;
using Senior.Application.Contracts.Response;
using Senior.Application.Interfaces;
using Senior.Infrastructure.Persistence.Sql.Interfaces;
using Senior.Infrastructure.Persistence.Sql.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Senior.Application.Services
{
    public class OrderService : IOrderService
    {
        private readonly IGenericRepository<Order> _repository;
     
        private readonly IOrderRepository _orderrepository;

        public OrderService(IGenericRepository<Order> repository, IOrderRepository orderrepository)
        {

            _repository = repository;
            _orderrepository = orderrepository;




        }

        public async Task<List<Order>> GetOrder()
        {
            var res = await _repository.Get();


            return res;
        }

        public async Task<List<Order>> GetMyOrder(int id)
        {
            var res = await _repository.Get(x=>x.UserId==id);


            return res;
        }
        public async Task<ApiResponse<string>> PlaceOrder(OrderRequest request)
        {
            var response = new ApiResponse<string>();
            try
            {


                var order = new Order
                {

                    ProductId = request.ProductId,
                    Address=request.Address,
                    UserId = request.UserId,
               CustomerEmail=request.CustomerEmail,
               CustomerName=request.CustomerName,
                    ProductName=request.ProductName,
                    OrderDateTime = DateTime.Now,
                    Status="Pending",



                };

                var result = await _orderrepository.PlaceOrder(order);



                if (result != null)
                {
                    response.IsRequestSuccessful = true;
                    response.SuccessResponse = $"Order placed successfully!";
                }
                else
                {
                    response.IsRequestSuccessful = false;
                    response.Errors = new List<string> { { $"Something went wrong" } };
                }


            }
            catch (Exception ex)
            {
                response.IsRequestSuccessful = false;
                response.SuccessResponse = ex.Message;
                response.Errors = new List<string> { { $"Something went wrong Error: " } };
            }
            return response;
        }



        public async Task<ApiResponse<string>> ChangeStatus(int id, string status)
        {
            var response = new ApiResponse<string>();

         
                try
                {

                var res = _orderrepository.ChangeStatus(id,status);
                    if (res.Result==true)
                    {
                        response.IsRequestSuccessful = true;
                        response.SuccessResponse = $"Status Updated Successfuly!";
                    }
                    else
                    {
                        response.IsRequestSuccessful = false;
                        response.SuccessResponse = $"Something went wrong!";
                    }



                }
                catch (Exception Ex)
                {
                    response.IsRequestSuccessful = false;
                    response.SuccessResponse = Ex.Message;

                }
            
            return response;
        }

        public async Task<ApiResponse<string>> UpdateOrder(UpdateOrderRequest request)
        {
            var response = new ApiResponse<string>();
            var res = await _repository.GetSingleByFilter(x => x.Id == request.Id);
      
            if (res != null)
            {

                res.CustomerName = request.CustomerName;
                res.CustomerEmail = request.CustomerEmail;
                res.Address = request.Address;

                var result = await _repository.Update(res);
                if (result == 1)
                {
                    response.IsRequestSuccessful = true;
                    response.SuccessResponse = $"Order Updated successfully";
                }
                else
                {
                    response.IsRequestSuccessful = false;
                    response.Errors = new List<string> { { $"Something went wrong" } };
                }

            }
            else
            {
                response.IsRequestSuccessful = false;
                response.Errors = new List<string> { { $"Something went wrong" } };
            }
            return response;
        }
    }
    }

