using okta.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

namespace okta.Controllers
{
    [System.Web.Http.Authorize]
    public class ListItemsController : ApiController
    {
        private static List<SugarLevel> _listItems { get; set; } = new List<SugarLevel>();
        // GET: ListItems
        public IEnumerable<SugarLevel> Get()
        {
            return _listItems;
        }

        public HttpResponseMessage Post([FromBody] SugarLevel model)
        {
            if (string.IsNullOrEmpty(model.Description))
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            var maxId = 0;
            if (_listItems.Count > 0)
            {
                maxId = _listItems.Max(x => x.Id);
            }
            model.Id = maxId + 1;
            _listItems.Add(model);
            return Request.CreateResponse(HttpStatusCode.Created, model);
        }
        public HttpResponseMessage Get(int id)
        {
            var item = _listItems.FirstOrDefault(x => x.Id == id);
            if (item != null)
            {
                return Request.CreateResponse(HttpStatusCode.OK, item);
            }
            return Request.CreateResponse(HttpStatusCode.NotFound);
        }

        public HttpResponseMessage Delete(int id)
        {
            var item = _listItems.FirstOrDefault(x => x.Id == id);
            if (item != null)
            {
                _listItems.Remove(item);
                return Request.CreateResponse(HttpStatusCode.OK, item);
            }
            return Request.CreateResponse(HttpStatusCode.NotFound);
        }

        public HttpResponseMessage Put(int id, [FromBody] SugarLevel model)
        {
            if (string.IsNullOrEmpty(model?.Description))
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            var item = _listItems.FirstOrDefault(x => x.Id == id);
            if (item != null)
            {
                // Update *all* of the item's properties
                item.Description = model.Description;

                return Request.CreateResponse(HttpStatusCode.OK, item);
            }
            return Request.CreateResponse(HttpStatusCode.NotFound);
        }
    }
}