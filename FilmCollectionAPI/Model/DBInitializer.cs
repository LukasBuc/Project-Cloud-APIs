using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FilmCollectionAPI.Model
{
  public class DBInitializer
  {
    public static void Initialize(LibraryContext context)
    {
      //Create the db if not yet exists
      context.Database.EnsureCreated();

      //Are there already books present?
      if (!context.Films.Any())
      {
        var newDirector = new Director()
        {
          Name = "Quentin Tarantino"
        };

        var newDirector2 = new Director()
        {
          Name = "Christopher Nolan"
        };

        var film = new Film()
        {
          Title = "Pulp Fiction",
          Runtime = 120,
          Year = 1994,
          Genre = "Action",
          MediaType = "DVD",
          Director = newDirector
        };

        var film2 = new Film()
        {
          Title = "Inception",
          Runtime = 150,
          Year = 2015,
          Genre = "Thriller",
          MediaType = "Bluray",
          Director = newDirector2
        };

        context.Films.Add(film);
        context.Films.Add(film2);
        context.SaveChanges();
      }
    }
  }
}
