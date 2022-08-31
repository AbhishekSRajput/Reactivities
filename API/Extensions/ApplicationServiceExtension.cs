using Application.Activities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Persistence;

namespace API.Extensions
{
  public static class ApplicationServiceExtension
  {
    public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
    {
      services.AddSwaggerGen(c =>
      {
        c.SwaggerDoc("v1", new OpenApiInfo { Title = "WebAPIv5", Version = "v1" });
      });
      services.AddDbContext<DataContext>(opt =>
      {
        opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
      });
      services.AddCors((opt) =>
      {
        opt.AddPolicy("CorsPolicy", (policy) =>
        {
          policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000");
        });
      });
      // this tells our mediator where to go and find our handlers
      services.AddMediatR(typeof(AList.Handler).Assembly);
      services.AddAutoMapper(typeof(Application.Core.MappingProfiles).Assembly);

      return services;
    }
  }
}