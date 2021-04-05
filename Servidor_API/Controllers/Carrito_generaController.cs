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
        /**
// * Funcion Get de Carrito_genera
// * @param 
// * @returns una lista con todos los registros de Carrito_genera
// */
        [HttpGet]
        public List<Carrito_genera> Get()
        {
            string jsontext = System.IO.File.ReadAllText(path);
            List<Carrito_genera> lista = new List<Carrito_genera>();
            lista = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Carrito_genera>>(jsontext);
            return lista;
        }

        /**
* Funcion Get de Carrito_genera con parametros de filtro
* @param n_factura
* @returns  Carrito_genera que contengan el valor del
 * atributo del parametro
*/
        [Route("Carrito_genera/nfactura/{n_factura:int}")]
        [HttpGet]
        public Carrito_genera Getby_nfactura(int n_factura)
        {
            string respuesta = "";

            string jsontext = System.IO.File.ReadAllText(path);
            List<Carrito_genera> lista = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Carrito_genera>>(jsontext);
            if (lista == null)
            {
                lista = new List<Carrito_genera>();
            }
            bool existe = false;
            Carrito_genera carrito_genera = new Carrito_genera();
            for (int i = 0; i < lista.Count; i++)
            {
                if (lista[i].Id_Factura == n_factura)
                {
                    carrito_genera = lista[i];
                    existe = true;
                    respuesta = "registro editado exitosamente";
                    break;
                }
            }

            if (!existe)
            {
                carrito_genera.Id_Factura = 0;
            }
            return carrito_genera;

        }
        /**
* Funcion Get de Carrito_genera con parametros de filtro
* @param n_pedido
* @returns  Carrito_genera que contengan el valor del
* atributo del parametro
*/
        [Route("Carrito_genera/npedido/{n_pedido:int}")]
        [HttpGet]
        public Carrito_genera Getby_npedido(int n_pedido)
        {
            string respuesta = "";

            string jsontext = System.IO.File.ReadAllText(path);
            List<Carrito_genera> lista = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Carrito_genera>>(jsontext);
            if (lista == null)
            {
                lista = new List<Carrito_genera>();
            }
            bool existe = false;
            Carrito_genera carrito_genera = new Carrito_genera();
            for (int i = 0; i < lista.Count; i++)
            {
                if (lista[i].Id_pedido == n_pedido)
                {
                    carrito_genera = lista[i];
                    existe = true;
                    respuesta = "registro editado exitosamente";
                    break;
                }
            }

            if (!existe)
            {
                carrito_genera.Id_pedido = 0;
            }
            return carrito_genera;

        }

        /**
* Funcion Get de Carrito_genera con parametros de filtro
* @param id_carrito
* @returns una lista con todos los registros de Carrito_genera que contengan el valor del
 * atributo del parametro
*/
        [Route("Carrito_genera/Id_carrito/{id_carrito:int}")]
        [HttpGet]
        public List<Carrito_genera> Getby_idcarrito(int id_carrito)
        {
            string respuesta = "";

            string jsontext = System.IO.File.ReadAllText(path);
            List<Carrito_genera> lista_pedidos = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Carrito_genera>>(jsontext);
            if (lista_pedidos == null)
            {
                lista_pedidos = new List<Carrito_genera>();
            }
            bool existe = false;
            List<Carrito_genera> carrito_genera = new List<Carrito_genera>();
            for (int i = 0; i < lista_pedidos.Count; i++)
            {
                if (lista_pedidos[i].Id_carrito == id_carrito)
                {
                    carrito_genera.Add( lista_pedidos[i]);
                    existe = true;
                    respuesta = "registro editado exitosamente";
                }
            }
            return carrito_genera;

        }



        /**
        * Funcion Post de Carrito_genera que añade el registro a la base
        * @param  Carrito_genera
        * @returns un string de completado
        */
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
    }
}
