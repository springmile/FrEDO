/**
 * File:         behaviour.css
 * Project:      Project name
 * Version:      1.0
 * Last change:  26/09/09
 * Assigned to:  Diego Lago (dl)
 * Primary use:  Website
 *
 */

/**
 * Global vars
 */
var contrast, 
    fontSize;

/**
 * Cookies
 *
 * Create, read and delete cookies (http://www.quirksmode.org/js/cookies.html)
 */
function createCookie(name,value,days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
  }
  else var expires = "";
  document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

function eraseCookie(name) {
  createCookie(name,"",-1);
}

/**
 * Style Switcher
 *
 * It deletes body classes from the group and add the requested one
 */
var fontSizeSwitcher = function(styleRequested) {
  $('body').removeClass('font-small')
           .removeClass('font-medium')
           .removeClass('font-large')
           .addClass(styleRequested);
  return false;
}
var contrastSwitcher = function(styleRequested) {
  $('body').removeClass('contrast-reg')
           .removeClass('contrast-blue')
           .removeClass('contrast-soft')
           .removeClass('contrast-hi')
           .addClass(styleRequested);
  return false;
}

/**
 * jQuery on document ready 
 */
$(document).ready(function() {

/**
 * Add WAI ARIA landmark roles
 */
  $('#branding').attr('role','banner');
  $('#search').attr('role','search');
  $('#content').attr('role','main');
  $('#highlights, #promo').attr('role','complementary');
  $('#footer').attr('role','contentinfo');
  $('#navigation, #breadcrumb, #support-navigation, #sub-navigation').attr('role','navigation');

/**
 * Accessibility tools append
 */
  $('#access-tools').append('<div id="font-size"><h3>Text size</h3><ul><li><a href="#" id="font-small"><span class="hide">Small</span> <em>a</em></a></li><li><a href="#" id="font-medium"><span class="hide">Medium</span> <em>a</em></a></li><li><a href="#" id="font-large"><span class="hide">Large</span> <em>a</em></a></li></ul></div>');
  $('#access-tools').append('<div id="contrast"><h3>Text colour</h3><ul><li><a href="#" id="contrast-reg"><span class="hide">Regular display</span> <em>a</em></a></li><li><a href="#" id="contrast-blue"><span class="hide">Blue</span> <em>a</em></a></li><li><a href="#" id="contrast-soft"><span class="hide">Soft</span> <em>a</em></a></li><li><a href="#" id="contrast-hi"><span class="hide">High contrast</span> <em>a</em></a></li></ul></div>');

/**
 * Accessibility style switcher
 */
  $('#font-size li a').click(function(){
    var style = $(this).attr('id');
    fontSizeSwitcher(style);
    eraseCookie('fontSize');
    createCookie('fontSize',style,0);
    fontSize = readCookie('fontSize');
  });
  
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
  
/**
 * Search form UI enhancement
 */
  var searchLabel = $('#search-form label').text();
  $('#search-input').addClass('placeholder').val(searchLabel).focus(function(){
    if (this.value === searchLabel) {
      $(this).removeClass('placeholder').val('');
    };
  }).blur(function(){
    if (this.value === '') {
      $(this).addClass('placeholder').val(searchLabel);
    }
  });
  /* don't submit placeholder text */
  $('#search-form').submit (function(){
    if ($('#search-input').val() == searchLabel) {
      $('#search-input').val('');
    }
  });
  
});