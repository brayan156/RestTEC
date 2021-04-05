using System;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web;
using Servidor_API.CReports;
using CrystalDecisions.CrystalReports.Engine;
using CrystalDecisions.Shared;

namespace Servidor_API.Controllers
{
    [Route("Informes")]
    public class InformesController : ApiController
    {

        /**
        * Funcion Post de Informes que crea el pdf de los platos más vendidos
        * @param  lista de datos
        * @returns pdf de los platos más vendidos
        */
        [Route("Informes/platos_vendidos")]
        [HttpPost]
        public HttpResponseMessage obtenerReportePlatosVendidos(List<dynamic> data)
        {

            DataSet1 ds = new DataSet1();
            DataTable t = ds.Tables.Add("Items");
            DataRow r;



            t.Columns.Add("Nombre del plato", Type.GetType("System.String"));
            t.Columns.Add("Cantidad vendida", Type.GetType("System.Int32"));

            for (int i = 0; i < data.Count; i++)
            { 
                Debug.WriteLine("paso por aca");
                r = t.NewRow();
                r["Cantidad vendida"] = data[i]["Cantidad"];
                r["Nombre del plato"] = data[i]["Nombre"];
                t.Rows.Add(r);
            }

            CrystalReport1 objRpt = new CrystalReport1();
            objRpt.SetDataSource(ds.Tables[1]);
           Debug.WriteLine(objRpt.ReportSource);
           ReportDocument cryRpt = new ReportDocument();
           cryRpt.Load("C:\\Users\\braya\\Desktop\\bases\\Tarea_corta\\Servidor_API\\CReports\\CrystalReport1.rpt");
 



             ExportOptions CrExportOptions;
            DiskFileDestinationOptions CrDiskFileDestinationOptions = new DiskFileDestinationOptions();
            PdfRtfWordFormatOptions CrFormatTypeOptions = new PdfRtfWordFormatOptions();
            CrDiskFileDestinationOptions.DiskFileName = "C:\\Users\\braya\\Desktop\\bases\\Tarea_corta\\Servidor_API\\CReports\\report.pdf";
            CrExportOptions = objRpt.ExportOptions;
            {
                CrExportOptions.ExportDestinationType = ExportDestinationType.DiskFile;
                CrExportOptions.ExportFormatType = ExportFormatType.PortableDocFormat;
                CrExportOptions.DestinationOptions = CrDiskFileDestinationOptions;
                CrExportOptions.FormatOptions = CrFormatTypeOptions;
            }
            




            Stream stream = objRpt.ExportToStream(ExportFormatType.PortableDocFormat);
            objRpt.Export(CrExportOptions);
            MemoryStream ms = new MemoryStream();

            stream.CopyTo(ms);
            var result = new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ByteArrayContent(ms.ToArray())
            };
            result.Content.Headers.ContentDisposition =
                new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment")
                {
                    FileName = "Report.pdf"
                };
            result.Content.Headers.ContentType =
                new System.Net.Http.Headers.MediaTypeHeaderValue("application/octet-stream");
            return result;

        }

        /**
* Funcion Post de Informes que crea el pdf de los platos con más ganancia
* @param  lista de datos
* @returns pdf de los platos con más ganancia
*/
        [Route("Informes/platos_ganancia")]
        [HttpPost]
        public HttpResponseMessage obtenerReportePlatosGanancia(List<dynamic> data)
        {

            DataSet1 ds = new DataSet1();
            DataTable t = ds.Tables.Add("Platos mayor ganancia");
            DataRow r;



            t.Columns.Add("Nombre del plato", Type.GetType("System.String"));
            t.Columns.Add("Ganancia generada", Type.GetType("System.Int32"));

            for (int i = 0; i < data.Count; i++)
            {
                r = t.NewRow();
                r["Ganancia generada"] = data[i]["Ganancia"];
                r["Nombre del plato"] = data[i]["Nombre"];
                t.Rows.Add(r);
            }

            ReportGanancia objRpt = new ReportGanancia();
            objRpt.SetDataSource(ds.Tables[1]);
            return obtener_Response(objRpt);

        }

        /**
* Funcion Post de Informes que crea el pdf de los platos con mejor feedback
* @param  lista de datos
* @returns pdf de los platos con mejor feedback
*/
        [Route("Informes/mejor_feedback")]
        [HttpPost]
        public HttpResponseMessage obtenerReportePlatosFeedback(List<dynamic> data)
        {

            DataSet1 ds = new DataSet1();
            DataTable t = ds.Tables.Add("Platos mejor promedio");
            DataRow r;



            t.Columns.Add("Nombre del plato", Type.GetType("System.String"));
            t.Columns.Add("Puntuacion promedio", Type.GetType("System.Int32"));

            for (int i = 0; i < data.Count; i++)
            {
                r = t.NewRow();
                r["Puntuacion promedio"] = data[i]["Promedio"];
                r["Nombre del plato"] = data[i]["Nombre"];
                t.Rows.Add(r);
            }

            Reporte_Feedback objRpt = new Reporte_Feedback();
            objRpt.SetDataSource(ds.Tables[1]);
            return obtener_Response(objRpt);
        }


        /**
* Funcion Post de Informes que crea el pdf de los cliente con mayor cantidad de ordenes
* @param  lista de datos
* @returns pdf de los cliente con mayor cantidad de ordenes
*/
        [Route("Informes/mayor_ordenes")]
        [HttpPost]
        public HttpResponseMessage obtenerReporteClienteOrdenes(List<dynamic> data)
        {

            DataSet1 ds = new DataSet1();
            DataTable t = ds.Tables.Add("Platos mayor ordenes");
            DataRow r;



            t.Columns.Add("Nombre del Cliente", Type.GetType("System.String"));
            t.Columns.Add("Cantidad de ordenes generadas", Type.GetType("System.Int32"));

            for (int i = 0; i < data.Count; i++)
            {
                r = t.NewRow();
                r["Cantidad de ordenes generadas"] = data[i]["Ordenes"];
                r["Nombre del Cliente"] = data[i]["Nombre"];
                t.Rows.Add(r);
            }

            ReporteOrdenes objRpt = new ReporteOrdenes();
            objRpt.SetDataSource(ds.Tables[1]);
            return obtener_Response(objRpt);
        }

        /**
* Funcion que crea el pdf y lo convierte a un httpresponseMessage para enviar por http
* @param  pbjeto de Crystal report que contiene la tabla del pdf a generar
* @returns httpResponseMessage del pdf
*/
        public HttpResponseMessage obtener_Response(ReportClass objRpt)
        {


            ExportOptions CrExportOptions;
            PdfRtfWordFormatOptions CrFormatTypeOptions = new PdfRtfWordFormatOptions();
            CrExportOptions = objRpt.ExportOptions;

            CrExportOptions.ExportFormatType = ExportFormatType.PortableDocFormat;
            CrExportOptions.FormatOptions = CrFormatTypeOptions;
            Stream stream = objRpt.ExportToStream(ExportFormatType.PortableDocFormat);
            objRpt.Export(CrExportOptions);
            MemoryStream ms = new MemoryStream();
            stream.CopyTo(ms);
            var result = new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ByteArrayContent(ms.ToArray())
            };
            result.Content.Headers.ContentDisposition =
                new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment")
                {
                    FileName = "Report.pdf"
                };
            result.Content.Headers.ContentType =
                new System.Net.Http.Headers.MediaTypeHeaderValue("application/octet-stream");
            return result;
        }


    }
}
