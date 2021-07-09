
function addRow(){

	let tableHead = document.getElementById('tableHead');

	if(tableHead.childNodes.length === 0){
		let firstHeader = document.createElement('th');
		tableHead.appendChild(firstHeader);
	}
	else{
		
		const tableBody = document.getElementById('mainTableBody');
		const newRow = tableBody.insertRow(-1);
		
		document.querySelectorAll('#tableHead th').forEach(()=>{
			const newCell = newRow.insertCell();
			const editableDiv = document.createElement('div');
			editableDiv.className = "editableDiv";
			editableDiv.contentEditable = false;
			editableDiv.ondblclick = function(e){
				editableDiv.setAttribute('contenteditable',!(editableDiv.contentEditable === 'true'));
				editableDiv.focus();
			};
			editableDiv.addEventListener('focusout' , function(e){
				editableDiv.setAttribute('contenteditable',false);
			});
			editableDiv.addEventListener('keydown' , function(e){
				if(e.code === 'Enter'){
					editableDiv.blur()
				}
			});
			newCell.appendChild(editableDiv);
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
		tableHead.appendChild(newHeader);
	

		document.querySelectorAll("#mainTableBody tr").forEach( (tr,index) =>{
			const newCell = document.createElement('td');
			const editableDiv = document.createElement('div');
			editableDiv.className = "editableDiv";
			editableDiv.setAttribute('contenteditable',false);
			editableDiv.ondblclick = function(e){
				editableDiv.setAttribute('contenteditable',!(editableDiv.contentEditable === 'true'));
				editableDiv.focus();
			};
			editableDiv.addEventListener('focusout' , function(e){
				editableDiv.setAttribute('contenteditable',false);
			});
			editableDiv.addEventListener('keydown' , function(e){
				if(e.code === 'Enter'){
					editableDiv.blur()
				}
			});
			newCell.appendChild(editableDiv);
			tr.appendChild(newCell);
		});

		
	}
}
