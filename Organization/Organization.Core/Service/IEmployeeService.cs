using Microsoft.AspNetCore.Mvc;
using Organization.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Organization.Core.Service
{
    public interface IEmployeeService
    {
        public Task<IEnumerable<Employee>> GetAsync();
        public Task<Employee> GetAsync(int id);
        public Task<Employee> PostAsync(Employee g);
        public Task PutAsync(int id, Employee g);
        public Task DeleteAsync(int id);
    }
}
