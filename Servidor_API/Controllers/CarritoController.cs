using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Cryptography;
using System.Web;
using System.Web.Http;
using Servidor_API.clases;

namespace Servidor_API.Controllers
{
    [Route("Carrito")]
    public class CarritoController : ApiController
    {
        string path= HttpContext.Current.Server.MapPath(@"~/bases/Carrito.json");
        // GET api/values
        [HttpGet]
        public List<Carrito> Get()
        {
            string jsontext = System.IO.File.ReadAllText(path);
            List<Carrito> lista = new List<Carrito>();
            lista = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Carrito>>(jsontext);
            if (lista == null)
            {
                lista = new List<Carrito>();
            }
            return lista;
        }

        [Route("Carrito/obtener_carrito_actual_cedula/{cedula_cliente:int}")]
        [HttpGet]
        public Carrito Getby_cedula_cliente(int cedula_cliente)
        {
            string respuesta = "";

            string jsontext = System.IO.File.ReadAllText(path);
            List<Carrito> lista = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Carrito>>(jsontext);
            if (lista == null)
            {
                lista = new List<Carrito>();
            }
            bool existe = false;
            Carrito carrito = new Carrito();
            int n_compra = 0;
            List<int> ids_carrito = new List<int>();
            Debug.WriteLine("funcione");
            foreach (var t in lista)
            {
                Debug.WriteLine(ids_carrito.Count());
                if (!ids_carrito.Contains(t.Id))
                {
                    Debug.WriteLine(ids_carrito.Count());
                    ids_carrito.Add(t.Id);
                }
                if (t.Id_cliente == cedula_cliente)
                {
                    if (t.N_compra > n_compra)
                    {
                        carrito = t;
                        n_compra = carrito.N_compra;
                        existe = true;
                    }
                }
            }

            if (!existe)
            {
                carrito.Id=ids_carrito.Count() + 1;
                Debug.WriteLine(carrito.Id);
                carrito.N_compra = 1;
                carrito.Id_cliente = cedula_cliente;
                carrito.Monto = 0;
                lista.Add(carrito);
                jsontext = Newtonsoft.Json.JsonConvert.SerializeObject(lista);
                System.IO.File.WriteAllText(path, jsontext);
            }
            return carrito;

        }

        // POST api/values

        [HttpPost]
        public Carrito Post([FromBody] Carrito carrito)
        {
            string respuesta = "";

            string jsontext = System.IO.File.ReadAllText(path);
            List<Carrito> lista = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Carrito>>(jsontext);
            if (lista == null)
            {
                lista = new List<Carrito>();
            }
            bool existe = false;
            int n_compra = 1;

            for (int i = 0; i < lista.Count; i++)
            {
                if (lista[i].Id == carrito.Id || lista[i].Id_cliente == carrito.Id_cliente )
                {
                    n_compra += 1;
                }
            }

            carrito.N_compra = n_compra;
            if (carrito.Id == 0 || carrito.Id_cliente == 0)
            {
                respuesta = "registro necesita cada identificador";
            }
            else if (!existe)
            {
                lista.Add(carrito);
                respuesta = "registro ingresado correctamente, su numero de compra es:"+n_compra.ToString();
            }

            jsontext = Newtonsoft.Json.JsonConvert.SerializeObject(lista);
            System.IO.File.WriteAllText(path, jsontext);

            return carrito;
        }

        // PUT api/values/5
        [HttpPut]
        public string Put([FromBody] Carrito carrito)
        {
            string respuesta = "";

            string jsontext = System.IO.File.ReadAllText(path);
            List<Carrito> lista = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Carrito>>(jsontext);
            if (lista == null)
            {
                lista = new List<Carrito>();
            }
            bool existe = false;

            for (int i = 0; i < lista.Count; i++)
            {
                if (lista[i].Id == carrito.Id && lista[i].Id_cliente == carrito.Id_cliente && lista[i].N_compra == carrito.N_compra)
                {
                    lista[i] = carrito;
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
        public string Delete(Carrito carrito)
        {
            string respuesta = "";

            string jsontext = System.IO.File.ReadAllText(path);
            List<Carrito> lista = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Carrito>>(jsontext);
            if (lista == null)
            {
                lista = new List<Carrito>();
            }
            bool existe = false;

            for (int i = 0; i < lista.Count; i++)
            {
                if (lista[i].Id == carrito.Id && lista[i].Id_cliente == carrito.Id_cliente && lista[i].N_compra == carrito.N_compra)
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
