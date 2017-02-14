var exports = module.exports = {};

// Inital variables
if (typeof routes == "undefined" || typeof routes == "null") {
  routes = {};
}

// Called after every request, finds the proper function based on method and url
let handler = (req, res) => {
  _authMiddleware(req, res);
  if (req.method == 'OPTIONS') {
    _error500(req, res);
    return;
  }
  // Get route object based on url
  let routeObj = _getRouteObject(req.url);
  // Get function to handle this specific request
  // Then call the function
  _getMethodFunction(routeObj, req.method, req, res);
}
exports.handler = handler;

// ROUTE CREATION FUNCTIONS
let get = (_url, _handler) => {
  let _route = {
    url: _url,
    methods: {
      get: _handler
    }
  };
  if (routes[_url] != null) {
    routes[_url].methods.get = _handler;
  } else {
    routes[_url] = _route;
  }
}

exports.get = get;

let post = (_url, _handler) => {
  let _route = {
    url: _url,
    methods: {
      post: _handler
    }
  };
  if (routes[_url] != null) {
    routes[_url].methods.post = _handler;
  } else {
    routes[_url] = _route;
  }
}

exports.post = post;

// ========== // ONLY PRIVATE FUNCTIONS BELOW HERE \\ ========== \\

let _getRouteObject = (url) => {
  return routes[url];
}

let _getMethodFunction = (obj, method, req, res) => {
  let urlAsyncCallback;
  let urlMethodFunction;
  if (obj == null) {
    urlMethodFunction = _404router;
  }
  switch (method) {
    case 'GET':
      urlMethodFunction = obj.methods.get;
      break;
    case 'POST':
      urlMethodFunction = obj.methods.post;
      break;
    default:
      urlMethodFunction = _404router;
      break;
  }

  urlMethodFunction = (urlMethodFunction == null) ? _404router : urlMethodFunction;

  urlMethodFunction(req, res);
}

// ERROR ROUTERS
let _error500 = (req, res) => {
  let _code = 500;
  let _str = "Error 500: Internal server error.";
  try {
    if (OPTIONS == undefined || OPTIONS == null) {
      if (OPTIONS.routerOPtions == null || OPTIONS.routerOptions == undefined) {
        if (OPTIONS.routerOptions.error404 == null || OPTIONS.routerOptions.error404 == undefined) {
          // Currently identical to the null options call
          console.log("Not Null");
          res.statusCode = _code;
          res.end(_str);
          return;
        }
      }
    }
  }
  catch(err) {
  res.statusCode = _code;
  res.end(_str);
  }
}

let _404router = (req, res) => {
  console.log("404");
  let _code = 404;
  let _str = "Error 404: Route not found";
  try {
    if (OPTIONS == undefined || OPTIONS == null) {
      if (OPTIONS.routerOPtions == null || OPTIONS.routerOptions == undefined) {
        if (OPTIONS.routerOptions.error404 == null || OPTIONS.routerOptions.error404 == undefined) {
          // Currently identical to the null options call
          console.log("Not Null");
          res.statusCode = _code;
          res.end(_str);
          return;
        }
      }
    }
  }
catch(err) {
  res.statusCode = _code;
  res.end(_str);
  }
}

/**
 * A setup function for the multiplatform server. Without this the server will
 * reject responses from sources such as mobile.
 * @private
 * @param {object} req The http request object.
 * @param {object} res The http response object.
 * @returns {void}
 * Note: Does not have a next parameter as the function because this middleware
 * is called automatically on every request by the handler before any other middleware.
 * If you change any value it changes it will throw an error, however, it won't crash
 * Node.
 *
 */
let _authMiddleware = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
  return;
}
