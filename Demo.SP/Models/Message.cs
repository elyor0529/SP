using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Demo.SP.Models
{
    public class Message : Entity
    {

        [Required]
        [StringLength(50)]
        public string Name { get; set; }

        [Required]
        [StringLength(250)] 
        public string Text { get; set; }

        [Column(TypeName = "datetime2")]
        public DateTime Date { get; set; }

        [StringLength(36)]
        public string UserId { get; set; }

        public virtual ApplicationUser User { get; set; }

    }
}