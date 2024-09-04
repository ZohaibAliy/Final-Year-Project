using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Senior.Application.Common.Configuration
{
    public class SwaggerConfig
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="SwaggerConfig"/> class.
        /// </summary>
        public SwaggerConfig()
        {
            Name = "Frizzmo Template";
            Info = new OpenApiInfo
            {
                Title = "Frizzmo Template",
                Description = "Frizzmo Template API Versions"
            };
        }

        /// <summary>
        /// Gets or sets document Name.
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Gets or sets swagger Info.
        /// </summary>
        public OpenApiInfo Info { get; set; }

        /// <summary>
        /// Gets or sets RoutePrefix.
        /// </summary>
        public string RoutePrefix { get; set; }

        /// <summary>
        /// Gets Route Prefix with tailing slash.
        /// </summary>
        public string RoutePrefixWithSlash =>
            string.IsNullOrWhiteSpace(RoutePrefix)
                ? string.Empty
                : RoutePrefix + "/";
    
}
}
