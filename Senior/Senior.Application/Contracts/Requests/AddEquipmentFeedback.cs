using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Senior.Application.Contracts.Requests
{
    public class AddEquipmentFeedback
    {
        public int ContractorId { get; set; }
        public int EquipmentId { get; set; }
        public int Rating { get; set; }
        public string Condition { get; set; }
        public string FeedbackComment { get; set; }
        public DateTime FeedbackDate { get; set; }
    }
}
