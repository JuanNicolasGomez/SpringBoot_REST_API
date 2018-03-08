
var OrdersControllerModule = (function () {

  var showOrdersByTable = function () {

    var callback = {

        onSuccess: function(ordersList){
            //console.log(ordersList);
            var body = document.getElementById('orders');
            body.innerHTML = "";
            for (var i = 0; i<ordersList.length;i++){
             showOrder(ordersList[i]);
            }

            },
        onFailed: function(exception){
            //console.log(exception);
            var body = document.getElementById('orders');
            body.innerHTML = "There is a problem with our servers. We apologize for the inconvenience, please try again later";
        }
    }
    RestControllerModule.getOrders(callback);
  };

  var updateOrder = function () {
    console.log(currentOrderId);
    var name = document.getElementById("itemInput").value;
    var quantity = document.getElementById("quantityInput").value;
    if(name != "" && quantity != ""){
        addItemToOrder(currentOrderId,name,quantity);
    }
  };

  var deleteOrderItem = function (itemName) {
    var callback = {
        onSuccess: function(){
            console.log("Item deleted successfully");
            getOrders();
            showOrderToUpdateById(currentOrderId);
            },
        onFailed: function(exception){
            //console.log(exception);
            console.log("Couldn't delete item, please try again later");
        }
    };
    var order;
    for (var o in mockedList){
      if(mockedList[o].tableNumber == currentOrderId){
              order = mockedList[o];
          }
      }
    delete order.orderAmountsMap[itemName];
    console.log("order whit deleted item:")
    console.log(order);
    RestControllerModule.updateOrder (order, callback);
  };

  var deleteItem = function(num){
    deleteOrderItem(document.getElementById("itname" + num).value);
  }

  var addItemToOrder = function (orderId, item, quantity) {

    var callback = {
        onSuccess: function(){
            console.log("Item added successfully");
            getOrders();
            showOrderToUpdateById(currentOrderId);
            },
        onFailed: function(exception){
            //console.log(exception);
            console.log(currentOrderId);
            console.log("There was a problem adding the item, please try again later");
        }
    };
    var order;
    for (var o in mockedList){
      if(mockedList[o].tableNumber == orderId){
              order = mockedList[o];
          }
      }
    if (order == null){
        order = {"orderAmountsMap":{}, "tableNumber": orderId};
    }
    order.orderAmountsMap[item] = parseInt(quantity);
    console.log("Adding item: "+item +" to order:  " + order.tableNumber + "...")
    RestControllerModule.updateOrder (order, callback);
  };

  var getOrders = function () {

      var callback = {

          onSuccess: function(ordersList){
              mockedList = ordersList;
              },
          onFailed: function(exception){
              //console.log(exception);
              var body = document.getElementById('orders');
              body.innerHTML = "There is a problem with our servers. We apologize for the inconvenience, please try again later";
          }
      }
      RestControllerModule.getOrders(callback);
    };

   var selectTableFunction = function() {
       var selectBox = document.getElementById("selectBox");
       currentOrderId = selectBox.selectedIndex;
       showOrderToUpdateById(selectBox.selectedIndex);
   };

  return {
    showOrdersByTable: showOrdersByTable,
    updateOrder: updateOrder,
    deleteOrderItem: deleteOrderItem,
    addItemToOrder: addItemToOrder,
    getOrders: getOrders,
    selectTableFunction: selectTableFunction,
    deleteItem: deleteItem
  };

})();
var mockedList ;
//= [{"orderAmountsMap":{"PIZZA":3,"HOTDOG":1,"COKE":4},"tableNumber":1},{"orderAmountsMap":{"HAMBURGER":2,"COKE":2},"tableNumber":3}];
var currentOrderId = 0;

function showOrder( order) {
    var body = document.getElementById('orders');
	var p1 = document.createElement('div');
	p1.id = order['tableNumber'];
	p1.textContent = 'Table ' + order['tableNumber'];
	body.appendChild(p1);
    var tbl = document.createElement('table');
	tbl.className = 'table table-dark'
	var thd = document.createElement('thead');
	var tr1 = document.createElement('tr');
	var th1 = document.createElement('th');
	var th2 = document.createElement('th');
	var th3 = document.createElement('th');
	//var th4 = document.createElement('th');
	th1.setAttribute('scope', 'col');
	th1.textContent = '#';
	thd.appendChild(th1);
	th2.setAttribute('scope', 'col');
	th2.textContent = 'Product';
	thd.appendChild(th2);
	th3.setAttribute('scope', 'col');
	th3.textContent = 'Quantity';
	thd.appendChild(th3);
	//th4.setAttribute('scope', 'col');
	//th4.textContent = 'Price';
	//thd.appendChild(th4);
    var tbdy = document.createElement('tbody');
	var prd = order.orderAmountsMap;
	var i= 0;
    for (var key in prd) {
		//console.log(i);

        var tr = document.createElement('tr');
		var th = document.createElement('th');
		th.setAttribute('scope', 'row');
		th.textContent = i+1;
		tr.appendChild(th);
        for (var j = 0; j < 2; j++) {
			var td = document.createElement('td');
			if(j == 0){

				td.appendChild(document.createTextNode(key));
			}else if(j ==1){
				td.appendChild(document.createTextNode(prd[key]));
			}

			tr.appendChild(td);
        }
		i++;
        tbdy.appendChild(tr);
    }
    tbl.appendChild(tbdy);
	
    tbl.appendChild(thd);
    p1.appendChild(tbl);
}


function showOrderToUpdateById( id){
    var body = document.getElementById('items');
    body.innerHTML = "";
    var order;
    for (var o in mockedList){
        if(mockedList[o].tableNumber == id){
            order = mockedList[o];
        }
    }
    if(order == null){
        body.innerHTML = "This table doesn't have any orders.";
    }else{
        var prd = order.orderAmountsMap;
        var n = 0;
        for (var key in prd){
            n+=1;
            var it = document.createElement('div');
            body.appendChild(it);
            var rw = document.createElement('div');
            rw.className = "row";
            it.appendChild(rw);
            var col1 = document.createElement('div');
            col1.className = "col-3 mb-3";
            var col2 = document.createElement('div');
            col2.className = "col-3 mb-3";
            var col3 = document.createElement('div');
            col3.className = "col-2 mb-2";
            var col4 = document.createElement('div');
            col4.className = "col-2 mb-2";
            rw.appendChild(col1);
            rw.appendChild(col2);
            rw.appendChild(col3);
            rw.appendChild(col4);
            var in1 = document.createElement('input');
            in1.id = "itname" + n;
            in1.setAttribute("type","text");
            in1.className = "form-control";
            in1.setAttribute("type","text");
            in1.setAttribute("placeholder","Item Name");
            in1.setAttribute("value", key);
            col1.appendChild(in1);
            var in2 = document.createElement('input');
            in2.id = "itq" + n;
            in2.setAttribute("type","text");
            in2.className = "form-control";
            in2.setAttribute("type","text");
            in2.setAttribute("placeholder","Quantity");
            in2.setAttribute("value", prd[key]);
            col2.appendChild(in2);
            var b1 = document.createElement('a');
            b1.setAttribute("href", "#");
            b1.className = "btn btn-md btn-primary";
            b1.innerHTML = "Update";
            col3.appendChild(b1);
            var b2 = document.createElement('a');
            b2.setAttribute("href", "#");
            b2.className = "btn btn-md btn-secondary";
            b2.innerHTML = "Delete";
            b2.setAttribute("onclick", "OrdersControllerModule.deleteItem(" + n +");")
            col4.appendChild(b2);
        }

    }


}



function removeOrderById(id){
	var order = document.getElementById(id);
	//order.innerHTML = '';
	order.parentNode.removeChild(order);
}



