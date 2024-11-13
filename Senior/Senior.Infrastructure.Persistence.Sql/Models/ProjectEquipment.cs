using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Senior.Infrastructure.Persistence.Sql.Models
{
    public class ProjectEquipment
    {
        public int Id { get; set; }
        public int EquipmentId { get; set; }
        public int ProjectId { get; set; }
    }
}
