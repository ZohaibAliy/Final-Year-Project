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
        [HttpGet]
        [Route("GetActiveEquipment")]
        [Produces(typeof(List<Product>))]
        public async Task<IActionResult> GetActiveProduct()
        {

            var response = await _productservice.GetActiveProduct();
            return Ok(response);
        }
        [HttpGet]
        [Route("GetUnactiveEquipment")]
        [Produces(typeof(List<Product>))]
        public async Task<IActionResult> GetUnactiveProducts()
        {

            var response = await _productservice.GetUnactiveProducts();
            return Ok(response);
        }
        [HttpGet]
        [Route("GetSelectedEquipment")]
        [Produces(typeof(List<Product>))]
        public async Task<IActionResult> GetSelectedProducts()
        {

            var response = await _productservice.GetSelectedProduct();
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
        [Route("ActiveEquipment")]
        [Produces(typeof(ApiResponse<string>))]
        public async Task<IActionResult> ActiveProduct(int id)
        {

            var response = await _productservice.ActiveProduct(id);
            return Ok(response);
        }
        [HttpPut]
        [Route("UnactiveEquipment")]
        [Produces(typeof(ApiResponse<string>))]
        public async Task<IActionResult> RemoveProduct(UpdateRequest request)
        {

            var response = await _productservice.RemoveProduct(request.Id);
            return Ok(response);
        }
    }
}
