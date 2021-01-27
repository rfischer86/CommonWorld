using System.ComponentModel.DataAnnotations;

namespace WebApi.Models
{
    public class SearchModel
    {
        [Required]
        public string searchString { get; set; }

    }
}