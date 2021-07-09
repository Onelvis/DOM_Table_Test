
function addRow(){

	let tableHead = document.getElementById('tableHead');

	if(tableHead.childNodes.length === 0){
		let firstHeader = document.createElement('th');
		const text = document.createTextNode("Header");
		firstHeader.appendChild(text);
		tableHead.appendChild(firstHeader);
	}
	else{
		
		let tableBody = document.getElementById('mainTableBody');
		let newRow = tableBody.insertRow(-1);
		//let newCell = newRow.insertCell(0);
		const b = document.querySelectorAll('#tableHead th').forEach((header)=>{
			const newCell = newRow.insertCell();
			const text = document.createTextNode("Header");
			newCell.appendChild(text);
		})
	}
	

}

function addColumn(){
	let tableHead = document.getElementById('tableHead');

	if(tableHead.childNodes.length === 0){
		let firstHeader = document.createElement('th');
		const text = document.createTextNode("Header");
		firstHeader.appendChild(text);
		tableHead.appendChild(firstHeader);
	}

	else {
		tableHead = document.getElementById('tableHead');
		let newHeader = document.createElement('th');
		const text = document.createTextNode("Header");
		newHeader.appendChild(text);
		tableHead.appendChild(newHeader);
	

		const b = document.querySelectorAll("#mainTableBody tr").forEach( (tr,index) =>{
			const newCell = document.createElement('td');
			const text = document.createElement('input');
			newCell.appendChild(text);
			tr.appendChild(newCell);
		});

		
	}
}