using Microsoft.EntityFrameworkCore;
using Senior.Infrastructure.Persistence.Sql.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Senior.Infrastructure.Persistence.Sql.Context
{
    public class SeniorContext: DbContext
    {
        public SeniorContext()
        {
        }

        public SeniorContext(DbContextOptions<SeniorContext> options)
            : base(options)
        {
        }
        public DbSet<User> User { get; set; }
        public DbSet<Product> Product { get; set; }
        public DbSet<Order> Order { get; set; }
        public DbSet<Labour> Labour { get; set; }
        public DbSet<LabourRequest> LabourRequest { get; set; }


    }
}
