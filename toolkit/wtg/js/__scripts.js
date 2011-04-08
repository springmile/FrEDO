/*!
 * File:         scripts.css
 * Project:      project name
 * Version:      2.1
 * Last change:  09/08/10
 * Assigned to:  Diego Lago (dl)
 * Primary use:  Website
 *
 * Table of Contents
 *
 * - [ Global vars ] :                     declaration of global variables
 * - [ Cookies ] :                         createCookie(), readCookie(), eraseCookie();
 * - [ Style Switcher ] :                  fontSizeSwitcher(), contrastSwitcher();
 * - [ Load Accessibility Tools ] :        loadAccessibilityTools();
 * - [ jQuery on document ready ] :        call all "load" functions when document is ready
 */


/**
 * [ Global vars ]
 * declaration of global variables
 */
{
  var contrast, 
      fontSize,
      accessFeatures;
}

/**
 * Cookies
 * declaration of basic cookies functions
 * create, read and delete cookies (http://www.quirksmode.org/js/cookies.html)
 */
var createCookie = function(name,value,days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = '; expires='+date.toGMTString();
  }
  else var expires = '';
  document.cookie = name+'='+value+expires+'; path=/';
};

var readCookie = function(name) {
  var nameEQ = name + '=';
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
};

var eraseCookie = function(name) {
  createCookie(name,'',-1);
};

/**
 * Style Switcher
 * font size manipulation for user with visual disparities
 * it deletes body classes from the group and add the requested one
 */
var fontSizeSwitcher = function(styleRequested) {
  $('body').removeClass('font-small')
           .removeClass('font-medium')
           .removeClass('font-large')
           .addClass(styleRequested);
  return false;
};

var contrastSwitcher = function(styleRequested) {
  $('body').removeClass('contrast-reg')
           .removeClass('contrast-blue')
           .removeClass('contrast-soft')
           .removeClass('contrast-hi')
           .addClass(styleRequested);
  return false;
};

/**
 * Append Access Styles
 * add css styles for styles other than default
 */
var appendAccessStyles = function() {
  $('head').append('<link type="text/css" rel="stylesheet" href="../css/access.css" media="screen">');
};

/**
 * Load Accessibility Tools
 * add accessibility tools such text increase controls
 */
var loadAccessibilityTools = function() {
  
  // Add WAI ARIA landmark roles
  $('#branding').attr('role','banner');
  $('#search').attr('role','search');
  $('#content').attr('role','main');
  $('#highlights, #promo').attr('role','complementary');
  $('#footer').attr('role','contentinfo');
  $('#navigation, #breadcrumb, #support-navigation, #sub-navigation').attr('role','navigation');

  // Accessibility tools append
  $('#access-tools .mod-main').prepend('<div id="contrast"><h3>Text colour</h3><ul><li><a href="#" id="contrast-reg"><span class="hide">Regular display</span> <em>a</em></a></li><li><a href="#" id="contrast-blue"><span class="hide">Blue</span> <em>a</em></a></li><li><a href="#" id="contrast-soft"><span class="hide">Soft</span> <em>a</em></a></li><li><a href="#" id="contrast-hi"><span class="hide">High contrast</span> <em>a</em></a></li></ul></div>');
  $('#access-tools .mod-main').prepend('<div id="font-size"><h3>Text size</h3><ul><li><a href="#" id="font-small"><span class="hide">Small</span> <em>a</em></a></li><li><a href="#" id="font-medium"><span class="hide">Medium</span> <em>a</em></a></li><li><a href="#" id="font-large"><span class="hide">Large</span> <em>a</em></a></li></ul></div>');

  // Accessibility style switcher
  // read "accessFeatures" cookie to determine if access.css should be loaded
  accessFeatures = readCookie('accessFeatures');  
  if (accessFeatures === '1') { // cookie contains text only values
    appendAccessStyles();
  }

  // set "accessFeatures" cookie and load access.css the first time an option is clicked
  $('#font-size li a, #contrast li a').click(function(){
    appendAccessStyles();
    createCookie('accessFeatures',1,0);
  });
   
  // fonts size style switcher
  $('#font-size li a').click(function(){
    var style = $(this).attr('id');
    fontSizeSwitcher(style);
    eraseCookie('fontSize');
    createCookie('fontSize',style,0);
    fontSize = readCookie('fontSize');
  });
    
  // contrast size style switcher
  $('#contrast li a').click(function(){
    var style = $(this).attr('id');
    contrastSwitcher(style);
    eraseCookie('contrast');
    createCookie('contrast',style,0);
    contrast = readCookie('contrast');
  });

  // read cookies the first time a page loads
  fontSize = readCookie('fontSize');
  contrast = readCookie('contrast');
  
  // set styles 
  fontSizeSwitcher(fontSize);
  contrastSwitcher(contrast);
  
};
  
/**
 * jQuery on document ready 
 */
$(document).ready(function() {
  loadAccessibilityTools();
});