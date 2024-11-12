using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Senior.Infrastructure.Persistence.Sql.Models
{
    public class Project
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int ExpectedBudget { get; set; }
        public int ActualBudget { get; set; }
        public string? ContractorName { get; set; }

        public int Labourid { get; set; }
        public int Equipmentid { get; set; }
        public int userid { get; set; }
        public bool IsActive { get; set; }
        public DateTime Created { get; set; }

    }
}
