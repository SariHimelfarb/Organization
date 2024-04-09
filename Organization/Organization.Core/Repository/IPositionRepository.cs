using Microsoft.AspNetCore.Mvc;
using Organization.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Organization.Core.Repository
{
    public interface IPositionRepository
    {
        public Task<IEnumerable<Position>> GetAsync();
        public Task<Position> GetAsync(int id);
        public Task<Position> PostAsync(Position g);
        public Task PutAsync(int id, Position g);
        public Task DeleteAsync(int id);
    }
}
