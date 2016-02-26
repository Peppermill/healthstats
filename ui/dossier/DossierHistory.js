//------------------------------------------------------------------
//  Dossier .js
//------------------------------------------------------------------

"use strict";
//------------------------------------------------------------------

/** TODO: Purpose
 */

//------------------------------------------------------------------
// HTML attributes.
var dossierHistoryHtmlAttrs =
{
  
};

//------------------------------------------------------------------

/** Controller for the Dossier directive.
 */
function DossierHistoryCtrl(ngScope, ngTimeout) //  TODO: might not need timeout
{
  //----------------------------------------------------------------
  // Properties
  //----------------------------------------------------------------

  /** TODO: Purpose
   */
  ngScope.data = {};

  // TODO: Do I need to put globals in here?

  //----------------------------------------------------------------
  // Initialization
  //----------------------------------------------------------------

  /** Initializes a new ArticleViewScreenCtrl object.
   */
  ngScope.initDossierHistoryCtrl = function()
  {
    ngScope.hsGlobals = hsGlobals;

    // successful experiment
    // ngScope.retrieveRecord();

    // display health stats
    ngScope.executeFlaskMethod();
  };

  //----------------------------------------------------------------
  // Methods
  //----------------------------------------------------------------

  /** Gets an existing record from the server.
   */
  ngScope.retrieveRecord = function()
  {
    var url = 'test.json'; // this works fine
    var futureResponse = ngScope.hsGlobals.ng.http.get(url);

    futureResponse.success(ngScope.displayRecord);
    futureResponse.error(
      function (data, status, headers, config) {
        throw new Error('Something went wrong');
      }
    );
  };

  ngScope.displayRecord = function(data, status, headers, config)
  {
    ngScope.data = data;
    console.log("flask returned: ", ngScope.data);
  }

  /** Gets an existing record from the server.
   */
  ngScope.executeFlaskMethod = function()
  {
    var url = '/read';
    var futureResponse = ngScope.hsGlobals.ng.http.get(url);

    futureResponse.success(ngScope.flaskReturn);
    futureResponse.error(
      function (data, status, headers, config) {
        throw new Error('Something went wrong');
      }
    );
  };

  ngScope.flaskReturn = function(data, status, headers, config)
  {
    ngScope.data = data;
    console.log("flask returned: ", ngScope.data);
  }

  //----------------------------------------------------------------
  // Call the init method to initialize the new object.
  // Do not edit this line.
  ngScope.initDossierHistoryCtrl();
  //----------------------------------------------------------------

} // END class DossierCtrl
// TODO: might not need $timeout at this level
DossierHistoryCtrl.$inject = ['$scope', '$timeout'];

//------------------------------------------------------------------
// Directive post-link function.
function dossierHistoryPostLink(/*ngScope, ngElement, ngAttrs*/)
{
}

//------------------------------------------------------------------
// Configuration of the ArticleViewScreen directive.
var dossierHistoryDirective =
{
  'restrict' : 'E',
  'transclude' : true,
  'scope' : dossierHistoryHtmlAttrs,
  'controller' : DossierHistoryCtrl,
  'templateUrl' : 'dossier/DossierHistory.html',
  'replace' : true,
  'link' : dossierHistoryPostLink
};

var directiveFunction = function()
{
  return dossierHistoryDirective;
}

//------------------------------------------------------------------
// Create the directive.
healthStatsModule.directive('dossierHistory',
                         directiveFunction);
