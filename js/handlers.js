
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
	const headerRow = document.getElementById('headerRow');
	
	document.querySelectorAll('#tableHead th').forEach((th)=>{
		const newCell = newRow.insertCell();
		const editableDiv = document.createElement('div');
		//editableDiv.className = "textCell";
		editableDiv.setAttribute('contenteditable',false);
		newCell.ondblclick = function(e){
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
		console.log(th);

		editableDiv.className = getTypeClass(th.columnType);
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
	const columnHeader = document.createElement('th');
	const type = document.getElementById('type-select').value;
	const text = document.createTextNode(type);
	columnHeader.className = "tableHeaders";
	columnHeader.columnType = type;
	columnHeader.typeFormatter = numberFormater;
	columnHeader.appendChild(text);
	headerRow.appendChild(columnHeader);
	tableHead.appendChild(headerRow);
	


	document.querySelectorAll("#mainTableBody tr").forEach( (tr,index) =>{
		const newCell = document.createElement('td');
		const editableDiv = document.createElement('div');
		editableDiv.className = 'textCell';
		editableDiv.setAttribute('contenteditable',false);
		newCell.ondblclick = function(e){
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
		tr.appendChild(newCell);


		editableDiv.className = getTypeClass(headerRow.childNodes[newCell.cellIndex].columnType);
	});

		
}

function getTypeClass(type){
	switch(type){
		case 'Number':
			return "numberCell";
		case 'Text':
			return "textCell";
		case 'Email':
			return "emailCell";
		case 'Url':
			return "urlCell";
	}
}


function numberFormater(editableDiv){
	//editableDiv.classList.toggle('numberCell')
}
