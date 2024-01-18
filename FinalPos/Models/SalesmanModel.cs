using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FinalPos.Models
{
    public class SalesmanModel
    {
        public int SalesmanId { get; set; }
        public string SalesmanCode { get; set; }
        public string SalesmanName { get; set; }
        public DateTime SalesmanEntryDate { get; set; }
    }
}