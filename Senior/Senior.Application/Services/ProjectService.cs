using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;
using Senior.Application.Common.Configuration;
using Senior.Application.Contracts.Requests;
using Senior.Application.Contracts.Response;
using Senior.Application.Interfaces;
using Senior.Domain.Entities.Contractor_list;
using Senior.Infrastructure.Persistence.Sql.Interfaces;
using Senior.Infrastructure.Persistence.Sql.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace Senior.Application.Services
{
    public class ProjectService : IProjectService
    {

            private readonly IProjectRepository _projectrepository;
            private readonly IGenericRepository<Project> _repository;
            public static IWebHostEnvironment _environment;

            public ProjectService(IProjectRepository projectrepository, IGenericRepository<Project> repository, IWebHostEnvironment environment)
            {

                _projectrepository = projectrepository;
                _repository = repository;
                _environment = environment;




            }
            public async Task<ApiResponse<string>> AddProject(AddProjectRequest request)
            {
                var response = new ApiResponse<string>();
                try
                {


                var project = new Project
                {

                    Title = request.Title,
                    Description = request.Description,
                    Location = request.Location,
                    StartDate = request.StartDate,
                    EndDate = request.EndDate,
                    IsActive = true,
                    ExpectedBudget = request.ExpectedBudget,
                    ActualBudget=0,
                
                    userid = request.userid,
                    ContractorName= request.ContractorName,
                    
                    Created= DateTime.Now



                    };

                    var result = await _projectrepository.AddProject(project);



                    if (result != null)
                    {
                        response.IsRequestSuccessful = true;
                        response.SuccessResponse = $"project added successfully";
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

            public async Task<List<Project>> GetProject()
            {


                var res = await _repository.Get(x => x.IsActive == true);


                return res;

            }

            public async Task<ApiResponse<string>> UpdateProject(UpdateProjectRequest request)
            {
                var response = new ApiResponse<string>();
                var res = await _repository.GetSingleByFilter(x => x.Id == request.Id);

                if (res != null)
                {
                    
                    res.Id = request.Id;
                    res.Title = request.Title;
                    res.Description = request.Description;
                    res.Location = request.Location;
                    res.StartDate = request.StartDate;
                    res.EndDate = request.EndDate;  

                    res.ExpectedBudget = request.ExpectedBudget;
                res.userid = request.userid;
                res.ContractorName = request.ContractorName;
                    

                    var result = await _projectrepository.UpdateProject(res);
                    if (result)
                    {
                        response.IsRequestSuccessful = true;
                        response.SuccessResponse = $"project Updated successfully";
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

            public async Task<ApiResponse<string>> RemoveProject(int id)
            {
                var response = new ApiResponse<string>();
                var res = await _repository.GetSingleByFilter(x => x.Id == id);

                if (res != null)
                {
                    res.IsActive = false;

                    var result = await _projectrepository.UpdateProject(res);
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
                    response.SuccessResponse = $"project not found";
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


        public async Task<ApiResponse<bool>> AssignLabour(AssignLabourRequest request)
        {
            var response = new ApiResponse<bool>();
            var errorList = new List<string>();
            try
            {
                ProjectLabour projectLabour = new ProjectLabour();
                projectLabour.LabourId = request.Labourid;
                projectLabour.ProjectId = request.ProjectId;
                var res= await _projectrepository.AssignLabour(projectLabour);
                response.IsRequestSuccessful = res;
                response.SuccessResponse = res;
            }
            catch (Exception ex) {
                errorList.Add(ex.Message);
                response.IsRequestSuccessful = false;
                response.SuccessResponse = false;
                response.Errors = errorList;
            }
    
            return response;

        }
        public async Task<ApiResponse<bool>> AssignEquipment(AssignEquipmentRequest request)
        {
            var response = new ApiResponse<bool>();
            var errorList = new List<string>();
            try
            {
                ProjectEquipment projectEquipment = new ProjectEquipment();
                projectEquipment.EquipmentId = request.EquipmentId;
                projectEquipment.ProjectId = request.ProjectId;
                var res = await _projectrepository.AssignEquipment(projectEquipment);
                response.IsRequestSuccessful = res;
                response.SuccessResponse = res;
            }
            catch (Exception ex)
            {
                errorList.Add(ex.Message);
                response.IsRequestSuccessful = false;
                response.SuccessResponse = false;
                response.Errors = errorList;
            }

            return response;

        }
        public Byte[] UploadService(IFormFile image)
            {
                var response = new ApiResponse<string>();
                MemoryStream ms = new MemoryStream();
                image.CopyTo(ms);



                return ms.ToArray();
            
    }
        public async Task<List<Contractorlist>> GetContractor()
        {

            var contractorlist = await _projectrepository.GetContractor();

            return contractorlist;
        }

    }
}
