var products = [];
if (JSON.parse(localStorage.getItem('storage')) == null) {
    localStorage.setItem('storage', JSON.stringify(products));
} else {
    products = JSON.parse(localStorage.getItem('storage'));
}
var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});
function formatPrice($this) {
    let value = formatter.format($this.value);
    $this.value = value;   
}
function del($this) {
    $this.value = "";
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
    p = p.replace(/,/gi, "");
    return p;
}
function genID() {
    ids = [];
    if (products.length == 0) {
        let id = 1;
        return id;
    }
    for (let i = 0; i < products.length; i++){
        ids.push(products[i].id);
    }
    ids.sort();
    var bigestID = ids[ids.length - 1];
    return ++bigestID;
}
function formatPath(img) {
    img = img.value;
    let img_path = img.replace(/C:/g, "");
    img_path = img_path.replace(/\\/g, "");
    img_path = img_path.replace(/fakepath/g, "img/");
    let name_append = document.getElementById("name-img");
    name_append.innerHTML = "File Name: " + img_path;
    return img_path;
}
var inputs = document.getElementsByTagName('input')
function createProduct() {
    let id = genID();
    let img_path = formatPath(inputs.product_img);
    var arr = {
        'id': id,
        'product_name': inputs.product_name.value,
        'product_img': img_path,
        'price':inputs.price.value,
        'quantity': inputs.quantity.value
    };
    products.push(arr);
    localStorage.setItem('storage', JSON.stringify(products));
}
