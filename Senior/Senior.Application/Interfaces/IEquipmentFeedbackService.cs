using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Senior.Application.Contracts.Requests;
using Senior.Application.Contracts.Response;

namespace Senior.Application.Interfaces
{
    public interface IEquipmentFeedbackService
    {
        Task<ApiResponse<string>> AddEquipmentFeedback(AddEquipmentFeedback request);

    }
}
