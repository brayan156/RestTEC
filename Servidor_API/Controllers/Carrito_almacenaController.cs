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

        /**
        * Funcion Get de Carrito_almacena
        * @param 
        * @returns una lista con todos los registros de Carrito_almacena
        */
        [HttpGet]
        public List<Carrito_almacena> Get()
        {
            
            string jsontext = System.IO.File.ReadAllText(path);
            List<Carrito_almacena> lista = new List<Carrito_almacena>();
            lista = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Carrito_almacena>>(jsontext);
            return lista;
        }

        /**
        * Funcion Get de Carrito_almacena con parametros de filtro
        * @param id_carrito
        * @returns una lista con todos los registros de Carrito_almacena que contengan el valor del
         * atributo del parametro
        */
        [Route("Carrito_almacena/carrito_id/{id_carrito:int}")]
        [HttpGet]
        public List<Carrito_almacena> Getby_carritoid(int id_carrito)
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
                if (lista_pedidos[i].Id_carrito == id_carrito)
                {
                    lista_carrito_almacena.Add(lista_pedidos[i]);
                    existe = true;
                }
            }
            return lista_carrito_almacena;
        }

        /**
        * Funcion Get de Carrito_almacena con parametros de filtro
        * @param id_carrito,n_compra
        * @returns una lista con todos los registros de Carrito_almacena que contengan el valor de los
         * atributos de los parametros
        */
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

        /**
        * Funcion Post de Carrito_almacena que añade todos los registros a la base
        * @param lista de carrito_almacena
        * @returns un string de completado
        */
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

    }
}
