# remoteValidation
JQuery Plugin for remote form validation to show errors and highlight errors without refreshing page.

## Usage

1. Download remote_validation.js into your public/javascripts
2. Add script tag for your view
    
        <script type="text/javascript" src="javascripts/remote_validation.js"></script>

3. Change your form tag by adding remote as true and format as json
    
        <%= form_for @post, :remote => true, :format=>:json, :html=> {:multipart => true}  do |f| %>
          <div id="error_messages"></div>
            ...
        <% end %>

4. Modifiy your controller to respond to json type. In example,

        # POST /posts
        # POST /posts.json
        def create
          @post = Post.new(params[:post])    
    
          respond_to do |format|
            if @post.save
              format.html { redirect_to @post }
              format.json { render json: {:location=> url_for(@post)} , status: 302 }
            else
              format.html { render action: "new" }
              format.json { render json: {:errors => @post.errors}, status: 422 }
            end
          end
        end


5. Finally, apply jquery plugin to your form

        $( function() {
          $("form[data-remote='true']").remoteValidation();
        });

## Options
    
If you may want to pass your own options for remote form valiation, you can pass options as;

    var options= {
      messageContainer : '#error_messages',
      messageHtml : "<div id='error_explanation'><h2>{{NUM_ERRORS}} errors prohibited this post from being saved:</h2>{{ERRORS}}</div>",
      noErrorClass: 'field',
      errorClass : 'field_with_errors'
    };
    $("form[data-remote='true']").remoteValidation(options);

### options

#### messageContainer: 
  JQuery expression of selector that shows errors after error validation
  example : ".error_messages", "div#errros", etc

#### messageHtml : 
  htmls to be filled in to message container
  {{NUM_ERRORS}} : will be replaced with number of errors
  {{ERRORS}} : will be replaced with list of errors
 
#### errorClass :
  will wrap the field of errors with div set by this class name

#### noErrorClass : 
  this does not affect any at this time.

## Copyright

MIT License
