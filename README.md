# remoteValidation
JQuery Plugin for remote form validation to show errors and highlight errors without refreshing page.

## Usage

1. Download remote_validation.js into your public/javascripts

2. Add script tag for your view
    
        <script type="text/javascript" src="javascripts/remote_validation.js"></script>

3. add error section into your form tag. i.e. error_messages
    
        <%= form_for @post do |f| %>
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
      errorClass : 'field_with_errors',
      beforeSend: beforeSend: function(xhr) { console.log("sending request",xhr) },
      success: function(data, status, xhr) { console.log("received response", data, status, xhr) },
      error: function(xhr, status, error) { console.log("received error", xhr, status, error) },
      complete: function(xhr, status) { console.log("complete ", xhr, status) },
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

#### beforeSend : 
  callback function for before ajax call is made

#### success : 
  callback function when validation has successful response(i.e, 200)

#### error : 
  callback function when validation has error response(i.e. 422)

#### complete : 
  callback function when ajax call is finished.

## Example
  To run this example application

    1. $ git clone https://github.com/bighostkim/remoteValidation.git
    2. $ cd remoteValidation/example
    3. $ bundle install
    4. $ rails server

    open url, http://localhost:3000/blogs/new

  For the exact implementation of this in example, please check the following files

    1. app/controllers/blogs_controller.rb
    2. app/views/blogs/_form.rb

## Copyright

MIT License
