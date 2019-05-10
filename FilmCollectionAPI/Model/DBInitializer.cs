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

        var newDirector4 = new Director()
        {
          Name = "David Fincher"
        };

        var newDirector5 = new Director()
        {
          Name = "Robert Zemeckis"
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

        var film7 = new Film()
        {
          Title = "Fight Club",
          Runtime = 139,
          Year = 1999,
          Genre = "Drama",
          MediaType = "DVD",
          Director = newDirector4
        };

        var film8 = new Film()
        {
          Title = "Forrest Gump",
          Runtime = 142,
          Year = 1994,
          Genre = "Romance",
          MediaType = "DVD",
          Director = newDirector5
        };

        var film9 = new Film()
        {
          Title = "Back to the Future",
          Runtime = 116,
          Year = 1985,
          Genre = "Adventure",
          MediaType = "DVD",
          Director = newDirector5
        };

        var film10 = new Film()
        {
          Title = "Inglourious Basterds",
          Runtime = 153,
          Year = 2009,
          Genre = "War",
          MediaType = "Bluray",
          Director = newDirector
        };

        var film11 = new Film()
        {
          Title = "Trainspotting",
          Runtime = 93,
          Year = 1996,
          Genre = "Drama",
          MediaType = "DVD",
          Director = newDirector3
        };

        var film12 = new Film()
        {
          Title = "Interstellar",
          Runtime = 169,
          Year = 2014,
          Genre = "Sci-Fi",
          MediaType = "UHD Bluray",
          Director = newDirector2
        };

        context.Films.Add(film);
        context.Films.Add(film2);
        context.Films.Add(film3);
        context.Films.Add(film4);
        context.Films.Add(film5);
        context.Films.Add(film6);
        context.Films.Add(film7);
        context.Films.Add(film8);
        context.Films.Add(film9);
        context.Films.Add(film10);
        context.Films.Add(film11);
        context.Films.Add(film12);
        context.SaveChanges();
      }
    }
  }
}
