using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Senior.Application.Contracts.Requests
{
    public class ActiveProduct
    {
        public int Id { get; set; }
        public string IsActive { get; set; }
        public string IsAvaialable { get; set; }
    }
}
