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
    public List<Film> GetFilms(string sort, string direction)
       {
          IQueryable<Film> query = _context.Films;

          switch (sort)
          {
            case "title":
            if (direction == "asc")
            {
              query = query.OrderBy(b => b.Title);
            }
            else
            {
              query = query.OrderByDescending(b => b.Title);
            }
            break;
          }

          return query.ToList();
       }

        [Route("{id}")]
        [HttpGet] // api/films/1
        public ActionResult<Film> GetFilm(int id) //Film zoeken met id
        {
            var searchedMovie = _context.Films.Include(b => b.Director).SingleOrDefault(b => b.Id == id); //Je kan ook FirstOrDefault gebruiken
                                                                                                          //bij SingleOrDefault mag er maar 1 zijn
            if(searchedMovie == null)
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
    }
}
