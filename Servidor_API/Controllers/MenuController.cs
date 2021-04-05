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
    [Route("Menu")]
    public class MenuController : ApiController
    {
        string path = HttpContext.Current.Server.MapPath(@"~/bases/Menu.json");
        // * Funcion Get de Menu
        // * @param 
        // * @returns una lista con todos los registros de Menu
        // */
        [HttpGet]
        public List<Menu> Get()
        {
            string jsontext = System.IO.File.ReadAllText(path);
            List<Menu> lista = new List<Menu>();
            lista = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Menu>>(jsontext);
            return lista;
        }
        /**
* Funcion Get de Menu con parametros de filtro
* @param numero_menu
* @returns  Menu que contengan el valor del
* atributo del parametro
*/
        [Route("Menu/nmenu/{numero_menu:int}")]
        [HttpGet]
        public Menu Getbyplato(int numero_menu)
        {
            string respuesta = "";

            string jsontext = System.IO.File.ReadAllText(path);
            List<Menu> lista = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Menu>>(jsontext);
            if (lista == null)
            {
                lista = new List<Menu>();
            }
            bool existe = false;
            Menu menu = new Menu();
            for (int i = 0; i < lista.Count; i++)
            {
                if (lista[i].Numero_menu == numero_menu)
                {
                    menu = lista[i];
                    existe = true;
                    respuesta = "registro editado exitosamente";
                    break;
                }
            }

            if (!existe)
            {
                menu.Numero_menu = 0;
            }
            return menu;

        }

        /**
        * Funcion Post de Menu que añade el registro a la base
        * @param  Menu
        * @returns un string de respuesta del completado
        */
        [HttpPost]
        public string Post([FromBody] Menu menu)
        {
            string respuesta = "";

            string jsontext = System.IO.File.ReadAllText(path);
            List<Menu> lista = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Menu>>(jsontext);
            if (lista == null)
            {
                lista = new List<Menu>();
            }
            bool existe = false;
            int n_plato = 0;
            for (int i = 0; i < lista.Count; i++)
            {
                if (n_plato < lista[i].Numero_menu)
                {
                    n_plato = lista[i].Numero_menu;
                }
                if (lista[i].Tipo == menu.Tipo)
                {
                    existe = true;
                    respuesta = "registro ya existente";
                    break;
                }
            }
            if (!existe)
            {
                menu.Numero_menu = n_plato + 1;
                lista.Add(menu);
                respuesta = "registro ingresado correctamente";
            }

            jsontext = Newtonsoft.Json.JsonConvert.SerializeObject(lista);
            System.IO.File.WriteAllText(path, jsontext);

            return respuesta;
        }

        /**
        // * Funcion Put de Menu que edita el registro de la base
        // * @param  Menu
        // * @returns un string de respuesta del completado
        // */
        [HttpPut]
        public string Put([FromBody] Menu menu)
        {
            string respuesta = "";

            string jsontext = System.IO.File.ReadAllText(path);
            List<Menu> lista = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Menu>>(jsontext);
            if (lista == null)
            {
                lista = new List<Menu>();
            }
            bool existe = false;

            for (int i = 0; i < lista.Count; i++)
            {
                if (lista[i].Numero_menu == menu.Numero_menu)
                {
                    lista[i] = menu;
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
        // * @param  numero_menu
        // * @returns un string de respuesta del completado
        // */
        [Route("Menu/{numero_menu:int}")]
        [HttpDelete]
        public string Delete(int numero_menu)
        {
            string respuesta = "";

            string jsontext = System.IO.File.ReadAllText(path);
            List<Menu> lista = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Menu>>(jsontext);
            if (lista == null)
            {
                lista = new List<Menu>();
            }
            bool existe = false;

            for (int i = 0; i < lista.Count; i++)
            {
                if (lista[i].Numero_menu == numero_menu)
                {
                    Debug.WriteLine("eliminado");
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
