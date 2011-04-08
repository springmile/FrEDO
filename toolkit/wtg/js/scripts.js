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
 * - [ Camelise Strings ] :                $.fn.cameliseString();
 * - [ Cookies Object ] :                  createCookie(), readCookie(), eraseCookie();
 * - [ Style Switcher Object ] :           fontSizeSwitcher(), contrastSwitcher();
 * - [ Load Accessibility Tools ] :        loadAccessibilityTools();
 * - [ jQuery on document ready ] :        call all "load" functions when document is ready
 */

/**
 * Camelise Strings
 * Takes the text node in an element and 
 * changes it to camel based notation
 */
$.fn.cameliseString = function() {
  var words = $(this).text().split('-'),
      length = words.length,
      i = 0,
      camelStr = '';
  
  // loop through split array and set to uppercase the first char of each item
  for (i = 0; i < length; i++) {
    if (i > 0) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    camelStr = camelStr + words[i];
  }
  return camelStr;
};


/**
 * Cookie Object
 * declaration of basic cookies functions
 * create, read and delete cookies (http://www.quirksmode.org/js/cookies.html)
 */
var Cookie = {
  createCookie : function(name,value,days) {
    if (days) {
      var date = new Date();
      date.setTime(date.getTime()+(days*24*60*60*1000));
      var expires = '; expires='+date.toGMTString();
    }
    else var expires = '';
    document.cookie = name+'='+value+expires+'; path=/';
  },

  readCookie : function(name) {
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  },

  eraseCookie : function(name) {
    this.createCookie(name,'',-1);
  }
};

/**
 * Style Switcher Object
 * font size manipulation for user with visual disparities
 * it deletes body classes from the group and add the requested one
 */
var StyleSwitcher = {
  fontSizeSwitcher : function(styleRequested) {
    $('body').removeClass('font-small font-medium font-large').addClass(styleRequested);
    return false;
  },

  contrastSwitcher : function(styleRequested) {
    $('body').removeClass('contrast-reg contrast-blue contrast-soft contrast-hi').addClass(styleRequested);
    return false;
  }
}

/**
 * Append Access Styles
 * add css styles for styles other than default
 */
var appendAccessStyles = function() {
  $('head').append('<link type="text/css" rel="stylesheet" href="../css/access.css" media="screen">');
};

/**
 * Style Cookie Management
 * handles the reading and writting of styles cookies
 */
var styleCookieMngt = function(name, value) {
  var $e = $('#' + name);

  // read cookie the first time a page loads
  value = Cookie.readCookie(name);

  // set styles based on cookie value
  if (name === 'contrast') {
    StyleSwitcher.contrastSwitcher(value);
  }
  else {
    StyleSwitcher.fontSizeSwitcher(value);
  }

  // switch style on click and remember setting in cookie
  $e.find('li a').click(function(){
    var newValue = $(this).attr('id');
    
    // set styles based on new selected style
    if (name === 'contrast') {
      StyleSwitcher.contrastSwitcher(newValue);
    }
    else {
      StyleSwitcher.fontSizeSwitcher(newValue);
    }

    // update cookie
    Cookie.eraseCookie('' + name + '');
    Cookie.createCookie('' + name + '', newValue, 0);
  });
};

/**
 * Accessibility style switcher
 * load extra stylesheet for other colour shemes and font sizes
 */
var extraAccessStyles = function() {
  // read "accessFeatures" cookie to determine if access.css should be loaded
  accessFeatures = Cookie.readCookie('accessFeatures');  
  if (accessFeatures === '1') { // cookie contains text only values
    appendAccessStyles();
  }

  // set "accessFeatures" cookie and load access.css the first time an option is clicked
  $('#font-size li a, #contrast li a').one('click', function(event) {
    appendAccessStyles();
    Cookie.createCookie('accessFeatures',1,0);
  });
};

/**
 * Load Accessibility Tools
 * add accessibility tools such text increase controls
 */
var loadAccessibilityTools = function() {
  var contrast, 
      fontSize,
      accessFeatures;
      
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

  // load extra stylesheet for other colour shemes and font sizes
  extraAccessStyles();
   
  // set and/or read "styles" cookies
  styleCookieMngt('font-size', fontSize);
  styleCookieMngt('contrast', contrast);
};
  
/**
 * jQuery on document ready 
 */
$(document).ready(function() {
  loadAccessibilityTools();
  
});