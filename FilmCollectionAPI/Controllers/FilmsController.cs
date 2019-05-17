using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FilmCollectionAPI.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FilmCollectionAPI.Controllers
{
    [Route("api/films")]
    [ApiController]
    public class FilmsController : ControllerBase
    {
      public LibraryContext _context { get; set; }

      public FilmsController(LibraryContext ctxt)
      {
        _context = ctxt;
      }

      [HttpGet] // api/films
      public List<Film> GetFilms(string title, string genre, string mediaType, int year, string sort, string direction, int? page, int length = 20)
      {
        IQueryable<Film> query = _context.Films.Include(d => d.Director);

          switch (sort) //films?sort=title&dir=desc
          {
              case "title":
              if (direction == "asc")
              {
                  query = query.OrderBy(b => b.Title);
              }
              else if(direction == "desc")
              {
                  query = query.OrderByDescending(b => b.Title);
              }
              break;

              case "genre":
              if (direction == "asc")
              {
                  query = query.OrderBy(b => b.Genre);
              }
              else if (direction == "desc")
              {
                  query = query.OrderByDescending(b => b.Genre);
              }
              break;

              case "year":
              if (direction == "asc")
              {
                  query = query.OrderBy(b => b.Year);
              }
              else if (direction == "desc")
              {
                  query = query.OrderByDescending(b => b.Year);
              }
              break;
          }

        if (!string.IsNullOrWhiteSpace(title))
        {
            query = query.Where(d => d.Title == title);
        }

        if (!string.IsNullOrWhiteSpace(genre))
        {
            query = query.Where(d => d.Genre == genre);
        }

        if (!string.IsNullOrWhiteSpace(mediaType))
        {
            query = query.Where(d => d.MediaType == mediaType);
        }

        //if (!string.IsNullOrWhiteSpace(year.ToString()))
        //{
        //    query = query.Where(d => d.Year == year);
        //}       

        if (page.HasValue)
        {
            query = query.Skip(page.Value * length);
        }

        query = query.Take(length);

        return query.ToList();
      }

    [Route("{id}")]
      [HttpGet] // api/films/1
      public ActionResult<Film> GetFilm(int id) //Film zoeken met id
      {
          var searchedMovie = _context.Films.Include(b => b.Director).SingleOrDefault(b => b.Id == id); //Je kan ook FirstOrDefault gebruiken
                                                                                                        //bij SingleOrDefault mag er maar 1 zijn
          if (searchedMovie == null)
          {
              return NotFound();
          }
          return searchedMovie;
      }

      [Route("{filmId}/director")]
      [HttpGet] // api/films/1/director
      public ActionResult<Film> GetFilmDirector(int filmId)
      {
          var searchedFilmDirector = _context.Films.Include(b => b.Director).SingleOrDefault(b => b.Id == filmId);

          if (searchedFilmDirector == null)
          {
              return NotFound();
          }
          return searchedFilmDirector;
      }

      [Route("{id}")]
      [HttpDelete] //Film verwijderen
      public IActionResult DeleteMovie(int id)
      {
          var movieToDelete = _context.Films.Find(id);

          if(movieToDelete != null)
          {
              _context.Films.Remove(movieToDelete); //Hier gebeuren de veranderingen in memory
              _context.SaveChanges();               //Hierdoor worden de aanpassingen gedaan aan de databank
              return NoContent();
          }
          else
          {
              return NotFound();
          }
      }

      [HttpPost] //Film toevoegen
      public ActionResult<Film> AddFilm([FromBody]Film film)
      {
          _context.Films.Add(film);
          _context.SaveChanges();
          return Created("", film);
      }

      [HttpPut]
      public ActionResult<Film> UpdateFilm([FromBody]Film updateFilm)
      {
      _context.Films.Update(updateFilm);
      _context.SaveChanges();
      return Created("", updateFilm);
    }
    }
}
