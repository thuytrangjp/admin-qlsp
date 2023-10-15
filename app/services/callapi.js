function CallApi() {
  this.fetchData = function () {
    var promise = axios({
      url: "https://652444deea560a22a4e9ac82.mockapi.io/Data",
      method: "GET",
    });

    return promise;
  };

  this.deleteProductById = function (id) {
    var promise = axios({
      url: `https://652444deea560a22a4e9ac82.mockapi.io/Data/${id}`,
      method: "DELETE",
    });

    return promise;
  };

  this.addProductApi = function (product) {
    var promise = axios({
      url: "https://652444deea560a22a4e9ac82.mockapi.io/Data",
      method: "POST",
      data: product,
    });

    return promise;
  };

  this.getProductById = function (id) {
    var promise = axios({
      url: `https://652444deea560a22a4e9ac82.mockapi.io/Data/${id}`,
      method: "GET",
    });

    return promise;
  };

  this.updateProductApi = function (product) {
    return axios({
      url: `https://652444deea560a22a4e9ac82.mockapi.io/Data/${product.id}`,
      method: "PUT",
      data: product,
    });
  };

}
