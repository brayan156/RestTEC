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
    [Route("Pedido")]
    public class PedidoController : ApiController
    {
        string path = HttpContext.Current.Server.MapPath(@"~/bases/Pedido.json");
        // * Funcion Get de Pedido
        // * @param 
        // * @returns una lista con todos los registros de Pedido
        // */
        [HttpGet]
        public List<Pedido> Get()
        {
            try
            {
                string jsontext = System.IO.File.ReadAllText(path);
            List<Pedido> lista = new List<Pedido>();
            lista = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Pedido>>(jsontext);
            return lista;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return new List<Pedido>() ;

            }
        }


        /**
        * Funcion Post de Pedido que añade el registro a la base
        * @param  tiempo de duracion del pedido
        * @returns el pedido añadido
        */
        [HttpPost]
        public Pedido Post([FromBody]  int tiempo_estimado)
        {
            try
            {
                    string jsontext = System.IO.File.ReadAllText(path);
                List<Pedido> lista = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Pedido>>(jsontext);
                if (lista == null)
                {
                    lista = new List<Pedido>();
                }

                Pedido pedido = new Pedido();
                pedido.Numero = lista.Count+1;
                pedido.Cedula_chef_asignado = 0;
                pedido.Tiempo_restante = 0;
                pedido.Tiempo_transcurrido = 0;
                pedido.Tiempo_estimado = tiempo_estimado;
                pedido.Estado = "sin asignar";
                lista.Add(pedido);
                jsontext = Newtonsoft.Json.JsonConvert.SerializeObject(lista);
                System.IO.File.WriteAllText(path, jsontext);
                string respuesta = "pedido realizado";
                return pedido;
            }   
            catch (Exception e)
            {
                Console.WriteLine(e);
                return new Pedido();
            }
        }

        /**
        // * Funcion Put de Pedido que edita el registro de la base
        // * @param  Pedido
        // * @returns un string de respuesta del completado
        // */
        [HttpPut]
        public string Put([FromBody] Pedido pedido)
        {
            try
            {
                string respuesta = "";
            string jsontext = System.IO.File.ReadAllText(path);
            List<Pedido> lista = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Pedido>>(jsontext);
            if (lista == null)
            {
                lista = new List<Pedido>();
            }
            bool existe = false;

            for (int i = 0; i < lista.Count; i++)
            {
                if (lista[i].Numero == pedido.Numero)
                {
                    lista[i] = pedido;
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
            catch (Exception e)
            {
                Console.WriteLine(e);
                return "error";
            }
        }
    }
}
