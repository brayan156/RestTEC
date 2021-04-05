using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using Servidor_API.clases;

namespace Servidor_API.Controllers
{
    [Route("Factura")]
    public class FacturaController : ApiController
    {

        string path = HttpContext.Current.Server.MapPath(@"~/bases/Factura.json");
        // * Funcion Get de Factura
        // * @param 
        // * @returns una lista con todos los registros de Factura
        // */
        [HttpGet]
        public List<Factura> Get()
        {
            string jsontext = System.IO.File.ReadAllText(path);
            List<Factura> lista = new List<Factura>();
            lista = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Factura>>(jsontext);
            return lista;
        }

        /**
        * Funcion Post de Factura que añade el registro a la base
        * @param  monto del pedido
        * @returns la Factura añadida
        */
        [HttpPost]
        public Factura Post([FromBody] int monto)
        {
            string respuesta = "";

            string jsontext = System.IO.File.ReadAllText(path);
            List<Factura> lista = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Factura>>(jsontext);
            if (lista == null)
            {
                lista = new List<Factura>();
            }

            Factura factura=new Factura();
            factura.Id = lista.Count + 1;
            factura.Dia = DateTime.Now.Day.ToString();
            factura.Year= DateTime.Now.Year.ToString();
            factura.Mes= DateTime.Now.Month.ToString();
            factura.Hora= DateTime.Now.TimeOfDay.ToString();
            factura.Monto=monto;
            lista.Add(factura);
            jsontext = Newtonsoft.Json.JsonConvert.SerializeObject(lista);
            System.IO.File.WriteAllText(path, jsontext);

            return factura;
        }

    }
}
