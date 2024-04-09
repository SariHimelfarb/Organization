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
    public class RoleRepository:IRoleRepository
    {
        private readonly DataContext _dataContext;
        public RoleRepository(DataContext context)
        {
            _dataContext = context;
        }
        public async Task<IEnumerable<Role>> GetAsync()
        {
            return await _dataContext.Roles.ToListAsync();
        }
        public async Task<Role> GetAsync(int id)
        {
            return await _dataContext.Roles.FindAsync(id);
        }
        public async Task<Role> PostAsync(Role r)
        {
            _dataContext.Roles.Add(r);
            await _dataContext.SaveChangesAsync();
            return r;
        }
        public async Task PutAsync(int id, Role r)
        {
            var role = _dataContext.Roles.Find(id);
            role.Id = r.Id;
            role.Name = r.Name;
            await _dataContext.SaveChangesAsync();
        }
        public async Task DeleteAsync(int id)
        {
            var role = _dataContext.Roles.Find(id);
            _dataContext.Roles.Remove(role);
            await _dataContext.SaveChangesAsync();
        }
    }
}
