( function( $ ) {
  var RemoteValidation = {
    defaults: {
      messageContainer : '#error_messages',
      messageHtml : "<div id='error_explanation'><h2>{{NUM_ERRORS}} errors prohibited this post from being saved:</h2>{{ERRORS}}</div>",
      noErrorClass: 'field',
      errorClass : 'field_with_errors'
    },
    showErrors: function(form, settings, errors) {
      var errorList ="";
      var formFor = form.attr('id').replace(/new_/,"");
      var numErrors = 0;
      for (var col in errors) {
        for (var i in errors[col]) {
          errorList += "<li> "+col+" "+errors[col][i]+"</li>";
          $("*[name='"+formFor+"["+col+"]']", form).wrap($("<div/>").addClass(settings.errorClass));
          $("label[for='"+formFor+"_"+col+"']", form).wrap($("<div/>").addClass(settings.errorClass));
          numErrors++;
        }
      }
      var errorHtml = settings.messageHtml.replace("{{NUM_ERRORS}}", numErrors);
      errorHtml = errorHtml.replace("{{ERRORS}}","<ul>"+errorList+"</ul>");
      $(settings.messageContainer).append(errorHtml);
    }
  };
  $.fn.remoteValidation = function(options) {
    var settings = $.extend( RemoteValidation.defaults, options);
    return this.each( function() {
      var $this = $(this); //$(this), may change inside function, so assign it to $this.
      $this.on('ajax:beforeSend', function(evt,xhr) {
        $(settings.messageContainer).empty();
        $("."+settings.errorClass, $this).children().unwrap();
      }).on('ajax:success', function(evt,data,status,xhr) {
      }).on('ajax:error', function(evt, xhr, status, error) {
      }).on('ajax:complete', function(evt, xhr, status){
        var data = JSON.parse(xhr.responseText);
        if (data.errors) {
          RemoteValidation.showErrors($this, settings, data.errors);
        } else if (data.location) {
          window.location.href = data.location;
        }
      });
    });
  };
})(jQuery);
