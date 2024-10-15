using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Senior.Application.Contracts.Requests
{ 
    public class UpdateLabourRequest {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Speciality { get; set; }
        public string charges { get; set; }
        public IFormFile image { get; set; }
        public string Address { get; set; }
        public string PhNumber { get; set; }
    }
}
