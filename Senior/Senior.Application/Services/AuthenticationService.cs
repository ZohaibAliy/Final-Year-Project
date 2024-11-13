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
    public class AuthenticationService: IAuthenticationService
    {
     
        private readonly IGenericRepository<User> _repository;
    

        public AuthenticationService(IGenericRepository<User> repository)
        {
          
            _repository = repository;
         



        }
        public async Task<LoginResponse>  UserAuthentication(LoginRequest request)
        {
            var response = new LoginResponse();
            try
            {

                var user = await _repository.GetSingleByFilter(x => x.Email == request.Email && x.IsActive==true);
         

                if (user is null || request.Password != user.Password )
                    {
                        response.IsSuccess = false;
                        response.Message = "Invalid Email or password! Please try again";

                        return response;
                    }
              
            
               

                response.IsSuccess = true;

                response.Id = user.Id;
                response.FirstName = user.FirstName;
                response.LastName = user.LastName;
                response.Email = user.Email;
                response.Gender = user.Gender;
                response.DateOfBirth = user.DateOfBirth;
                response.IsActive = user.IsActive;
                response.Role = user.Role;
                response.DateOfBirth = user.DateOfBirth;
              
                response.Message = "Login Successful!";
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.Errors = new List<string> { { $"Something went wrong Error:  Please check Message for more details" } };

            }




            return response;
        }


        public async Task<List<User>> GetAllUser()
        {
            var res = await _repository.Get(x=>x.IsActive==true);


            return res;
        }
      


        public async Task<ApiResponse<string>> RegisterUser(RegisterRequest request)
        {


            var user = await _repository.GetSingleByFilter(x => x.Email == request.Email && x.IsActive==true);
            var response = new ApiResponse<string>();
            

            if (user is not null)
            {
                response.IsRequestSuccessful = false;
                response.SuccessResponse = "Email already exist! Please register with different email";

                return response;
            }
            else
            {
                var requesteduser = new User
                {
                    FirstName = request.FirstName,
                    LastName = request.LastName,
                    Email = request.Email,
                    Password=request.Password,

                    Gender = request.Gender,
                    Role = "Customer",
                    IsActive = true,
                    DateOfBirth=DateTime.Now,

                };
                var res = _repository.Insert(requesteduser);

                if (res.Result is not null)
                {
                    _repository.SaveChanges();
                    response.IsRequestSuccessful = true;
                    response.SuccessResponse = "Registration successful!";

                    return response;
                }
                else
                {
                    response.IsRequestSuccessful = false;
                    response.SuccessResponse = "Something went wrong! Please try again.";

                    return response;

                }
            }
         
        }

        public async Task<ApiResponse<string>> AddAdmin(AddUserRequest request)
        {


            var user = await _repository.GetSingleByFilter(x => x.Email == request.Email && x.IsActive==true);
            var response = new ApiResponse<string>();


            if (user is not null)
            {
                response.IsRequestSuccessful = false;
                response.SuccessResponse = "Email already exist! Please register with different email";

                return response;
            }
            else
            {
                var requesteduser = new User
                {
                    FirstName = request.FirstName,
                    LastName = request.LastName,
                    Email = request.Email,
                    Password = request.Password,
                    Gender = request.Gender,
                    Role = request.Role,
                    IsActive = true,
                    DateOfBirth = DateTime.Now,

                };
                var res = _repository.Insert(requesteduser);

                if (res.Result is not null)
                {
                    _repository.SaveChanges();
                    response.IsRequestSuccessful = true;
                    response.SuccessResponse = "Registration successful!";

                    return response;
                }
                else
                {
                    response.IsRequestSuccessful = false;
                    response.SuccessResponse = "Something went wrong! Please try again.";

                    return response;

                }
            }

        }

        public async Task<ApiResponse<string>> UpdateUser(UpdateUserRequest request)
        {
            var response = new ApiResponse<string>();
            var res = await _repository.GetSingleByFilter(x => x.Id == request.Id);
            var emailcheck = await _repository.GetSingleByFilter(x => x.Email == request.Email && x.Id!=request.Id && x.IsActive==true);
            if (emailcheck != null){
                response.IsRequestSuccessful = false;
                response.SuccessResponse =$"Email Already Registeres Please Select Different Email.";
                return response;
            }
           
            if (res != null)
            {
         
                res.FirstName = request.FirstName;
                res.LastName = request.LastName;
                res.Email = request.Email;
                res.Gender = request.Gender;
                res.Password = request.Password;
                res.Role = request.Role;

                var result = await _repository.Update(res);
                if (result==1)
                {
                    response.IsRequestSuccessful = true;
                    response.SuccessResponse = $"User Updated successfully";
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

        public async Task<ApiResponse<string>> RemoveUser(int id)
        {
            var response = new ApiResponse<string>();
            var res = await _repository.GetSingleByFilter(x => x.Id == id);

            if (res != null)
            {
                res.IsActive = false;

                var result = await _repository.Update(res);
                if (result!=0)
                {
                    response.IsRequestSuccessful = true;
                    response.SuccessResponse = $"User Removed successfully";
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
                response.SuccessResponse = "User not found!";
                response.Errors = new List<string> { { $"Something went wrong" } };
            }
            return response;
        }
    }
}
