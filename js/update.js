var id = localStorage.getItem('id');
var products = JSON.parse(localStorage.getItem('storage'));
var arrForm = [];
function loadForm() {
    let html = '';
    document.getElementById("form-update").innerHTML = html;
    for (k = 0; k < products.length; k++) {
        if (products[k].id == id) {
            html = `
          <input class="input-group" id="id" value="${products[k].id}" type="hidden">
          <label for="name">Product Name</label>
          <input class="input-group" id="name" placeholder="Enter product name" value="${products[k].product_name}" type="text">
          <label for="img">Product Image</label>
          <input class="input-group" value="${products[k].product_img}" id="img" required onchange="formatPath(this)"  type="file">
          <span class="file-name" id="name-img">File name: ${products[k].product_img}</span>
          <label for="price">Price</label>
          <input class="input-group" id="price" onclick="del(this)" onblur="formatPrice(this)" placeholder="$100,000.00" value="${products[k].price}" type="text">
          <label for="quantity">Quantity</label>
          <input class="input-group" id="quantity" placeholder="Enter quantity" value="${products[k].quantity}" type="number">
          <a href="/list-product.html" class="btn btn-update" onclick="updateProduct()">Update</a>
          `;
            break;
      }
  }
  document.getElementById("form-update").innerHTML = html;
}
loadForm();
var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});
function formatPrice($this) {
    let value = formatter.format($this.value);
    $this.value = value;   
}
function unFomartPrice(value) {
    var p = value.replace("$", "");
    for (let k = 0; k < p.length; k++){
        if (p[k] == '.') {
            if (p.substring(k, p.length).match(/00/)) {
                p = p.substring(0, k);
            }
            break;
        }
    }
    const regex =/,/i
     p = p.replace(regex, "");
    return p;
}
function del($this) {
    $this.value = "";
}
function formatPath($this) {
    let img = $this.value;
    var img_path = img.replace(/C:/g, "");
    img_path = img_path.replace(/\\/g, "");
    img_path = img_path.replace(/fakepath/g, "img/");
    let name_append = document.getElementById("name-img");
    name_append.innerHTML = "File Name: " + img_path;
    return img_path;
}
function updateProduct(e) {
    let id = document.getElementById('id').value;
    let product_name = document.getElementById('name').value;
    let product_img = document.getElementById('name-img').textContent;
    let price = document.getElementById('price').value;
    let quantity = document.getElementById('quantity').value;
    product_img = product_img.replace('File name: ', '');
    var arrUpdate = [
        {
            'id': id,
            'product_name' : product_name,
            'product_img' : product_img,
            'price' : price,
            'quantity': quantity,
        }
    ]
    for (let i = 0; i < products.length; i++){
        if (products[i].id == arrUpdate[0].id) {
            products.splice(i, 1);
            products.push(arrUpdate[0]);
            localStorage.setItem('storage', JSON.stringify(products));
            break;
        }
    }
}
