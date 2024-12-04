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
    public class EquipmentFeedbackService : IEquipmentFeedbackService
    {
        private readonly IEquipmentFeedbackRepoaitory _equipmentFeedbackRepoaitory;
        private readonly IGenericRepository<Product> _repository;
        public static IWebHostEnvironment _environment;

        public EquipmentFeedbackService( IGenericRepository<Product> repository, IEquipmentFeedbackRepoaitory equipmentFeedbackRepoaitory, IWebHostEnvironment environment)
        {
            _equipmentFeedbackRepoaitory = equipmentFeedbackRepoaitory;
            _repository = repository;
            _environment = environment;
        }
        public async Task<ApiResponse<string>> AddEquipmentFeedback(AddEquipmentFeedback request)
        {
            var response = new ApiResponse<string>();
            try
            {
                var feedback = new EquipmentFeedback
                {
                    ContractorId = request.ContractorId,
                    EquipmentId = request.EquipmentId,
                    Rating = request.Rating,
                    Condition = request.Condition,
                    FeedbackComments = request.FeedbackComment,
                    FeedbackDate = DateTime.Now,
                };
                var result = await _equipmentFeedbackRepoaitory.AddEquipmentFeedback(feedback);

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
    }
}




