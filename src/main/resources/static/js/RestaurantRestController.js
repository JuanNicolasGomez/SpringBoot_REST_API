var RestControllerModule = (function () {

  var getOrders = function (callback) {
        axios.get('/orders')
        .then(function (response) {
        console.log("Orders obtained successfully");
        callback.onSuccess(response["data"]);
      })
      .catch(function (error) {
        if(callback != null){
            callback.onFailed(error);
        }else{
            console.log(error);
        }

      });
  };

  var updateOrder = function (order, callback) {
    // todo implement
  };

  var deleteOrder = function (orderId, callback) {
    // todo implement
    axios.delete('/orders', {
        id : orderId
    }).then(function (response) {
        callback.onSuccess();
    })
    .catch(function (error) {
        callback.onFailed(error);

    });
  };

  var createOrder = function (order, callback) {
    // todo implement
  };

  return {
    getOrders: getOrders,
    updateOrder: updateOrder,
    deleteOrder: deleteOrder,
    createOrder: createOrder
  };

})();