//------------------------------------------------------------------
//  DossierEntry .js
//------------------------------------------------------------------

"use strict";
//------------------------------------------------------------------

/** TODO: Purpose
 */

//------------------------------------------------------------------
// HTML attributes.
var dossierEntryHtmlAttrs =
{
  
};

//------------------------------------------------------------------

/** Controller for the Dossier Entry directive.
 */
function DossierEntryCtrl(ngScope, ngTimeout) //  TODO: might not need timeout
{
  //----------------------------------------------------------------
  // Properties
  //----------------------------------------------------------------

  /** The date of the record being added to the server
   */
  ngScope.logEntryDate = new Date();

  /** The float value of the stat being added to the server
   */
  ngScope.logEntryValue = 0.0;

  //----------------------------------------------------------------
  // Initialization
  //----------------------------------------------------------------

  /** Initializes a new ArticleViewScreenCtrl object.
   */
  ngScope.initDossierEntryCtrl = function()
  {
    ngScope.hsGlobals = hsGlobals;
  };

  //----------------------------------------------------------------
  // Methods
  //----------------------------------------------------------------

  /** Writes a record to the server.
   */
  ngScope.postRecord = function()
  {
    // construct parameters for the post function
    var url = '/write';
    var data = {
      'date' : ngScope.logEntryDate,
      'stat' : ngScope.logEntryValue
    };
    data = JSON.stringify(data);

    var config = {
      'headers' : {
        'Content-Type' : 'application/json',
        'Accept' : 'application/json'
      }
    };

    // send payload to server
    var futureResponse = ngScope.hsGlobals.ng.http.post(url, data, config);

    futureResponse.success(ngScope.postSuccess);
    futureResponse.error(
      function (data, status, headers, config) {
        throw new Error('Something went wrong');
      }
    );  };

  /** Follow up successful post
   */
  ngScope.postSuccess = function()
  {
    console.log("poke2");
    // hit the /stats python route to rewrite the chart
  };

  //----------------------------------------------------------------
  // Call the init method to initialize the new object.
  // Do not edit this line.
  ngScope.initDossierEntryCtrl();
  //----------------------------------------------------------------

} // END class DossierCtrl
// TODO: might not need $timeout at this level
DossierEntryCtrl.$inject = ['$scope', '$timeout'];

//------------------------------------------------------------------
// Directive post-link function.
function dossierEntryPostLink(/*ngScope, ngElement, ngAttrs*/)
{
}

//------------------------------------------------------------------
// Configuration of the DossierEntry directive.
var dossierEntryDirective =
{
  'restrict' : 'E',
  'transclude' : true,
  'scope' : dossierEntryHtmlAttrs,
  'controller' : DossierEntryCtrl,
  'templateUrl' : 'dossier/DossierEntry.html',
  'replace' : true,
  'link' : dossierEntryPostLink
};

var directiveFunction = function()
{
  return dossierEntryDirective;
}

//------------------------------------------------------------------
// Create the directive.
healthStatsModule.directive('dossierEntry',
                         directiveFunction);
