using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Senior.Application.Contracts.Requests
{
    public class UpdateProjectRequest
    {
        public int Id { get; set; }
        public String Title { get; set; }
        public String Location { get; set; }
        public String Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int ExpectedBudget { get; set; }
        public int userid { get; set; }
    }
}
