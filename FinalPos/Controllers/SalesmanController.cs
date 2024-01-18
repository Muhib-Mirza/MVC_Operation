using FinalPos.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FinalPos.Controllers
{
    public class SalesmanController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
        // GET: Salesman
        public ActionResult Salesman()
        {
            return View();
        }
        SalesmanDB smDB = new SalesmanDB();
        // GET: Sale
        


        public JsonResult List()
        {
            return Json(smDB.ListAll(), JsonRequestBehavior.AllowGet);
        }


        public JsonResult Add(SalesmanModel smm)
        {

            return Json(smDB.Add(smm), JsonRequestBehavior.AllowGet);
        }


        public JsonResult GetbyID(int ID)
        {
            var product = smDB.ListAll().Find(x => x.SalesmanId.Equals(ID));
            return Json(product, JsonRequestBehavior.AllowGet);
        }


        public JsonResult Update(SalesmanModel smm)
        {
            return Json(smDB.Update(smm), JsonRequestBehavior.AllowGet);
        }


        public JsonResult Delete(int ID)
        {
            return Json(smDB.Delete(ID), JsonRequestBehavior.AllowGet);
        }
    }
}