using Microsoft.AspNetCore.Mvc;
using Senior.Application.Contracts.Requests;
using Senior.Application.Contracts.Response;
using Senior.Application.Interfaces;
using Senior.Infrastructure.Persistence.Sql.Models;

namespace Senior.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : Controller
    {

        private readonly IProductService _productservice;

        public ProductController(IProductService productservice)
        {
            _productservice = productservice;
        }
        [HttpPost]
        [Route("AddEquipment")]
        [Produces(typeof(ApiResponse<string>))]
        public async Task<IActionResult> AddProduct([FromForm] AddProductRequest request)
        {
            if (request == null) return BadRequest();
            var response = await _productservice.AddProduct(request);
            return Ok(response);
        }
        [HttpGet]
        [Route("GetEquipment")]
        [Produces(typeof(List<Product>))]
        public async Task<IActionResult> GetProduct()
        {
           
            var response = await _productservice.GetProduct();
            return Ok(response);
        }
        [HttpPut]
        [Route("UpdateEquipment")]
        [Produces(typeof(ApiResponse<string>))]
        public async Task<IActionResult> UpdateProduct([FromForm] UpdateProductRequest request)
        {

            var response = await _productservice.UpdateProduct(request);
            return Ok(response);
        }
        [HttpPut]
        [Route("RemoveEquipment")]
        [Produces(typeof(ApiResponse<string>))]
        public async Task<IActionResult> RemoveProduct(UpdateRequest request)
        {

            var response = await _productservice.RemoveProduct(request.Id);
            return Ok(response);
        }
    }
}
