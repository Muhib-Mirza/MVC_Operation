using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FinalPos.Models
{
    public class ProductModel
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }

        public string ProductCode { get; set; }
        public string ProductImageUrl { get; set; }
        public int ProductCostPrice { get; set; }
        public int ProductRetailPrice { get; set; }      
        public DateTime ProductCreationDate { get; set; }

    }
}