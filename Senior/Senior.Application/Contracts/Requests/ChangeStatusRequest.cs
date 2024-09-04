using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Senior.Application.Contracts.Requests
{
    public class ChangeStatusRequest
    {
        public int id { get; set; }
        public string status { get; set; }
    }
}
