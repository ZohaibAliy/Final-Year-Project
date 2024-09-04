using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Senior.Infrastructure.Persistence.Sql.Models
{
    public class Product
    {   
        [Key]
        public int Id { get; set; }
        public string ProductName { get; set; }
        public int Price { get; set; }
        public bool IsAvailable { get; set; }
        public bool IsActive { get; set; }
        public int Quantity { get; set; }
        public string Description { get; set; }
        public byte[] image { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
