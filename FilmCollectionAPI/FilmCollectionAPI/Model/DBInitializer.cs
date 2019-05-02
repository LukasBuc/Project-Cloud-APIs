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
      //Create the db if it doesn't exist
      context.Database.EnsureCreated();

      //Are there any films already?
      if (!context.Films.Any())
      {
        var newDirector1 = new Director()
        {
          Name = "Quentin Tarantino"
        };

        //var newDirector2 = new Director()
        //{
        //  Name = "Christopher Nolan"
        //};

        var newFilm1 = new Film()
        {
          Title = "Pulp Fiction",
          //Runtime = 154,
          //Year = 1994,
          //Genre = "Crime",
          MediaType = "DVD",
          Director = newDirector1
        };

        var newFilm2 = new Film()
        {
          Title = "Inception",
          //Runtime = 148,
          //Year = 2010,
          //Genre = "Action",
          MediaType = "Bluray",
          Director = newDirector1
        };

        context.Films.Add(newFilm1);
        context.Films.Add(newFilm2);
        context.SaveChanges();
      }
    }
  }
}
