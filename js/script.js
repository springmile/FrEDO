/*!
 * File:         script.css
 * Project:      project name
 * Version:      1.0
 * Last change:  00/00/00
 * Assigned to:  Diego Lago (dl)
 * Primary use:  Website
 */
 
// Garber-Irish DOM-ready execution
// http://www.viget.com/inspire/extending-paul-irishs-comprehensive-dom-ready-execution/
PROJECT = {
  common: {
    init: function() {
      // application-wide code
    }
  }/*,

  users: {
    init: function() {
      // controller-wide code
    },

    show: function() {
      // action-specific code
    }
  }*/
};

UTIL = {
  exec: function(controller, action) {
    var ns = PROJECT,
        action = ( action === undefined ) ? 'init' : action;

    if (controller !== '' && ns[controller] && typeof ns[controller][action] == 'function') {
      ns[controller][action]();
    }
  },

  init: function() {
    var body = document.body,
        controller = body.getAttribute('data-controller'),
        action = body.getAttribute('data-action');

    UTIL.exec('common');
    UTIL.exec(controller);
    UTIL.exec(controller, action);
  }
};

$(document).ready(UTIL.init);