
var sub_total=0;
var promotion=0;
function addFunc() {
	if (document.getElementById("item_id").value == null) {
		alert("Please enter item id");
	}
	var table = document.getElementById("salesTable");
	var row = table.insertRow(-1);
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	var cell3 = row.insertCell(2);
	var cell4 = row.insertCell(3);
	var cell5 = row.insertCell(4);	
	var price = 5;
	if (document.getElementById("quantity").value == null) 
		document.getElementById("quantity").value = 5;	
	do {
		var quantity = document.getElementById("quantity").value;	
	} while (quantity == null);
	
	document.getElementById("item_id").value="123";
	cell1.innerHTML = "1";
	cell2.innerHTML = "123";
	cell3.innerHTML = "5";
	cell4.innerHTML = "Pepsi";
	cell5.innerHTML = "5";
	sub_total = sub_total +  price*quantity;
	document.getElementById("sub_total").innerHTML = sub_total;
	document.getElementById("tax").innerHTML = sub_total*(100-promotion)/100 * 0.1;
	document.getElementById("sum").innerHTML = sub_total*(100-promotion)/100 * 0.9;	
}
function payFunc() {
	document.getElementById("my_modal_value").innerHTML = "Total: "+ sub_total*(100-promotion)/100 * 0.9;
	console.log(document.getElementById("my_modal_value").value);
	// $("#myModal").find('.p').val('xxx');
	$("#myModal").modal("show");	
	// window.alert("Total: "+ sub_total*(100-promotion)/100 * 0.9);
	myTable = document.getElementById("product");
	var rowCount = myTable.rows.length; while(--rowCount) myTable.deleteRow(rowCount);
	document.getElementById("sub_total").innerHTML = 0;
	document.getElementById("tax").innerHTML = 0;
	document.getElementById("sum").innerHTML = 0;
	document.getElementById("promotion").innerHTML = 0;

}
function promFunc(value) {
	document.getElementById("promotion").innerHTML = value+"%";
	promotion = value;
	document.getElementById("tax").innerHTML = sub_total*(100-promotion)/100 * 0.1;
}

function voucherFunct() {
	document.getElementById("promotion").innerHTML = document.getElementById("voucherInput").value;
}

var input = document.getElementById("voucherInput");
input.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("voucherCloseBtn").click();
    }
});