using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FilmCollectionAPI.Model;
using Microsoft.AspNetCore.Authorization;
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

        [Authorize]
        [HttpGet]
        public List<Director> GetDirectors(string name)
        {
            IQueryable<Director> query = _context.Directors;
      
            if (!string.IsNullOrWhiteSpace(name))
            {
                query = query.Where(d => d.Name == name);
            }
            
            return query.ToList();
        }

        [Authorize]
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

        [Authorize]
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

        [Authorize]
        [Route("{id}")]
        [HttpDelete] //Director verwijderen
        public IActionResult DeleteDirector(int id)
        {
            var directorToDelete = _context.Directors.Find(id);

            if(directorToDelete != null)
            {
                _context.Directors.Remove(directorToDelete);
                _context.SaveChanges();
                return NoContent();
            }
            else
            {
                return NotFound();
            }
        }

        [Authorize]
        [HttpPost]
        public ActionResult<Director> AddDirector([FromBody]Director director)
        {
            _context.Directors.Add(director);
            _context.SaveChanges();
            return Created("", director);
        }

        [Authorize]
        [HttpPut]
        public ActionResult<Director> UpdateDirector([FromBody]Director updateDirector)
        {
            _context.Directors.Update(updateDirector);
            _context.SaveChanges();
            return Created("", updateDirector);
        }
    }
}
