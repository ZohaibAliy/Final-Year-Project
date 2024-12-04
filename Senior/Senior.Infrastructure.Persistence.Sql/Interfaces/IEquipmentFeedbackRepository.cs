using Senior.Domain.Entities.Contractor_list;
using Senior.Infrastructure.Persistence.Sql.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Senior.Infrastructure.Persistence.Sql.Interfaces
{
    public interface IEquipmentFeedbackRepoaitory
    {
        Task<EquipmentFeedback> AddEquipmentFeedback(EquipmentFeedback entity);
    }
}
