
function addRow(){

	let tableHead = document.getElementById('tableHead');

	/*
	if(tableHead.childNodes.length === 0){
		const firstHeaderRow = document.createElement('tr');
		firstHeaderRow.className = "headersRow";
		const firstHeader = document.createElement('th');
		firstHeader.className = "tableHeaders";
		firstHeaderRow.firstHeader;
		tableHead.appendChild(firstHeaderRow);
	}*/
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
				editableDiv.blur();
			}
		});
		newCell.appendChild(editableDiv);
	})
	

}

function addColumn(){
	let tableHead = document.getElementById('tableHead');
/*
	if(tableHead.childNodes.length === 1){
		const headerRow = document.createElement('tr');
		const columnName = document.getElementById('columnNameInput').value;
		headerRow.className = "headersRow";
		headerRow.id = "headerRow";
		const text = document.createTextNode(columnName);
		const firstHeader = document.createElement('th');
		firstHeader.className = "tableHeaders";
		firstHeader.appendChild(text);
		headerRow.appendChild(firstHeader);
		tableHead.appendChild(headerRow);
	}*/

	//Creating header column
	const columnName = document.getElementById('columnNameInput').value;
	const headerRow = document.getElementById('headerRow');
	const text = document.createTextNode(columnName);
	const columnHeader = document.createElement('th');
	const type = document.getElementById('type-select').value;
	columnHeader.className = "tableHeaders";
	columnHeader.columnType = type;
	columnHeader.typeFormatter = numberFormater;
	columnHeader.appendChild(text);
	headerRow.appendChild(columnHeader);
	tableHead.appendChild(headerRow);
	


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
				editableDiv.blur();
				const formatter = document.getElementById('headerRow').childNodes[newCell.cellIndex].typeFormatter;
				formatter();
			}
		});
		newCell.appendChild(editableDiv);
		tr.appendChild(newCell);
	});

		
}


function numberFormater(element){
	
}


//header.childNodes[newCell.cellIndex].columnType