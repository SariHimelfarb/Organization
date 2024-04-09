using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Organization.API.Models;
using Organization.Core.DTOs;
using Organization.Core.Entities;
using Organization.Core.Service;
using Organization.Service;

namespace Organization.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PositionController:ControllerBase
    {
        private readonly IPositionService _positionService;
        private readonly IMapper _mapper;

        public PositionController(IPositionService positionService, IMapper mapper)
        {
            _positionService = positionService;
            _mapper = mapper;
        }
        // GET: api/<ValuesController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Position>>> Get()
        {
            var list = await _positionService.GetAsync();
            var listDto = _mapper.Map<IEnumerable<PositionDTO>>(list);
            return Ok(listDto);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Position>> Get(int id)
        {

            var position = await _positionService.GetAsync(id);
            var positionDto = _mapper.Map<PositionDTO>(position);
            return Ok(positionDto);
        }

        // POST api/<ValuesController>
        [HttpPost]
        public async Task<ActionResult<Position>> Post([FromBody] PositionPostModel p)
        { 

            var positionToAdd = _mapper.Map<Position>(p); // Use the mapping configuration from APIMappingProfile
            await _positionService.PostAsync(positionToAdd);
            var positionDto = _mapper.Map<PositionDTO>(positionToAdd);
            return Ok(positionDto);
        }

        // PUT api/<ValuesController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] PositionPostModel p)
        {
            ActionResult<Position> existPosition = await _positionService.GetAsync(id);

            if (existPosition.Value is null)
            {
                return NotFound();
            }
            _mapper.Map(p, existPosition.Value);

            await _positionService.PutAsync(id, existPosition.Value);


            return Ok(_mapper.Map<PositionDTO>(existPosition.Value));
        }

        //DELETE api/<ValuesController>/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _positionService.DeleteAsync(id);
        }
    }
}
