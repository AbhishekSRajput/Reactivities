using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
  public class ACreate
  {
    // Commands do not return anything thats why we are not returning (IRequest<Activity>)
    public class Command : IRequest
    {
      public Activity Activity { get; set; }

    }

    public class Handler : IRequestHandler<Command>
    {
      private readonly DataContext _context;
      public Handler(DataContext context)
      {
        _context = context;
      }

      public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
      {
        _context.Activities.Add(request.Activity);
        await _context.SaveChangesAsync();
        // this is equivalent to nothing it just here to tell we are done with create logic 
        return Unit.Value;
      }
    }
  }
}