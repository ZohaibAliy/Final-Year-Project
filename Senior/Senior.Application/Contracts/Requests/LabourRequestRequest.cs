using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Senior.Application.Contracts.Requests
{
    public class LabourRequestRequest
    {
        public int LabourId { get; set; }
        public int UserId { get; set; }
        public string Address { get; set; }
        public string LabourName { get; set; }
        public string CustomerName { get; set; }
        public string CustomerEmail { get; set; }
    }
}
