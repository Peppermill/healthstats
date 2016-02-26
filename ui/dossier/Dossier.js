//------------------------------------------------------------------
//  Dossier .js
//------------------------------------------------------------------

"use strict";
//------------------------------------------------------------------

/** TODO: Purpose
 */

//------------------------------------------------------------------
// HTML attributes.
var dossierHtmlAttrs =
{
  
};

//------------------------------------------------------------------

/** Controller for the Dossier directive.
 */
function DossierCtrl(ngScope, ngTimeout) //  TODO: might not need timeout
{
  //----------------------------------------------------------------
  // Properties
  //----------------------------------------------------------------

  /** TODO: Purpose
   */
  ngScope.article = "";

  //----------------------------------------------------------------
  // Initialization
  //----------------------------------------------------------------

  /** Initializes a new ArticleViewScreenCtrl object.
   */
  ngScope.initDossierCtrl = function()
  {
    // TODO: might not need timeout

    // TODO: Don's stuff.  Prune as needed.
    /*
    ngScope.etGlobals = etGlobals;
    ngTimeout(ngScope.retrieveArticle, 100);
    if (etGlobals.userInfo.numberArticles == 0)
    {
      ngScope.tutorialIndex = -1;
      ngTimeout(ngScope.nextTutorial, 200);
    }
    */
  };

  //----------------------------------------------------------------
  // Methods
  //----------------------------------------------------------------

  /** Gets an existing record from the server.
   */
  ngScope.retrieveRecord = function()
  {
    // TODO: Don's stuff.  Revise as needed.
    // using random example files for now.
    /*var params = {};
    params.userId = ngScope.userId;
    var url = '';
    var request = etGlobals.http.createRequest(url, params);*/
    /*
    var response = {
      'id': 'samspeech',
      'text': ngScope.article
    };
    ngScope.articleRetrieved(response);
    */
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
