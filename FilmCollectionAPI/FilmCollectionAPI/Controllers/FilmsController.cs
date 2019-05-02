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

    [HttpGet]
    public List<Film> GetFilms()
    {
      return _context.Films.ToList();
    }
  }
}
