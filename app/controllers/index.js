var api = new CallApi();

function getEle(id) {
  return document.getElementById(id);
}

function getListProduct() {
  var promise = api.fetchData();

  promise
    .then(function (result) {
      renderUI(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

// Show data ở Product List
getListProduct();

function renderUI(data) {
  var content = "";

  for (var i = 0; i < data.length; i++) {
    var product = data[i];
    content += `
        <tr>
            <td>${i + 1}</td>
            <td>${product.name}</td>
            <td class="text-right">${new Intl.NumberFormat("en-IN").format(product.price)}</td>
            <td>${product.screen}</td>
            <td>${product.frontCamera}</td>
            <td>${product.backCamera}</td>
            <td>
                <img width="50" src="./app/img/${product.img}" />
            </td>
            <td>${product.type}</td>
            <td>${product.desc}</td>
            <td>
                <div class="d-flex">
                    <button style="cursor: pointer;" class="btn btn-info mr-3" data-toggle="modal" 
                    data-target="#myModal" onclick="editProduct(${product.id
      })">Edit</button>
                    <button style="cursor: pointer;" class="btn btn-danger" onclick="deleteProduct(${product.id
      })">Delete</button>
                </div>   
            </td>
        </tr>
    `;
  }

  getEle("tblDanhSachSP").innerHTML = content;
  getEle("SapXepTang").onclick = function () {
    filterByPrice(data, "tang")
  };
  getEle("SapXepGiam").onclick = function () {
    filterByPrice(data, "giam")
  };
}

// Xóa data ở Product List
function deleteProduct(id) {
  var promise = api.deleteProductById(id);

  promise
    .then(function (result) {
      //xoá thành công => render lại giao diện
      getListProduct();
    })
    .catch(function (error) {
      console.log(error);
    });
}

function callDataProductInput(id = "") {
  var tenSP = getEle("tenSP").value;
  var giaSP = getEle("giaSP").value;
  var screen = getEle("screen").value;
  var frontCamera = getEle("frontCamera").value;
  var backCamera = getEle("backCamera").value;
  var hinhSP = getEle("hinhSP").value;
  var type = getEle("type").value;
  var moTa = getEle("moTa").value;

  //Check Validate
  //Check field bắt buộc, min - max (nếu cần), kiểm tra số (nếu cần)
  var isValid = true;
  isValid &= kiemTraRong(tenSP, 'spanTenSP', 'Đây là field bắt buộc') &&
    kiemTraDoDaiKyTu(tenSP, "", 100, 'spanTenSP', 'Vui lòng nhập từ 1 đến 100 ký tự') &&
    kiemTraSo(giaSP, 'spanGiaSP', 'Vui lòng nhập số');
  isValid &= kiemTraRong(giaSP, 'spanGiaSP', 'Đây là field bắt buộc') &&
    kiemTraDoDaiKyTu(giaSP, "", 10, 'spanGiaSP', 'Vui lòng nhập từ 1 đến 10 ký tự');
  isValid &= kiemTraRong(screen, 'spanScreen', 'Đây là field bắt buộc') &&
    kiemTraDoDaiKyTu(screen, "", 100, 'spanScreen', 'Vui lòng nhập từ 1 đến 200 ký tự');
  isValid &= kiemTraRong(frontCamera, 'spanFrontCamera', 'Đây là field bắt buộc') &&
    kiemTraDoDaiKyTu(frontCamera, "", 100, 'spanFrontCamera', 'Vui lòng nhập từ 1 đến 200 ký tự');
  isValid &= kiemTraRong(backCamera, 'spanBackCamera', 'Đây là field bắt buộc') &&
    kiemTraDoDaiKyTu(backCamera, "", 100, 'spanBackCamera', 'Vui lòng nhập từ 1 đến 200 ký tự');
  isValid &= kiemTraRong(hinhSP, 'spanHinhSP', 'Đây là field bắt buộc') &&
    kiemTraDoDaiKyTu(hinhSP, "", 100, 'spanHinhSP', 'Vui lòng nhập từ 1 đến 200 ký tự');
  isValid &= kiemTraRong(type, 'spanType', 'Đây là field bắt buộc');
  isValid &= kiemTraRong(moTa, 'spanMoTa', 'Đây là field bắt buộc') &&
    kiemTraDoDaiKyTu(moTa, "", 100, 'spanMoTa', 'Vui lòng nhập từ 1 đến 200 ký tự');

  console.log(isValid);
  if (isValid === 0) {
    return null;
  }
  else {
    return new Product(id, tenSP, giaSP, screen, frontCamera, backCamera, hinhSP, type, moTa);
  }
}

//Chỉnh UI Modal Add Product
getEle("btnThemSP").onclick = function () {
  //sửa lại tiêu đề cho modal
  document.getElementsByClassName("modal-title")[0].innerHTML = "Add Product";

  //tạo nút "Add" => gắn vào footer của modal
  var btnAdd = `<button style="cursor: pointer;" class="btn btn-success" onclick="addProduct()">Add</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = btnAdd;
};

//Add Product
function addProduct() {
  var product = callDataProductInput();
  if (!product) {
    return null;
  }
  var promise = api.addProductApi(product);

  promise
    .then(function (result) {
      alert(`Thêm sản phẩm thành công`);
      //close modal
      document.getElementsByClassName("close")[0].click();
      //Add thành công => render lại giao diện
      getListProduct();
      //Xóa đi dữ liệu đang hiển thị khỏi modal, để hiện rỗng ở lần Add tiếp theo
      getEle("tenSP").value = "";
      getEle("giaSP").value = "";
      getEle("screen").value = "";
      getEle("frontCamera").value = "";
      getEle("backCamera").value = "";
      getEle("hinhSP").value = "";
      getEle("type").value = "";
      getEle("moTa").value = "";
    })
    .catch(function (err) {
      console.log(err);
    });
}

//Lấy thông tin Product
//Chỉnh UI Modal Edit Product
function editProduct(id) {
  //sửa lại tiêu đề cho modal
  document.getElementsByClassName("modal-title")[0].innerHTML = "Edit Product";

  //tạo nút "Update" => gắn vào footer của modal
  var btnUpdate = `<button style="cursor: pointer;" class="btn btn-success" onclick="updateProduct(${id})">Update</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = btnUpdate;

  //lấy thông tin chi tiết của product dựa vào id
  var promise = api.getProductById(id);

  promise
    .then(function (result) {
      var product = result.data;
      //show data ra ngoài các thẻ input
      getEle("tenSP").value = product.name;
      getEle("giaSP").value = product.price;
      getEle("screen").value = product.screen;
      getEle("frontCamera").value = product.frontCamera;
      getEle("backCamera").value = product.backCamera;
      getEle("hinhSP").value = product.img;
      getEle("type").value = product.type;
      getEle("moTa").value = product.desc;
    })
    .catch(function (error) {
      console.log(error);
    });
}


//Update Product
function updateProduct(id) {
  var product = callDataProductInput(id);
  if (!product) {
    return null;
  }
  api
    .updateProductApi(product)
    .then(function () {
      alert(`Cập nhật thông tin sản phẩm thành công`);
      //close modal
      document.getElementsByClassName("close")[0].click();
      getListProduct();
      //Xóa đi dữ liệu đang hiển thị khỏi modal, để hiện rỗng ở lần Add tiếp theo
      getEle("tenSP").value = "";
      getEle("giaSP").value = "";
      getEle("screen").value = "";
      getEle("frontCamera").value = "";
      getEle("backCamera").value = "";
      getEle("hinhSP").value = "";
      getEle("type").value = "";
      getEle("moTa").value = "";
    })
    .catch(function (error) {
      console.log(error);
    });
}

// ----------------

function findStaffByName() {
  //lấy thông tin chi tiết của product dựa vào name
  var targetName = getEle("searchName").value.toLowerCase();
  var promise = api.fetchData();
  promise
    .then(function (result) {
      var products = result.data;
      var filterProducts = [];
      for (var i = 0; i < products.length; i++) {
        var productName = products[i].name.toLowerCase();
        if (productName.indexOf(targetName) >= 0) {
          filterProducts.push(products[i])
        }
      }
      renderUI(filterProducts);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function filterByPrice(data, order) {
  if (order.indexOf("tang")) {
    // Hoán vị để có dãy list sản phẩm tăng dần theo giá
    for (var i = 0; i < data.length - 1; i++) {
      for (var j = i + 1; j < data.length; j++) {
        if (Number(data[i].price) < Number(data[j].price)) {
          var temp = data[i];
          data[i] = data[j];
          data[j] = temp;
        }
      }
    }
  } else if (order.indexOf("giam")) {
    // Hoán vị để có dãy list sản phẩm giảm dần theo giá
    for (var i = 0; i < data.length - 1; i++) {
      for (var j = i + 1; j < data.length; j++) {
        if (Number(data[i].price) > Number(data[j].price)) {
          var temp = data[i];
          data[i] = data[j];
          data[j] = temp;
        }
      }
    }
  }

  return renderUI(data);
}
