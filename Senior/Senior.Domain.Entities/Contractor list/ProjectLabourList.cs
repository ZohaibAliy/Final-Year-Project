using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Senior.Domain.Entities.Contractor_list
{
    public  class ProjectLabourList
    {
        public int id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Speciality { get; set; }
        public string PhNumber { get; set; }
        public int? Charges { get; set; }
    }
}
