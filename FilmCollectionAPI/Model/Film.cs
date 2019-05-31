using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FilmCollectionAPI.Model
{
  public class Film
  {
    public int Id { get; set; }

    public string Title { get; set; }

    public int Runtime { get; set; } //In minuten

    public int Year { get; set; }

    public string Genre { get; set; }

    public string MediaType { get; set; } //DVD, Bluray, UHD Bluray

    [Required]
    public int? DirectorId { get; set; }

    public Director Director { get; set; }
  }
}
