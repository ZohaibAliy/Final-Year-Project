using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Senior.Infrastructure.Persistence.Sql.Models
{
    public class ProjectLabour
    {
        public int Id { get; set; }
        public int LabourId { get; set; }
        public int ProjectId { get; set; }

    }
}
