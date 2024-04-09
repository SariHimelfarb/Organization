using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Organization.API.Models;
using Organization.Core.DTOs;
using Organization.Core.Entities;
using Organization.Core.Service;
using Organization.Service;
using System;

namespace Organization.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController:ControllerBase
    {
        private readonly IEmployeeService _employeeService;
        private readonly IMapper _mapper;

        public EmployeeController(IEmployeeService employeeService, IMapper mapper)
        {
            _employeeService = employeeService;
            _mapper = mapper;
        }
        // GET: api/<ValuesController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> Get()
        {

            var list = await _employeeService.GetAsync();
            var listDto = _mapper.Map<IEnumerable<EmployeeDTO>>(list);
            return Ok(listDto);
        }
        // GET: api/<ValuesController>
        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> Get(int id)
        {
            var employee = await _employeeService.GetAsync(id);
            var employeeDto = _mapper.Map<EmployeeDTO>(employee);
            return Ok(employeeDto);
        }

        // POST api/<ValuesController>
        [HttpPost]
        public async Task<ActionResult<Employee>> Post([FromBody] EmployeePostModel e)
        {
            var employeeToAdd = _mapper.Map<Employee>(e); // Use the mapping configuration from APIMappingProfile
            await _employeeService.PostAsync(employeeToAdd);
            var employeeDto = _mapper.Map<EmployeeDTO>(employeeToAdd);
            return Ok(employeeDto);
        }

        // PUT api/<ValuesController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] EmployeePostModel e)
        {
            Employee existEmployee = await _employeeService.GetAsync(id);

            if (existEmployee == null)
            {
                return NotFound();
            }

            _mapper.Map(e, existEmployee);

            await _employeeService.PutAsync(id, existEmployee);

            return Ok(_mapper.Map<EmployeeDTO>(existEmployee));
        }


        //DELETE api/<ValuesController>/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _employeeService.DeleteAsync(id);
        }
    }
}
