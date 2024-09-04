using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;



namespace Senior.Infrastructure.Persistence.Sql.Models
{
    public class Labour
    {
        [Key]
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Speciality { get; set; }
        public string Address { get; set; }
        public string PhNumber { get; set; }
        public bool IsAvailable { get; set; }
        public bool IsActive { get; set; }
    }
}
