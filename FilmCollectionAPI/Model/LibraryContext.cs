using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FilmCollectionAPI.Model
{
  public class LibraryContext: DbContext
  {
    public LibraryContext(DbContextOptions<LibraryContext> options): base(options)
    {

    }

    public DbSet<Film> Films { get; set; }

    public DbSet<Director> Directors { get; set; }
  }
}
