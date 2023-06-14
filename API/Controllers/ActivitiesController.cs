using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
  public class ActivitiesController : BaseApiController
  {
    // when we need to query our database that means we need to utilize dependency injection so that we can inject our 
    // data context inside our api controller class
    private readonly DataContext _context;
    public ActivitiesController(DataContext context)
    {
      _context = context;

    }

    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivities()
    {
      return await _context.Activities.ToListAsync();
    }
    [HttpGet("{id}")]
    public async Task<ActionResult<Activity>> GetActivity(Guid id)
    {
      return await _context.Activities.FindAsync(id);
    }
  }
}