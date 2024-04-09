using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Organization.Core.Entities;
using Organization.Core.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Organization.Data.Repository
{
    public class EmployeeRepository:IEmployeeRepository
    {
        private readonly DataContext _dataContext;
        public EmployeeRepository(DataContext context)
        {
            _dataContext = context;
        }
        public async Task<IEnumerable<Employee>> GetAsync()
        {
            return await _dataContext.Employees.Include(e=>e.Position).ThenInclude(p=>p.Role).Where(e => e.IsActive).ToListAsync();
        }

        public async Task<Employee> GetAsync(int id)
        {
            return await _dataContext.Employees.Include(e=>e.Position).ThenInclude(p=>p.Role).FirstOrDefaultAsync(e=>e.Id==id && e.IsActive);
        }
        public async Task<Employee> PostAsync(Employee e)
        {
            _dataContext.Employees.Add(e);
            await _dataContext.SaveChangesAsync();
            return e;
        }
        public async Task PutAsync(int id, Employee e)
        {
            var employee = _dataContext.Employees.Find(id);
            employee.Id = e.Id;
            employee.Identity = e.Identity;
            employee.FirstName = e.FirstName;
            employee.LastName = e.LastName;
            employee.StartOfWork = e.StartOfWork;
            employee.DateOfBirth = e.DateOfBirth;
            employee.Gender = e.Gender;
            employee.Position = e.Position;
            await _dataContext.SaveChangesAsync();

        }
        public async Task DeleteAsync(int id)
        {
            var employee = _dataContext.Employees.Find(id);
            if (employee != null)
            {
                employee.IsActive = false;
                await _dataContext.SaveChangesAsync();
            }
        }
    }
}
