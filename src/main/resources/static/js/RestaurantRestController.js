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
    axios.put('/orders' + '/' + order.tableNumber,order
        ).then(function (response) {
            callback.onSuccess();
        })
        .catch(function (error) {
            callback.onFailed(error);

        });
      };

  var deleteOrder = function (orderId, callback) {
    axios.delete('/orders' + '/' + orderId,
    ).then(function (response) {
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