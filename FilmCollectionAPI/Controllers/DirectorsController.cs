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
    [Route("api/directors")]
    [ApiController]
    public class DirectorsController : ControllerBase
    {
        public LibraryContext _context { get; set; }

        public DirectorsController(LibraryContext ctxt)
        {
            _context = ctxt;
        }

        [HttpGet]
        public List<Director> GetDirectors()
        {
            return _context.Directors.ToList();
        }

        [Route("{id}")]
        [HttpGet]
        public ActionResult<Director> GetDirector(int id)
        {
            var searchedDirector = _context.Directors.Find(id);
            if (searchedDirector == null)
            {
                return NotFound();
            }
            return searchedDirector;
        }

        [Route("{directorId}/films")]
        [HttpGet]
        public ActionResult<List<Film>> GetFilmsDirector(int directorId)
        {
            var searchedDirector = _context.Directors.Include(b => b.Films).SingleOrDefault(b => b.Id == directorId);
            if (searchedDirector == null)
            {
                return NotFound();
            }
            return searchedDirector.Films.ToList();
        }
    }
}
