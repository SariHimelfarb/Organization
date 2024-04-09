using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Organization.Core.DTOs;
using Organization.Core.Entities;

namespace Organization.Core.Mapping
{
    public class MappingProfile:Profile
    {
        public MappingProfile() 
        {
            CreateMap<Employee, EmployeeDTO>().ReverseMap();
            CreateMap<Position, PositionDTO>().ReverseMap();
            CreateMap<Role,  RoleDTO>().ReverseMap();
        }
    }
}
