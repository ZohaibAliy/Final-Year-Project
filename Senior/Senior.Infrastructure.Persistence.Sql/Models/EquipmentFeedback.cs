using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.VisualBasic;

namespace Senior.Infrastructure.Persistence.Sql.Models
{
    public class EquipmentFeedback 
    {
        public int Id { get; set; }
        public int ContractorId { get; set; }
        public int EquipmentId { get; set; }
        public int Rating { get; set; }
        public string Condition { get; set; }
        public string FeedbackComments { get; set; }
        public DateTime FeedbackDate { get; set; }
    }
}
