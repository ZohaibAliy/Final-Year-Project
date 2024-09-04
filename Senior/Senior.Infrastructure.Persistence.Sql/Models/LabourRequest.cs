using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Senior.Infrastructure.Persistence.Sql.Models
{
    public class LabourRequest
    {

        public int Id { get; set; }
        public int LabourId { get; set; }
        public int UserId { get; set; }
        public string Address { get; set; }
        public string LabourName { get; set; }
        public string CustomerName { get; set; }
        public string CustomerEmail { get; set; }

        public string Status { get; set; }
        public DateTime RequestDateTime { get; set; }
    }
}
