using FinalPos.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;


namespace FinalPos.Controllers
{
    
    public class ProductController : Controller
    {

        //[Route("")]
        // GET: Product
        public ActionResult Product()
        {
            return View();
        }

        ProductDB pDB = new ProductDB();
        // GET: Sale



        public JsonResult List()
        {
            return Json(pDB.ListAll(), JsonRequestBehavior.AllowGet);
        }


        public JsonResult Add(ProductModel pm)
        {

            return Json(pDB.Add(pm), JsonRequestBehavior.AllowGet);
        }


        public JsonResult GetbyID(int Id)
        {
            var product = pDB.ListAll().Find(x => x.ProductId.Equals(Id));
            return Json(product, JsonRequestBehavior.AllowGet);
        }


        public JsonResult Update(ProductModel pm)
        {
            return Json(pDB.Update(pm), JsonRequestBehavior.AllowGet);
        }


        public JsonResult Delete(int ID)
        {
            return Json(pDB.Delete(ID), JsonRequestBehavior.AllowGet);
        }
    }
}