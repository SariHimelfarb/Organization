using AutoMapper.Execution;
using AutoMapper;
using Organization.API.Models;
using Organization.Core.Entities;

namespace Organization.API.Mapping
{
    public class APIMappingProfile : Profile
    {
        public APIMappingProfile()
        {
            CreateMap<EmployeePostModel, Employee>();
            CreateMap<PositionPostModel, Position>();
            CreateMap<RolePostModel, Role>();
        }
    }
}
