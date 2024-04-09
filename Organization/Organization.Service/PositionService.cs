using Microsoft.AspNetCore.Mvc;
using Organization.Core.Entities;
using Organization.Core.Repository;
using Organization.Core.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Organization.Service
{
    public class PositionService:IPositionService
    {
        private readonly IPositionRepository _positionRepository;
        public PositionService(IPositionRepository context1)
        {
            _positionRepository = context1;
        }
        public Task<IEnumerable<Position>> GetAsync()
        {
            return _positionRepository.GetAsync();
        }

        public Task<Position> GetAsync(int id)
        {
            return _positionRepository.GetAsync(id);
        }

        public async Task<Position> PostAsync(Position p)
        {
            return await _positionRepository.PostAsync(p);
        }

        public async Task PutAsync(int id, Position p)
        {
            await _positionRepository.PutAsync(id, p);
        }

        public async Task DeleteAsync(int id)
        {
            await _positionRepository.DeleteAsync(id);
        }
    }
}
