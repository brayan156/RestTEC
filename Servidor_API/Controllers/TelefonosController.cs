using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using Servidor_API.clases;

namespace Servidor_API.Controllers
{
    [Route("Telefonos")]
    public class TelefonosController : ApiController
    {
        string path = HttpContext.Current.Server.MapPath(@"~/bases/Telefonos.json");

        // * Funcion Get de Telefonos
        // * @param 
        // * @returns una lista con todos los registros de Telefonos
        // */
        [HttpGet]
        public List<Telefonos> Get()
        {
            string jsontext = System.IO.File.ReadAllText(path);
            List<Telefonos> lista = new List<Telefonos>();
            lista = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Telefonos>>(jsontext);
            return lista;
        }


        /**
        * Funcion Post de Platos_en_Menu que añade la lista de registros a la base
        * @param  lista de telefonos del cliente
        * @returns un string de respuesta del completado
        */
        [HttpPost]
        public string Post([FromBody] Telefonos[] telefonos)
        {
            string respuesta = "";
            Debug.WriteLine("inicio");
            string jsontext = System.IO.File.ReadAllText(path);
            List<Telefonos> lista = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Telefonos>>(jsontext);
            if (lista == null)
            {
                lista = new List<Telefonos>();
            }

            bool existe = false;


            Debug.WriteLine("crear");
            lista.AddRange(telefonos);
            respuesta = "registro ingresado correctamente";


            jsontext = Newtonsoft.Json.JsonConvert.SerializeObject(lista);
            System.IO.File.WriteAllText(path, jsontext);

            return respuesta;
        }
    }
}
