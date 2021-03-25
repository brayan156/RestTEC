using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using Servidor_API.clases;

namespace Servidor_API.Controllers
{
    [Route("Carrito_almacena")]
    public class Carrito_almacenaController : ApiController
    {
        string path = HttpContext.Current.Server.MapPath(@"~/bases/Carrito_almacena.json");
        // GET api/values
        [HttpGet]
        public List<Carrito_almacena> Get()
        {
            
            string jsontext = System.IO.File.ReadAllText(path);
            List<Carrito_almacena> lista = new List<Carrito_almacena>();
            lista = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Carrito_almacena>>(jsontext);
            return lista;
        }
        [Route("Carrito_almacena/carrito/{id_carrito:int}/{n_compra:int}")]
        [HttpGet]
        public List<Carrito_almacena> Getby_carrito(int id_carrito, int n_compra)
        {
            string respuesta = "";

            string jsontext = System.IO.File.ReadAllText(path);
            List<Carrito_almacena> lista_pedidos = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Carrito_almacena>>(jsontext);
            if (lista_pedidos == null)
            {
                lista_pedidos = new List<Carrito_almacena>();
            }
            bool existe = false;
            List<Carrito_almacena> lista_carrito_almacena = new List<Carrito_almacena>();
            for (int i = 0; i < lista_pedidos.Count; i++)
            {
                if (lista_pedidos[i].Id_carrito == id_carrito & lista_pedidos[i].N_compra == n_compra)
                {
                    lista_carrito_almacena.Add(lista_pedidos[i]);
                    existe = true;
                }
            }
            return lista_carrito_almacena;

        }
        public static bool IsFileReady(string filename)
        {
            // If the file can be opened for exclusive access it means that the file
            // is no longer locked by another process.
            try
            {
                using (FileStream inputStream = File.Open(filename, FileMode.Open, FileAccess.Read, FileShare.None))
                    return inputStream.Length > 0;
            }
            catch (Exception)
            {
                return false;
            }
        }
        // POST api/values

        [HttpPost]
        public string Post([FromBody] Carrito_almacena[] carrito_almacena)
        {

            string respuesta = "";

            string jsontext = System.IO.File.ReadAllText(path);
            List<Carrito_almacena> lista = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Carrito_almacena>>(jsontext);
            if (lista == null)
            {
                lista = new List<Carrito_almacena>();
            }
            bool existe = false;

            lista.AddRange(carrito_almacena);
            respuesta = "registro ingresado correctamente";
            

            jsontext = Newtonsoft.Json.JsonConvert.SerializeObject(lista);
            System.IO.File.WriteAllText(path, jsontext);

            return respuesta;
        }

        // PUT api/values/5
        [HttpPut]
        public string Put([FromBody] Carrito_almacena carrito_almacena)
        {
            string respuesta = "";

            string jsontext = System.IO.File.ReadAllText(path);
            List<Carrito_almacena> lista = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Carrito_almacena>>(jsontext);
            if (lista == null)
            {
                lista = new List<Carrito_almacena>();
            }
            bool existe = false;

            for (int i = 0; i < lista.Count; i++)
            {
                if (lista[i].Id_carrito == carrito_almacena.Id_carrito && lista[i].N_compra == carrito_almacena.N_compra && lista[i].N_plato == carrito_almacena.N_plato)
                {
                    lista[i] = carrito_almacena;
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
        public string Delete(Carrito_almacena carrito_almacena)
        {
            string respuesta = "";

            string jsontext = System.IO.File.ReadAllText(path);
            List<Carrito_almacena> lista = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Carrito_almacena>>(jsontext);
            if (lista == null)
            {
                lista = new List<Carrito_almacena>();
            }
            bool existe = false;

            for (int i = 0; i < lista.Count; i++)
            {
                if (lista[i].Id_carrito == carrito_almacena.Id_carrito)
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
