using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;

namespace FinalPos.Models
{
    public class SalesmanDB
    {
        string cs = ConfigurationManager.ConnectionStrings["FinalProject"].ConnectionString;
        //string cs = "data Source=DV18;initial Catalog=FinalPos;Integrated Security=true";

        //Return list of all Employees  
        public List<SalesmanModel> ListAll()
        {
            List<SalesmanModel> lst = new List<SalesmanModel>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("SelectSalesman", con);
                com.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new SalesmanModel
                    {
                        SalesmanId = Convert.ToInt32(rdr["SalesmanId"]),
                        SalesmanCode = rdr["SalesmanCode"].ToString(),
                        SalesmanName = rdr["SalesmanName"].ToString(),
                        SalesmanEntryDate = Convert.ToDateTime(rdr["SalesmanEntryDate"]),

                    });
                }
                return lst;
            }

        }


        public int Add(SalesmanModel sm)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("InsertUpdateSalesman", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@SalesmanId", sm.SalesmanId);
                com.Parameters.AddWithValue("@SalesmanCode", sm.SalesmanCode);
                com.Parameters.AddWithValue("@SalesmanName", sm.SalesmanName);
                //com.Parameters.AddWithValue("@SalesmanEntryDate ", sm.SalesmanEntryDate = DateTime.Now);
                com.Parameters.AddWithValue("@Action", "Insert");
                i = com.ExecuteNonQuery();
            }
            return i;
        }
        
        //Method for Updating Employee record  
        public int Update(SalesmanModel sm)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {

                con.Open();
                SqlCommand com = new SqlCommand("InsertUpdateSalesman", con);
                
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@SalesmanId", sm.SalesmanId);
                com.Parameters.AddWithValue("@SalesmanCode", sm.SalesmanCode);
                com.Parameters.AddWithValue("@SalesmanName", sm.SalesmanName);
                //com.Parameters.AddWithValue("@SalesmanEntryDate ", sm.SalesmanEntryDate = DateTime.Now);
                com.Parameters.AddWithValue("@Action", "Update");
                i = com.ExecuteNonQuery();
            }
            return i;
        }

        //Method for Deleting an Product 
        public int Delete(int ID)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("DeleteSalesman", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@SalesmanId", ID);
                i = com.ExecuteNonQuery();
            }
            return i;
        }
    }
}