using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Organization.Core.Entities
{

    public class Position
    {
        public int Id { get; set; }
        public Employee Employee { get; set; }
        public Role Role { get; set; }
        public int EmployeeId { get; set; }
        public int RoleId { get; set; }
        public bool IsAdmin { get; set; }
        public DateTime EnterDate { get; set; }
    }
}
