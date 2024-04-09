using Organization.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Organization.Core.DTOs
{
    public class PositionDTO
    {
        public int Id { get; set; }
        public bool IsAdmin { get; set; }
        public int EmployeeId { get; set; }
        public int RoleId { get; set; }
        public RoleDTO Role { get; set; }
        public DateTime EnterDate { get; set; }
    }
}
