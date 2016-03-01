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
  'healthRecord' : '='
};
 
//------------------------------------------------------------------

/** Controller for the Dossier directive.
 */
function DossierHistoryCtrl(ngScope, ngTimeout) //  TODO: might not need timeout
{
  //----------------------------------------------------------------
  // Properties
  //----------------------------------------------------------------


  //----------------------------------------------------------------
  // Initialization
  //----------------------------------------------------------------

  /** Initializes a new ArticleViewScreenCtrl object.
   */
  ngScope.initDossierHistoryCtrl = function()
  {
    ngScope.hsGlobals = hsGlobals;
    
    console.log("DossierHistory returned: ", ngScope.heathRecord);
  };

  //----------------------------------------------------------------
  // Methods
  //----------------------------------------------------------------

  
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
