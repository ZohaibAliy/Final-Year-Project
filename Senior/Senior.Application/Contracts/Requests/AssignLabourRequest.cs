using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Senior.Application.Contracts.Requests
{
    public class AssignLabourRequest
    {
        public int Labourid { get; set; }
        public int ProjectId { get; set; }


    }
}
