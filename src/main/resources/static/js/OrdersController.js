var order2 = {
				"order_id": 1,
				"table_id": 1,
				"products": [{
						"product": "PIZZA",
						"quantity": 3,
						"price": "$10.000"
					},
					{
						"product": "HOTDOG",
						"quantity": 1,
						"price": "$3000"
					},
					{
						"product": "COKE",
						"quantity": 4,
						"price": "$1300"
					}
				]
			}

var mockedList = [{
					"order_id": 2,
					"table_id": 2,
					"products": [{
							"product": "PIZZA",
							"quantity": 3,
							"price": "$15.000"
						},
						{
							"product": "HAMBURGER",
							"quantity": 1,
							"price": "$12.300"
						}
					]
				},
				{
					"order_id": 3,
					"table_id": 3,
					"products": [{
							"product": "PIZZA",
							"quantity": 3,
							"price": "$10.000"
						},
						{
							"product": "HOTDOG",
							"quantity": 1,
							"price": "$3000"
						},
						{
							"product": "COKE",
							"quantity": 4,
							"price": "$1300"
						}
					]
				}]	
	

function addOrder( order) {
    var body = document.getElementById('orders');
	var p1 = document.createElement('div');
	p1.id = order['order_id'];
	p1.textContent = 'Order ' + order['order_id'];
	body.appendChild(p1);
    var tbl = document.createElement('table');
	tbl.className = 'table table-dark'
	var thd = document.createElement('thead');
	var tr1 = document.createElement('tr');
	var th1 = document.createElement('th');
	var th2 = document.createElement('th');
	var th3 = document.createElement('th');
	var th4 = document.createElement('th');
	th1.setAttribute('scope', 'col');
	th1.textContent = '#';
	thd.appendChild(th1);
	th2.setAttribute('scope', 'col');
	th2.textContent = 'Product';
	thd.appendChild(th2);
	th3.setAttribute('scope', 'col');
	th3.textContent = 'Quantity';
	thd.appendChild(th3);
	th4.setAttribute('scope', 'col');
	th4.textContent = 'Price';
	thd.appendChild(th4);
    var tbdy = document.createElement('tbody');
	var prd = order.products;
    for (var i = 0; i < prd.length; i++) {
		//console.log(i);
        var tr = document.createElement('tr');
		var th = document.createElement('th');
		th.setAttribute('scope', 'row');
		th.textContent = i+1;
		tr.appendChild(th);
        for (var j = 0; j < 3; j++) {
            //if (i == 2 && j == 1) {
            //    break
            //} else {
			var td = document.createElement('td');
			if(j == 0){
				//console.log(prd['product']);
				td.appendChild(document.createTextNode(prd[i]['product']));
			}else if(j ==1){
				td.appendChild(document.createTextNode(prd[i]['quantity']));
			}else{
				td.appendChild(document.createTextNode(prd[i]['price']));
			}
			
			//i == 1 && j == 1 ? td.setAttribute('rowSpan', '2') : null;
			tr.appendChild(td);
            //}
        }
        tbdy.appendChild(tr);
    }
    tbl.appendChild(tbdy);
	
    tbl.appendChild(thd);
    p1.appendChild(tbl);
}

function loadOrders(){
	for (var i = 0; i<mockedList.length;i++){
                console.log("");
		addOrder(mockedList[i]);
	}
	
}

function removeOrderById(id){
	var order = document.getElementById(id);
	//order.innerHTML = '';
	order.parentNode.removeChild(order);
}

axios.get('/orders')
  .then(function (response) {
    mockedList = response["data"];
    //loadOrders();
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });


//tableCreate();

