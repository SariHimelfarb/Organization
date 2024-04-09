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
    public class PositionRepository: IPositionRepository
    {
        private readonly DataContext _dataContext;
        public PositionRepository(DataContext context)
        {
            _dataContext = context;
        }
        public async Task<IEnumerable<Position>> GetAsync()
        {
            return await _dataContext.Positions.Include(p=>p.Role).ToListAsync();
        }
        public async Task<Position> GetAsync(int id)
        {
            return await _dataContext.Positions.Include(p => p.Role).FirstOrDefaultAsync(p=>p.Id==id);
        }
        public async Task<Position> PostAsync(Position p)
        {
            _dataContext.Positions.Add(p);
            await _dataContext.SaveChangesAsync();
            return p;
        }
        public async Task PutAsync(int id, Position p)
        {
            var position = _dataContext.Positions.Find(id);
            position.Id = p.Id;
            position.IsAdmin = p.IsAdmin;
            position.EnterDate = p.EnterDate;
            await _dataContext.SaveChangesAsync();
        }
        public async Task DeleteAsync(int id)
        {
            var position = _dataContext.Positions.Find(id);
            _dataContext.Positions.Remove(position);
            await _dataContext.SaveChangesAsync();
        }
    }
}
