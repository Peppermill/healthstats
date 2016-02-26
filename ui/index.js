//------------------------------------------------------------------
//  index.js
//------------------------------------------------------------------

// instantiate a module to act as a container for other ng objects, install the 
// Q: where does the controller come in here? A: we don't need one at this level.
// Q: is this loading just the route module or is it instantiating any new module, but with route components?
// Also, not all of this is necessary

// issue: need to register module, load module
// establish dependency
var healthStatsModule = angular.module('healthStatsModule', ['ngRoute']); // switched to single quotes

/** The config method accepts a function, which can be injected with "provider"
 * and "constant" components as dependencies.
 */
healthStatsModule.config(setUpConfig);

/** The run method accepts a function, which can be injected with "service",
 * "value" and "constant" components as dependencies.
 */
healthStatsModule.run(setUpGlobals);

function setUpConfig(ngRouteProvider, ngHttpProvider)
{
  setUpRoutes(ngRouteProvider);
  setUpHttpProvider(ngHttpProvider);
};

var hsGlobals = {};


/** The primary responsibility of a controller is to initialize scope objects.
 * This controller provides initial model values on the healthStatsModule scope.
 */ 
function setUpGlobals(ngHttp, ngRootScope, ngTimeout, ngQ, ngFilter, ngParse, ngWindow, ngCompile)
{
  hsGlobals.ng = {};
  hsGlobals.ng.http = ngHttp; // core angular service for creating ajax requests
  hsGlobals.ng.RootScope = ngRootScope; // used for creating child scopes
  hsGlobals.ng.Timeout = ngTimeout; // used for managing timeouts
  hsGlobals.ng.q = ngQ; // used for creating asynchronous functions
  hsGlobals.ng.filter = ngFilter; // for handrolling filters for formatting data
  hsGlobals.ng.parse = ngParse; // for converting an ng expression to a function
  hsGlobals.ng.window = ngWindow; // the window object
  hsGlobals.ng.compile = ngCompile; // match DOM to template, assist with scope

  hsGlobals.userInfo = {
    'username': '',
    'id': ''
  };
};

// Dependency injection for ngRoute services. 
setUpGlobals.$inject = ['$http', '$rootScope', '$timeout', '$q', '$filter', '$parse', '$window', '$compile'];
// Dependency injection for ngRoute providers.
setUpConfig.$inject = ['$routeProvider', '$httpProvider'];

/** Sets up the route mappings between URLs and views.  At the moment, there
 * is only one url route, but when the site expands, this must be reworked
 * for routing to function.
 */
function setUpRoutes(ngRouteProvider)
{
  var routes = getEventTagRoutes();
  for (var i = 0; i < routes.length; ++i)
  {
    var route = routes[i];

    var urlController = {'templateUrl' : route[1]};
    if (route.length > 2)
    {
      urlController['controller'] = route[2];
    }
    ngRouteProvider.when(route[0], urlController);
  }
  ngRouteProvider.otherwise({ 'redirectTo': '/index.html' });
};

// The list of URLs and the templateUrls and controllers they map to.
function getEventTagRoutes()
{
  // if this doesn't work, try editing the python so the domain converts to /dossier
  var routes = [
    ['/', '/dossier/Dossier.html', DossierCtrl],  // TODO: maybe edit so this goes directly to /dossier
      /*['/login', 'login/LoginScreen.html', LoginScreenCtrl]*/
  ];
  return routes;
};

// HTTP

hsGlobals.http = {};

/** Creates a request object to make an external query.
 */
hsGlobals.http.createRequest = function(url, params, method)
{
  if (!method)
  {
    method = 'POST';
  }

  if (!params)
  {
    params = new RequestParams();
  }

  // Need to be able to set method to 'GET' for static data file.
  if (params['keys'].indexOf('method') != -1)
  {
    var index = params['keys'].indexOf('method');
    method = params['values'][index];
  }

  // A deferred/promise used to abort a request.
  var abortDeferred = etGlobals.ng.q.defer();

  var abortFunction = function()
  {
    abortDeferred.resolve();
  };

  var httpConfig = {
    'method' : method,
    'url' : url,
    'requestParams' : params,
    'timeout' : abortDeferred.promise
  };

  if (method == 'POST')
  {
    httpConfig['data'] = params.formatFormUrlEncoded();
    httpConfig['headers'] = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
  }
  else if (method == 'GET' && !params.isEmpty())
  {
    httpConfig['url'] += '?' + params.formatFormUrlEncoded();
  }

  var promise = etGlobals.ng.http(httpConfig);

  // Add an abort function to abort the request before it is complete.
  promise.abort = abortFunction;
  
  return promise;
}

/** Sets up the HTTP data processing.
 */
function setUpHttpProvider(ngHttpProvider)
{
  ngHttpProvider.interceptors.push(createErrorHandler);
};

/** Creates an error handler HTTP interceptor.
 */
var createErrorHandler = function($q)
{
  var interceptor = { 
    'response' : handleSuccess, 
    'responseError' : handleError
  };

  return interceptor;
};

/** Handle HTTP request success.
 */
var handleSuccess = function(response)
{
  return response;
};

/** Handle errors from HTTP request.
 */
var handleError = function(response)
{
  if (response.status == 401)
  {
    // Redirect to the login page.
    window.location = 'login.html';
  }

  console.error('HTTP error', response.status, response.config.url,
                'response = ', response);

  return hsGlobals.ng.q.reject(response);
};

