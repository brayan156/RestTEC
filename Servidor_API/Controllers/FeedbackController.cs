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
    [Route("Feedback")]
    public class FeedbackController : ApiController
    {

        string path = HttpContext.Current.Server.MapPath(@"~/bases/Feedback.json");

        // * Funcion Get de Feedback
        // * @param 
        // * @returns una lista con todos los registros de Feedback
        // */
        [HttpGet]
        public List<Feedback> Get()
        {
            string jsontext = System.IO.File.ReadAllText(path);
            List<Feedback> lista = new List<Feedback>();
            lista = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Feedback>>(jsontext);
            return lista;
        }


        /**
* Funcion Post de Feedback que añade el registro a la base
* @param  Feedback
* @returns un string de respuesta del completado
*/
        [HttpPost]
        public string Post([FromBody] Feedback feedback)
        {
            string respuesta = "";

            string jsontext = System.IO.File.ReadAllText(path);
            List<Feedback> lista = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Feedback>>(jsontext);
            if (lista == null)
            {
                lista = new List<Feedback>();
            }

            bool existe = false;
            Debug.WriteLine("hola");
            Debug.WriteLine(feedback.Id_pedido);
            for (int i = 0; i < lista.Count; i++)
            {
                if (lista[i].Id_pedido == feedback.Id_pedido)
                {
                    existe = true;
                    respuesta = "registro ya existente";
                    break;
                }
            }

            if (feedback.Id_pedido == 0)
            {
                respuesta = "registro necesita un identificador";
            }
            else if (!existe)
            {
                feedback.Dia = DateTime.Now.Day.ToString();
                feedback.Year = DateTime.Now.Year.ToString();
                feedback.Mes = DateTime.Now.Month.ToString();
                feedback.Hora = DateTime.Now.TimeOfDay.ToString();
                lista.Add(feedback);
                respuesta = "registro ingresado correctamente";
            }

            jsontext = Newtonsoft.Json.JsonConvert.SerializeObject(lista);
            System.IO.File.WriteAllText(path, jsontext);

            return respuesta;
        }

    }
}
