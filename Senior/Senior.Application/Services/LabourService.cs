using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Senior.Application.Common.Configuration;
using Senior.Application.Contracts.Requests;
using Senior.Application.Contracts.Response;
using Senior.Application.Interfaces;
using Senior.Domain.Entities.Contractor_list;
using Senior.Infrastructure.Persistence.Sql.Interfaces;
using Senior.Infrastructure.Persistence.Sql.Models;
using Senior.Infrastructure.Persistence.Sql.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Senior.Application.Services
{
    public class LaborService : ILabourService
    {

        private readonly ILabourRepository _Labourrepository;
        private readonly IGenericRepository<Labour> _repository;
        public static IWebHostEnvironment _environment;

        public LaborService(ILabourRepository Labourrepository, IGenericRepository<Labour> repository, IWebHostEnvironment environment)
        {

            _Labourrepository = Labourrepository;
            _repository = repository;
            _environment = environment;




        }
        public async Task<ApiResponse<string>> AddLabour(AddLabourRequest request)
        {
            var response = new ApiResponse<string>();
            try
            {


                var labour = new Labour
                {
                    FirstName = request.FirstName,
                    LastName = request.LastName,   
                    Speciality =  request.Speciality,
                    PhNumber = request.PhNumber,
                    Charges =  request.Charges,
                    Image=UploadService(request.Image),
                    CreatedDate=DateTime.Now,
                    IsAvailable = true,
                    IsActive = true,



                };

                var result = await _Labourrepository.AddLabour(labour);



                if (result != null)
                {
                    response.IsRequestSuccessful = true;
                    response.SuccessResponse = $"Labour added successfully";
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

        public async Task<List<Labour>> GetLabour()
        {


            var res = await _repository.Get(x => x.IsActive == true);


            return res;

        }
      

        public async Task<ApiResponse<string>> UpdateLabour(UpdateLabourRequest request)
        {
            var response = new ApiResponse<string>();
            var res = await _repository.GetSingleByFilter(x => x.Id == request.Id);

            if (res != null)
            {
                res.Id = request.Id;
                res.FirstName = request.FirstName;
                res.LastName = request.LastName;
                res.Speciality = request.Speciality;
                res.Address=request.Address;
                res.PhNumber= request.PhNumber;

                res.Charges = request.Charges;

                res.Image = UploadService(request.image);
                

                var result = await _Labourrepository.UpdateLabour(res);
                if (result)
                {
                    response.IsRequestSuccessful = true;
                    response.SuccessResponse = $"Labour Updated successfully";
                }
                else
                {
                    response.IsRequestSuccessful = false;
                    response.Errors = new List<string> { { $"Something went  wrong" } };
                }

            }
            else
            {
                response.IsRequestSuccessful = false;
                response.Errors = new List<string> { { $"Something went went wrong" } };
            }
            return response;
        }

        public async Task<ApiResponse<string>> RemoveLabour(int id)
        {
            var response = new ApiResponse<string>();
            var res = await _repository.GetSingleByFilter(x => x.Id == id);

            if (res != null)
            {
                res.IsActive = false;

                var result = await _Labourrepository.UpdateLabour(res);
                if (result)
                {
                    response.IsRequestSuccessful = true;
                    response.SuccessResponse = $"Labour Removed successfully";
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
                response.SuccessResponse = $"Labour not found";
                response.Errors = new List<string> { { $"Something went wrong" } };
            }
            return response;
        }





        /*    public async Task<ApiResponse<string>> UploadService(AddLabourRequest request)
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
