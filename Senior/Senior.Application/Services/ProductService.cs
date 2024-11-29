using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Senior.Application.Common.Configuration;
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
    public class ProductService: IProductService
    {

        private readonly IProductRepository _productrepository;
        private readonly IGenericRepository<Product> _repository;
        public static IWebHostEnvironment _environment;

        public ProductService(IProductRepository productrepository, IGenericRepository<Product> repository, IWebHostEnvironment environment)
        {

            _productrepository = productrepository;
            _repository = repository;
            _environment = environment;




        }
        public async Task<ApiResponse<string>> AddProduct(AddProductRequest request)
        {
            var response = new ApiResponse<string>();
            try
            {
             

                var product = new Product
                {

                    ProductName = request.ProductName,
                    Price = request.Price,
                    IsAvailable = true,
                    IsActive=true,
                    Quantity = request.Quantity,
                    Description = request.Description,
                    image = UploadService(request.image),
                    CreatedDate=DateTime.Now,


                    };

                var result = await _productrepository.AddProduct(product);

                  
          
                    if (result != null)
                    {
                        response.IsRequestSuccessful = true;
                        response.SuccessResponse = $"Product added successfully";
                    }
                    else
                    {
                        response.IsRequestSuccessful = false;
                        response.Errors = new List<string> { { $"Something went wrong" } };
                    }
                return response;

            }
            catch (Exception ex)
            {
                response.IsRequestSuccessful = false;
                response.SuccessResponse = ex.Message;
                response.Errors = new List<string> { { $"Something went wrong Error: " } };
                return response;
            }
           
        }

        public async Task<List<Product>> GetProduct()
        {
          

                var res = await _repository.Get(x=>x.IsActive==true);


                return res;
            
        }
        public async Task<List<Product>> GetUnactiveProducts()
        {
            var res = await _repository.Get(x => x.IsActive == false);
            return res;
        }
        public async Task<List<Product>> GetActiveProduct()
        {


            var res = await _repository.Get(x => x.IsAvailable == true && x.IsActive == true);
         


            return res;

        }
        public async Task<List<Product>> GetSelectedProduct()
        {


            var res = await _repository.Get(x => x.IsAvailable == false );



            return res;

        }
        public async Task<ApiResponse<string>> ActiveProduct(int id)
        {
            var response = new ApiResponse<string>();
            var res = await _repository.GetSingleByFilter(x => x.Id ==id);

            if(res!=null)
            {
                res.IsActive= true;
                res.IsAvailable = true;
                var result = await _productrepository.ActiveProduct(res);
                if (result)
                {
                    response.IsRequestSuccessful = true;
                    response.SuccessResponse = $"Product Active successfully";
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
        public async Task<ApiResponse<string>> UpdateProduct(UpdateProductRequest request)
        {
            var response = new ApiResponse<string>();
            var res = await _repository.GetSingleByFilter(x=>x.Id==request.Id);

            if (res != null)
            {
                res.Id = request.Id;
                res.ProductName = request.ProductName;
                res.Price = request.Price;
             
                res.image = UploadService(request.image);
                res.Quantity = request.Quantity;
                res.Description = request.Description;

                var result = await _productrepository.UpdateProduct(res);
                if (result)
                {
                    response.IsRequestSuccessful = true;
                    response.SuccessResponse = $"Product Updated successfully";
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

        public async Task<ApiResponse<string>> RemoveProduct(int id)
        {
            var response = new ApiResponse<string>();
            var res = await _repository.GetSingleByFilter(x => x.Id == id);

            if (res != null)
            {
                res.IsActive = false;
                res.IsAvailable = false;

                var result = await _productrepository.UpdateProduct(res);
                if (result)
                {
                    response.IsRequestSuccessful = true;
                    response.SuccessResponse = $"Product Removed successfully";
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
                response.SuccessResponse = $"Product not found";
                response.Errors = new List<string> { { $"Something went wrong" } };
            }
            return response;
        }





        /*    public async Task<ApiResponse<string>> UploadService(AddProductRequest request)
            {
                var response = new ApiResponse<string>();

                try
                {

                    string filename= "\\Upload\\" + request.image.FileName;
                    if (request.image.Length > 0)
                    {
                        if (!Directory.Exists(AppSettings.Configuration.Upload.Path + "\\Upload"))
                        {
                            Directory.CreateDirectory(AppSettings.Configuration.Upload.Path + "\\Upload\\");
                        }
                        using (FileStream filestream = System.IO.File.Create(AppSettings.Configuration.Upload.Path + "\\Upload\\" + request.image.FileName))
                        {
                            request.image.CopyTo(filestream);
                            filestream.Flush();
                            response.IsRequestSuccessful=true;
                            response.SuccessResponse= AppSettings.Configuration.Upload.Path +"\\Upload\\"+request.image.FileName;
                        }
                    }
                }
                catch (Exception ex)
                {
                    response.IsRequestSuccessful = false;
                    response.SuccessResponse = "Something went wrong! please check error message";
                    response.Errors.Add(ex.Message);

                }
                return response;
            }*/
        public Byte[] UploadService(IFormFile image)
            {
                var response = new ApiResponse<string>();
            MemoryStream ms = new MemoryStream();
            image.CopyTo(ms);



            return ms.ToArray();
            }

    }
}
