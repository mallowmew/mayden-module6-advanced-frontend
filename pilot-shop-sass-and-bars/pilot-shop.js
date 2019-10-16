Handlebars.registerHelper('ifSale', function(v1, v2, options) {
  if (v1 < v2) {
    return options.fn(this)
  }
  return options.inverse(this)
})

function loadJSON(callback) {
  let request = new XMLHttpRequest()
  request.overrideMimeType("application/json")
  request.open('POST', 'products.json', true)
  request.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      callback(request.responseText)
    }
  }
  request.send(null)
}

loadJSON( function(response) {
  let data = JSON.parse(response)
  let source = document.getElementById('product-template').innerHTML;
  let template = Handlebars.compile(source);

  data.products.forEach(product => {
    result = template(product)
    document.querySelector('.product-container').innerHTML += result;
  });
})