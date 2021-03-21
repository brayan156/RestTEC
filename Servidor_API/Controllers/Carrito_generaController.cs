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
    [Route("Carrito_genera")]
    public class Carrito_generaController : ApiController
    {
        string path = HttpContext.Current.Server.MapPath(@"~/bases/Carrito_genera.json");
        // GET api/values
        [HttpGet]
        public List<Carrito_genera> Get()
        {
            string jsontext = System.IO.File.ReadAllText(path);
            List<Carrito_genera> lista = new List<Carrito_genera>();
            lista = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Carrito_genera>>(jsontext);
            return lista;
        }


        // POST api/values

        [HttpPost]
        public string Post([FromBody] Carrito_genera carrito_genera)
        {
            string respuesta = "";

            string jsontext = System.IO.File.ReadAllText(path);
            List<Carrito_genera> lista = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Carrito_genera>>(jsontext);
            if (lista == null)
            {
                lista = new List<Carrito_genera>();
            }
            bool existe = false;

            for (int i = 0; i < lista.Count; i++)
            {
                if (lista[i].Id_carrito == carrito_genera.Id_carrito && lista[i].Id_Factura == carrito_genera.Id_Factura &&
                    lista[i].Id_pedido == carrito_genera.Id_pedido && lista[i].N_compra == carrito_genera.N_compra)
                {
                    existe = true;
                    respuesta = "registro ya existente";
                    break;
                }
            }

            if (0 == carrito_genera.Id_carrito || 0 == carrito_genera.Id_Factura ||
                0 == carrito_genera.Id_pedido ||  0 == carrito_genera.N_compra)
            {
                respuesta = "registro necesita un identificador";
            }
            else if (!existe)
            {
                lista.Add(carrito_genera);
                respuesta = "registro ingresado correctamente";
            }

            jsontext = Newtonsoft.Json.JsonConvert.SerializeObject(lista);
            System.IO.File.WriteAllText(path, jsontext);

            return respuesta;
        }

        // PUT api/values/5
        [HttpPut]
        public string Put([FromBody] Carrito_genera carrito_genera)
        {
            string respuesta = "";

            string jsontext = System.IO.File.ReadAllText(path);
            List<Carrito_genera> lista = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Carrito_genera>>(jsontext);
            if (lista == null)
            {
                lista = new List<Carrito_genera>();
            }
            bool existe = false;

            for (int i = 0; i < lista.Count; i++)
            {
                if (lista[i].Id_carrito == carrito_genera.Id_carrito && lista[i].Id_Factura == carrito_genera.Id_Factura &&
                    lista[i].Id_pedido == carrito_genera.Id_pedido && lista[i].N_compra == carrito_genera.N_compra)
                {
                    lista[i] = carrito_genera;
                    jsontext = Newtonsoft.Json.JsonConvert.SerializeObject(lista);
                    System.IO.File.WriteAllText(path, jsontext);
                    existe = true;
                    respuesta = "registro editado exitosamente";
                    break;
                }
            }

            if (!existe)
            {
                respuesta = "el registro no existe";
            }
            return respuesta;

        }

        // DELETE api/values/5
        [HttpDelete]
        public string Delete(Carrito_genera carrito_genera)
        {
            string respuesta = "";

            string jsontext = System.IO.File.ReadAllText(path);
            List<Carrito_genera> lista = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Carrito_genera>>(jsontext);
            if (lista == null)
            {
                lista = new List<Carrito_genera>();
            }
            bool existe = false;

            for (int i = 0; i < lista.Count; i++)
            {
                if (lista[i].Id_carrito == carrito_genera.Id_carrito && lista[i].Id_Factura == carrito_genera.Id_Factura &&
                    lista[i].Id_pedido == carrito_genera.Id_pedido && lista[i].N_compra == carrito_genera.N_compra)
                {
                    lista.RemoveAt(i);
                    jsontext = Newtonsoft.Json.JsonConvert.SerializeObject(lista);
                    System.IO.File.WriteAllText(path, jsontext);
                    existe = true;
                    respuesta = "registro eliminado exitosamente";
                    break;
                }
            }

            if (!existe)
            {
                respuesta = "el registro no existe";
            }
            return respuesta;
        }
    }
}
