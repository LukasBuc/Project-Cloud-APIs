using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FilmCollectionAPI.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FilmCollectionAPI.Controllers
{
    [Route("api/pages")]
    [ApiController]
    public class PagesController : ControllerBase
    {
        public LibraryContext _context { get; set; }

        public PagesController(LibraryContext ctxt)
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
