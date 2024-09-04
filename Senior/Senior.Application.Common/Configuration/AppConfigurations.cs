using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Senior.Application.Common.Configuration
{
    public class AppConfigurations
    {
        static AppConfigurations()
        {
            Configuration = new AppConfigurations();
        }

        public static AppConfigurations Configuration { get; set; }
    }
}
