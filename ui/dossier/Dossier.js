//------------------------------------------------------------------
//  Dossier .js
//------------------------------------------------------------------

"use strict";
//------------------------------------------------------------------

/** Dossier manages elements that allow the input and display of health statistics.
 */

//------------------------------------------------------------------
// HTML attributes.
var dossierHtmlAttrs =
{
  // no attributes passed in
};

//------------------------------------------------------------------

/** Controller for the Dossier directive.
 */
function DossierCtrl(ngScope, ngTimeout) //  TODO: might not need timeout
{
  //----------------------------------------------------------------
  // Properties
  //----------------------------------------------------------------

  /** A string flagging any displays in need of an update.  
   */
  ngScope.renew = "none";


  /** An object recording date, time-of-day and stat for a health metric
   */
  ngScope.record = {};

  //----------------------------------------------------------------
  // Initialization
  //----------------------------------------------------------------

  /** Initializes a new ArticleViewScreenCtrl object.
   */
  ngScope.initDossierCtrl = function()
  {
    ngScope.hsGlobals = hsGlobals;

    // Read the record from a stored csv.
    ngScope.read();

    // Watch the renewal flag.
    ngScope.$watch('renew', ngScope.read);
  };

  //----------------------------------------------------------------
  // Methods
  //----------------------------------------------------------------
  
  /** Get a json obj containing stat data from storage.
   */
  ngScope.read = function()
  {
    var url = '/read';
    var futureResponse = ngScope.hsGlobals.ng.http.get(url);
    futureResponse.success(ngScope.handleReadSuccess);
    futureResponse.error(
      function (data, status, headers, config) {
        throw new Error('Something went wrong');
      }
    );
  };

  /** Handle successful return of the json obj containing stat data.
   */
  ngScope.handleReadSuccess = function(data, status, headers, config)
  {
    ngScope.record = data;
    ngScope.renew = "none";
  };


  //----------------------------------------------------------------
  // Call the init method to initialize the new object.
  // Do not edit this line.
  ngScope.initDossierCtrl();
  //----------------------------------------------------------------

} // END class DossierCtrl

DossierCtrl.$inject = ['$scope', '$timeout'];

//------------------------------------------------------------------
// Directive post-link function.
function dossierPostLink(/*ngScope, ngElement, ngAttrs*/)
{
}

//------------------------------------------------------------------
// Configuration of the ArticleViewScreen directive.
var dossierDirective =
{
  'restrict' : 'E',
  'transclude' : true,
  'scope' : dossierHtmlAttrs,
  'controller' : DossierCtrl,
  'templateUrl' : 'dossier/Dossier.html',
  'replace' : true,
  'link' : dossierPostLink
};

var directiveFunction = function()
{
  return dossierDirective;
}

//------------------------------------------------------------------
// Create the directive.
healthStatsModule.directive('dossier',
                         directiveFunction);
