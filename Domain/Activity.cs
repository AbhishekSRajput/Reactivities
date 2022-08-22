using System;
namespace Domain
{
  public class Activity
  {
    // all of these is going to be form column in our database called activities;
    // entity framework is object relational mapper: allows to write c# code to query data
    public Guid Id { get; set; }
    public string Title { get; set; }
    public DateTime Date { get; set; }
    public string Description { get; set; }
    public string Category { get; set; }
    public string City { get; set; }
    public string Venue { get; set; }
  }
}