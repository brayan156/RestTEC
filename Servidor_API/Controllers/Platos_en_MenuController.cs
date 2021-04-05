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
    [Route("Platos_en_Menu")]
    public class Platos_en_MenuController : ApiController
    {
        string path = HttpContext.Current.Server.MapPath(@"~/bases/Platos_en_Menu.json");
        // * Funcion Get de Platos_en_Menu
        // * @param 
        // * @returns una lista con todos los registros de Platos_en_Menu
        // */
        [HttpGet]
        public List<Platos_en_Menu> Get()
        {
            string jsontext = System.IO.File.ReadAllText(path);
            List<Platos_en_Menu> lista = new List<Platos_en_Menu>();
            lista = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Platos_en_Menu>>(jsontext);
            return lista;
        }
        /**
* Funcion Get de Platos_en_Menu con parametros de filtro
* @param n_plato
* @returns  Platos_en_Menu que contengan el valor del
* atributo del parametro
*/
        [Route("Platos_en_Menu/nplato/{n_plato:int}")]
        [HttpGet]
        public Platos_en_Menu Getbyplato( int n_plato)
        {
            string respuesta = "";

            string jsontext = System.IO.File.ReadAllText(path);
            List<Platos_en_Menu> lista = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Platos_en_Menu>>(jsontext);
            if (lista == null)
            {
                lista = new List<Platos_en_Menu>();
            }
            bool existe = false;
            Platos_en_Menu platoEnMenu= new Platos_en_Menu();
            for (int i = 0; i < lista.Count; i++)
            {
                if (lista[i].N_plato == n_plato)
                {
                    platoEnMenu=lista[i];
                    existe = true;
                    respuesta = "registro editado exitosamente";
                    break;
                }
            }

            if (!existe)
            {
                platoEnMenu.N_Menu = 0;
            }
            return platoEnMenu;

        }

        /**
        * Funcion Post de Platos_en_Menu que añade el registro a la base
        * @param  Plato_en_Menu
        * @returns un string de respuesta del completado
        */

        [HttpPost]
        public string Post([FromBody] Platos_en_Menu plato_en_Menu)
        {
            string respuesta = "";

            string jsontext = System.IO.File.ReadAllText(path);
            List<Platos_en_Menu> lista = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Platos_en_Menu>>(jsontext);
            if (lista == null)
            {
                lista = new List<Platos_en_Menu>();
            }
            bool existe = false;

            for (int i = 0; i < lista.Count; i++)
            {
                if (lista[i].N_plato == plato_en_Menu.N_plato && lista[i].N_Menu == plato_en_Menu.N_Menu)
                {
                    existe = true;
                    respuesta = "registro ya existente";
                    break;
                }
            }

            if (0 == plato_en_Menu.N_plato || 0 == plato_en_Menu.N_Menu)
            {
                respuesta = "registro necesita cada identificador";
            }
            else if (!existe)
            {
                lista.Add(plato_en_Menu);
                respuesta = "registro ingresado correctamente";
            }

            jsontext = Newtonsoft.Json.JsonConvert.SerializeObject(lista);
            System.IO.File.WriteAllText(path, jsontext);

            return respuesta;
        }

        /**
        // * Funcion Put de Platos_en_Menu que edita el registro de la base
        // * @param  Platos_en_Menu
        // * @returns un string de respuesta del completado
        // */
        [HttpPut]
        public string Put([FromBody] Platos_en_Menu plato_en_Menu)
        {
            string respuesta = "";

            string jsontext = System.IO.File.ReadAllText(path);
            List<Platos_en_Menu> lista = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Platos_en_Menu>>(jsontext);
            if (lista == null)
            {
                lista = new List<Platos_en_Menu>();
            }
            bool existe = false;

            for (int i = 0; i < lista.Count; i++)
            {
                if (lista[i].N_plato == plato_en_Menu.N_plato && lista[i].N_Menu == plato_en_Menu.N_Menu)
                {
                    lista[i] = plato_en_Menu;
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

        /**
        // * Funcion Delete de Menu que elimina el registro de la base
        // * @param  numero_plato, n_menu
        // * @returns un string de respuesta del completado
        // */
        [Route("Platos_en_Menu/{n_menu:int}/{n_plato:int}")]
        [HttpDelete]
        public string Delete(int n_menu,int n_plato)
        {
            string respuesta = "";

            string jsontext = System.IO.File.ReadAllText(path);
            List<Platos_en_Menu> lista = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Platos_en_Menu>>(jsontext);
            if (lista == null)
            {
                lista = new List<Platos_en_Menu>();
            }
            bool existe = false;

            for (int i = 0; i < lista.Count; i++)
            {
                if (lista[i].N_plato == n_plato && lista[i].N_Menu == n_menu)
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
