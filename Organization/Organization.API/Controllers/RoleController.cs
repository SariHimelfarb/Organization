using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Organization.API.Models;
using Organization.Core.DTOs;
using Organization.Core.Entities;
using Organization.Core.Repository;
using Organization.Core.Service;
using Organization.Service;

namespace Organization.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController:ControllerBase
    {
        private readonly IRoleService _roleService;
        private readonly IMapper _mapper;

        public RoleController(IRoleService roleService, IMapper mapper)
        {
            _roleService = roleService;
            _mapper = mapper;
        }
        // GET: api/<ValuesController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Role>>> Get()
        {
            var list = await _roleService.GetAsync();
            var listDto = _mapper.Map<IEnumerable<RoleDTO>>(list);
            return Ok(listDto);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<RoleDTO>> Get(int id)
        {
            var role = await _roleService.GetAsync(id);
            var roleDto = _mapper.Map<RoleDTO>(role);
            return Ok(roleDto);
        }

        // POST api/<ValuesController>
        [HttpPost]
        [Authorize]

        public async Task<ActionResult<Role>> Post([FromBody] RolePostModel r)
        {

            var roleToAdd = _mapper.Map<Role>(r); // Use the mapping configuration from APIMappingProfile
            await _roleService.PostAsync(roleToAdd);
            var roleDto = _mapper.Map<RoleDTO>(roleToAdd);
            return Ok(roleDto);
        }

        // PUT api/<ValuesController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] RolePostModel r)
        {


            ActionResult<Role> existRole = await _roleService.GetAsync(id);

            if (existRole.Value is null)
            {
                return NotFound();
            }
            _mapper.Map(r, existRole.Value);

            await _roleService.PutAsync(id, existRole.Value);


            return Ok(_mapper.Map<RoleDTO>(existRole.Value));
        }

        //DELETE api/<ValuesController>/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _roleService.DeleteAsync(id);
        }
    }
}
