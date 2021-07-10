
function addRow(){

	let tableHead = document.getElementById('tableHead');

	if(tableHead.childNodes.length === 0){
		const firstHeaderRow = document.createElement('tr');
		firstHeaderRow.className = "headersRow";
		const firstHeader = document.createElement('th');
		firstHeader.className = "tableHeaders";
		firstHeaderRow.firstHeader;
		tableHead.appendChild(firstHeaderRow);
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

	if(tableHead.childNodes.length === 1){
		const headerRow = document.createElement('tr');
		headerRow.className = "headersRow";
		headerRow.id = "headerRow";
		const text = document.createTextNode('Header');
		const firstHeader = document.createElement('th');
		firstHeader.className = "tableHeaders";
		firstHeader.appendChild(text);
		headerRow.appendChild(firstHeader);
		tableHead.appendChild(headerRow);
	}

	else {
		headersRow = document.getElementById('headerRow');
		const text = document.createTextNode('Header');

		let newHeader = document.createElement('th');
		newHeader.className = "tableHeaders";
		newHeader.appendChild(text);
		headersRow.appendChild(newHeader);
	

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
