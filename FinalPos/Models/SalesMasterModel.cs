using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using FinalPos.Models;

namespace FinalPos.Models
{
    public class SalesMasterModel
    {
        public int SalesId { get; set; }
        public int SalesTotal { get; set; }
        public DateTime SalesDate { get; set; }
        public int SalemanId { get; set; }        
        public string SalesComment { get; set; }
    }
}