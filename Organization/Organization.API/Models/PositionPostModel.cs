namespace Organization.API.Models
{
    public class PositionPostModel
    {
        public int EmployeeId { get; set; }
        public int RoleId { get; set; }
        public bool IsAdmin { get; set; }
        public DateTime EnterDate { get; set; }
    }
}
