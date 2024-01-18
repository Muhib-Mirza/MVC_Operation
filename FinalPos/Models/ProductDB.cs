using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using System.Configuration;

namespace FinalPos.Models
{
    public class ProductDB
    {
        string cs = ConfigurationManager.ConnectionStrings["FinalProject"].ConnectionString;

        //string cs = "data Source=DV18;initial Catalog=ADO;Integrated Security=true";

        //Return list of all Employees  
        public List<ProductModel> ListAll()
        {
            List<ProductModel> lst = new List<ProductModel>();

            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("SelectProduct", con);
                com.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new ProductModel
                    {
                        ProductId = Convert.ToInt32(rdr["ProductId"]),
                        ProductCode = rdr["ProductCode"].ToString(),
                        ProductName = rdr["ProductName"].ToString(),
                        ProductImageUrl = rdr["ProductImageUrl"].ToString(),
                        ProductCostPrice = Convert.ToInt32(rdr["ProductCostPrice"]),
                        ProductRetailPrice = Convert.ToInt32(rdr["ProductRetailPrice"]),
                        ProductCreationDate = Convert.ToDateTime(rdr["ProductCreationDate"]),
                    });
                }
                return lst;
            }
        }

        //Method for Adding an Employee   
        public int Add(ProductModel prod)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("InsertUpdateProduct", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@ProductId", prod.ProductId);
                com.Parameters.AddWithValue("@ProductCode", prod.ProductCode);
                com.Parameters.AddWithValue("@ProductName", prod.ProductName);
                com.Parameters.AddWithValue("@ProductImageUrl", prod.ProductImageUrl);
                com.Parameters.AddWithValue("@ProductCostPrice", prod.ProductCostPrice);
                com.Parameters.AddWithValue("@ProductRetailPrice", prod.ProductRetailPrice);
                com.Parameters.AddWithValue("@Action", "Insert");
                i = com.ExecuteNonQuery();
            }
            return i;
        }

        //Method for Updating Employee record  
        public int Update(ProductModel prod)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("InsertUpdateProduct", con);

                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@ProductId", prod.ProductId);
                com.Parameters.AddWithValue("@ProductCode", prod.ProductCode);
                com.Parameters.AddWithValue("@ProductName", prod.ProductName);
                com.Parameters.AddWithValue("@ProductImageUrl", prod.ProductImageUrl);
                com.Parameters.AddWithValue("@ProductCostPrice", prod.ProductCostPrice);
                com.Parameters.AddWithValue("@ProductRetailPrice", prod.ProductRetailPrice);
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
                SqlCommand com = new SqlCommand("DeleteProduct", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@ProductId", ID);
                i = com.ExecuteNonQuery();
            }
            return i;
        }
    }
}