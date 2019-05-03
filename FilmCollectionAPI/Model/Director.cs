using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FilmCollectionAPI.Model
{
  public class Director
  {
    public int Id { get; set; }

    public string Name { get; set; }

    [JsonIgnore] //Anders blijf je films opvragen en kom je in een eindeloze loop
    public ICollection<Film> Films { get; set; }
  }
}
