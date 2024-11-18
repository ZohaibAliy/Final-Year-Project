using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Senior.Application.Contracts.Requests
{
    public class UpdateProjectActualbudget
    {
        public int Id { get; set; }
        public int ActualBudget { get; set; }
    }
}
