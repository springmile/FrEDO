
// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function(){
  log.history = log.history || [];   // store logs to an array for reference
  log.history.push(arguments);
  arguments.callee = arguments.callee.caller;  
  if(this.console) console.log( Array.prototype.slice.call(arguments) );
};
// make it safe to use console.log always
(function(b){function c(){}for(var d="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),a;a=d.pop();)b[a]=b[a]||c})(window.console=window.console||{});


// place any jQuery/helper plugins in here, instead of separate, slower script files.

// Plugin pattern
$.fn.pluginName = function() {
  if (!this.length) return this;

  $(this).each(function(){
    // plugin code starts
  });
  return this;
};

// originally from http://www.nomensa.com/blog/2010/accessible-forms-using-the-jquery-validation-plug-in/
// with minor changes
$.fn.accValidate = function(){
  if (!this.length) return this;

  $(this).each(function(){
    
    var form = $(this);
    
    //The jQuery validation plug-in in action              
    $(form).validate({
        
      //Optional, but for demo purpose we only want to validate on submitting the form
      onfocusout: false,
      onkeyup: false,
      onclick: false,
      
      //We are going to focus on the first link in the error list so i have disabled 
      //the input error focus option in jQuery Validation
      focusInvalid: false,
      
      //Set the element which will wraps the inline error messages
      errorElement: 'strong',
      
      //Location for the inline error messages
      //In this case we will place them in the associated label element
      errorPlacement: function(error, element) {
        error.appendTo($('label[for="' + $(element).attr('id') + '"]', form));
      },
      
      //Create our error summary that will appear before the form
      showErrors: function(errorMap, errorList) {
        if (submitted && errorList) {
                
          var $errorFormId = 'errors-' + form.attr('id');
          
          //Reset and remove error messages if the form 
          //has been validated once already
          var summary = '';
          $('label .error', form).remove();
          $('li.error').removeClass('error');
          
          //Create our container if one doesnt already exits
          //better than an empty div being in the HTML source
          if($('#' + $errorFormId).length === 0) {
            $('<div id="' + $errorFormId + '" class="fail"/>').insertBefore(form); 
          }
          
          //Generate our error summary list
          for (error in errorList) {
            //add class .error to parent li
            if ($(errorList[error].element).closest('fieldset').length) {
              $(errorList[error].element).closest('fieldset').closest('li').addClass('error');
            }
            else {
              $(errorList[error].element).closest('li').addClass('error');
            }
            
            //get associated label text to be used for the error summary
            var $errorLabel;
            if ($(errorList[error].element).closest('fieldset').length) {
              $errorLabel = $('label[for="' + $(errorList[error].element).attr('id') + '"]').closest('fieldset').find('legend').text();
            }
            else {
              $errorLabel = $('label[for="' + $(errorList[error].element).attr('id') + '"]').text();
            }
            summary += '<li><a href="#' + errorList[error].element.id + '">' + $errorLabel + ': ' + errorList[error].message + '</a></li>';
          }
          
          //Output our error summary and place it in the error container
          $('#' + $errorFormId).html('<h2>Errors found in the form</h2><p><em>Whoops!</em> - There is a problem with the form, please check and correct the following:</p><ul>' + summary + '</ul>');
          
          //Focus on first error link in the error container 
          //Alternatively, you might want to use the Validation default option (focusInvalid)
          $('#' + $errorFormId + ' a:eq(0)').focus();
          
          //Move the focus to the associated input when error message link is triggered
          //a simple href anchor link doesnt seem to place focus inside the input
          $('#' + $errorFormId + ' a').click(function() {
            $($(this).attr('href')).focus();
            return false;
          });
        }
        this.defaultShowErrors();
          submitted = false;
      },                    
      invalidHandler: function(form, validator){
        submitted = true;
      }
    });     
  
  });
  return this;             
};