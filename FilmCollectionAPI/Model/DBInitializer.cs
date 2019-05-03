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

        var newDirector3 = new Director()
        {
          Name = "Danny Boyle"
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

        var film3 = new Film()
        {
          Title = "The Hateful Eight",
          Runtime = 130,
          Year = 2016,
          Genre = "Thriller",
          MediaType = "UHD Bluray",
          Director = newDirector
        };

        var film4 = new Film()
        {
          Title = "The Darknight Rises",
          Runtime = 120,
          Year = 2013,
          Genre = "Thriller",
          MediaType = "Bluray",
          Director = newDirector2
        };

        var film5 = new Film()
        {
          Title = "Reservoir Dogs",
          Runtime = 99,
          Year = 1992,
          Genre = "Crime",
          MediaType = "DVD",
          Director = newDirector
        };

        var film6 = new Film()
        {
          Title = "Sunshine",
          Runtime = 107,
          Year = 2007,
          Genre = "Sci-Fi",
          MediaType = "Bluray",
          Director = newDirector3
        };

        context.Films.Add(film);
        context.Films.Add(film2);
        context.Films.Add(film3);
        context.Films.Add(film4);
        context.Films.Add(film5);
        context.Films.Add(film6);
        context.SaveChanges();
      }
    }
  }
}
