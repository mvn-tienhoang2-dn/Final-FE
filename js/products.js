var products = [];
function save() {
    localStorage.setItem('storage', JSON.stringify(products));
}
function getProducts(){
    products = JSON.parse(localStorage.getItem('storage'));
}
if (localStorage.getItem("storage") != null) {
    getProducts();
}
  
function loadData(data) {
    var html = '';
    document.getElementById("load-data").innerHTML = html;
  for (k = 0; k < data.length; k++) {
    html += '<tr>' +
        ' <td id="' + data[k].id + '">' + (k + 1) + '</td>' +
        '<td>' + data[k].product_name + '</td>' +
        ' <td> <img class="p_img" src ="' + data[k].product_img + '" alt="product_img"></td>' +
        '<td data-id="' + data[k].id + '">' + data[k].price + '</td>' +
        '<td>' + data[k].quantity + '</td>' +
        ' <td class="row">' +
        '<a  class="btn btn-delete" data-id="' + data[k].id + '" onclick="removeProduct(this)">Delete</a>' +
        '<a href="/edit.html" name="edit" class="btn btn-edit" data-id="' + data[k].id + '" >Edit</a>' +
        '</td > '+
        '</tr>';
  }
  document.getElementById("load-data").innerHTML = html;
}
loadData(products);
function search(content) {
    if (content == "") loadData(products)
    else {
        var search = new RegExp(content, 'gi') 
        findedProduct = [];
        for (let i = 0; i < products.length; i++){
            if (products[i].product_name.match(search)) {
                findedProduct.push(products[i]);
            }
        }
        loadData(findedProduct);
    }
}
function removeProduct($this) {
    var id = parseInt($this.getAttribute('data-id')); 
    for (j = 0; j < products.length; j++){
        if (products[j].id == id) {
            if (confirm('Do you want to delete this product ?')) {
                products.splice(j, 1);
                save();
                loadData(products);
            }
      }
    }
}
var editBtn = document.getElementsByName('edit');
editBtn.forEach(item => {
    item.addEventListener('click', function() {
        let id = parseInt(this.getAttribute('data-id'));
        localStorage.setItem('id', JSON.stringify(id));
    })
})