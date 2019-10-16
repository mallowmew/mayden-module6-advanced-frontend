// get your html template - in this case it's inside <script> tags in the main file
var source = document.getElementById('entry-template').innerHTML;

// use handlebars to 'compile' it into a function it can understand
var template = Handlebars.compile(source);

var data = {
  title: 'My New Post',
  body: 'This is my first post!'
}

// feed the data object(s) into that function to get HTML
var result = template(data)

// squish the HTML into the target element on the page
document.getElementById('target').innerHTML += result;

