
const table = {
	headers: [
		{
			id: 1,
			type: "Number",
			text: "Id"
		},
		{
			id: 2,
			type: "Text",
			text: "Name"
		},
		{
			id: 3,
			type: "Url",
			text: "Url"
		},
		{
			id: 4,
			type: "Email",
			text: "Email"
		}
	],
	
	rows: [
		{
			id: 1,
			cells: [
				1,
				"Test",
				"www.Google.com",
				"test@test.com"
			]
		},
		{
			id: 2,
			cells: [
				2,
				"Test",
				"www.Google.com",
				"test@test.com"
			]
		}
	]
}

document.addEventListener("DOMContentLoaded", populateTable);

function addRow(){
	table.rows.push({
		id: (table.rows.reduce((prev,next) => { return { id: (Math.max(prev.id,next.id))} }).id + 1),
		cells: new Array(table.headers.length).fill('')
	});
	populateTable();
}

function addColumn(){
	const type = document.getElementById('typeSelect').value;
	const name = document.getElementById('columnNameInput').value;
	
	table.headers.push(
		{
		id: (table.headers.reduce((prev,next) => { return { id: (Math.max(prev.id,next.id))} }).id + 1),
			type: type,
			text: name
		}
	);
	table.rows.forEach((row)=>{
		row.cells.push('');
	});
	populateTable();
}

function selectAllRows(e){
	const tableRows = document.querySelectorAll("#coolTableBody tr"); 
	tableRows.forEach( row => row.childNodes[0].firstChild.firstChild.checked = e.currentTarget.checked );
}


function createNewTable(){

	const oldTable = document.getElementsByClassName('coolTable')[0];
	
	const newTable = document.createElement('table');
	newTable.className = 'coolTable';
	const tableHead = document.createElement('thead');
	tableHead.id = 'tableHead';
	const tableHeadersRow = document.createElement('tr');
	tableHeadersRow.className = 'headersRow';
	tableHeadersRow.id = 'headerRow';

	const tableBody = document.createElement('tbody');
	tableBody.id = 'coolTableBody';

	tableHead.appendChild(tableHeadersRow);
	newTable.appendChild(tableHead);
	newTable.appendChild(tableBody);
	oldTable.parentNode.replaceChild(newTable, oldTable);

}

function populateTable(){
	createNewTable();
	
	const headerRow = document.getElementById('headerRow');
	const checkboxInput = document.createElement('input');
	const checkboxLabel = document.createElement('label');

	checkboxInput.type= 'checkbox';
	checkboxInput.className = 'checkbox';
	checkboxInput.id = 'headerCheckbox';
	checkboxInput.addEventListener('change',selectAllRows)
	const checkBoxHeader = document.createElement('th');

	checkboxLabel.appendChild(checkboxInput);
	checkBoxHeader.appendChild(checkboxLabel);

	headerRow.appendChild(checkBoxHeader);

	if(table){
		//Headers first!
		table.headers.forEach(header =>{
			addTableHeader(header);
		});
	
		table.rows.forEach(row => {
			addTableRow(row);
		});
		return;
	}




}

function addTableHeader(header){
	const headerRow = document.getElementById('headerRow');
	const columnHeader = document.createElement('th');
	const text = document.createTextNode(header.text);

	columnHeader.className = "tableHeaders";
	columnHeader.columnType = header.type;
	columnHeader.appendChild(text);
	headerRow.appendChild(columnHeader);
}


function addTableRow(row){
	const tableBody = document.getElementById('coolTableBody');
	const newRow = tableBody.insertRow(-1);
	const headerRow = document.getElementById('headerRow');
	
	// Checkbox cell
	const checkboxCell = document.createElement('input');
	const checkboxLabel = document.createElement('label');
	const selectCell = newRow.insertCell();
	checkboxCell.addEventListener('change',function (e){
		let checked = e.currentTarget.checked;
		document.getElementById('headerCheckbox').checked = checked;
	});

	checkboxCell.type= 'checkbox';
	checkboxCell.className = 'checkbox';
	checkboxLabel.appendChild(checkboxCell);
	selectCell.appendChild(checkboxLabel);

	row.cells.forEach((cell,index) =>{
		const newCell = newRow.insertCell();
		const editableDiv = document.createElement('div');
		editableDiv.setAttribute('contenteditable',false);
		newCell.ondblclick = function(){
			newCell.classList.toggle('selectedTd');
			editableDiv.setAttribute('contenteditable',!(editableDiv.contentEditable === 'true'));
			editableDiv.focus();
		};
		editableDiv.addEventListener('focusout' , function(e){
			editableDiv.setAttribute('contenteditable',false);
			newCell.classList.toggle('selectedTd');
		});
		editableDiv.addEventListener('keydown' , function(e){
			if(e.code === 'Enter'){
				editableDiv.blur();
			}
		});
		const text = document.createTextNode(cell);
		
		editableDiv.appendChild(text);
		newCell.appendChild(editableDiv);
		// index +1 due to the pressence of the checkbox cell
		applyTypeRules(editableDiv,headerRow.childNodes[index+1].columnType);
	});
}



function addRowOld(){

	const thHeaders = document.querySelectorAll('#tableHead th');

	let newArray = new Array(thHeaders.length).fill('');

	const tableBody = document.getElementById('coolTableBody');
	const newRow = tableBody.insertRow(-1);

	const selectCell = newRow.insertCell();
	const checkboxCell = document.createElement('input');
	checkboxCell.type= 'checkbox';
	selectCell.appendChild(checkboxCell);
	newRow.appendChild(selectCell);
	
	thHeaders.forEach((th)=>{
		const newCell = newRow.insertCell();
		const editableDiv = document.createElement('div');
		editableDiv.setAttribute('contenteditable',false);
		newCell.ondblclick = function(){
			newCell.classList.toggle('selectedTd');
			editableDiv.setAttribute('contenteditable',!(editableDiv.contentEditable === 'true'));
			editableDiv.focus();
		};
		editableDiv.addEventListener('focusout' , function(e){
			editableDiv.setAttribute('contenteditable',false);
			newCell.classList.toggle('selectedTd');
		});
		editableDiv.addEventListener('keydown' , function(e){
			if(e.code === 'Enter'){
				editableDiv.blur();
				let cellIndex = this.parentNode.cellIndex;
				let rowIndex = this.parentNode.parentNode.rowIndex - 1;
				table.rows[rowIndex].cells.splice(cellIndex,1,editableDiv.innerHTML);
			}
		});

		newCell.appendChild(editableDiv);
		applyTypeRules(editableDiv,th.columnType);

	})

	
	table.rows.push({
		id: ( table.rows.reduce((prev,next) => Math.max(prev.id,next.id)) + 1),
		cells: newArray
	});
	
	console.log(table)

}

function addColumnOld(){
	//Creating header column
	const headerRow = document.getElementById('headerRow');
	const columnHeader = document.createElement('th');
	const type = document.getElementById('typeSelect').value;
	const text = document.createTextNode(type);
	columnHeader.className = "tableHeaders";
	columnHeader.columnType = type;
	columnHeader.appendChild(text);
	headerRow.appendChild(columnHeader);
	// tableHead.appendChild(headerRow);
	


	document.querySelectorAll("#coolTableBody tr").forEach( (tr,index) =>{
		const newCell = document.createElement('td');
		const editableDiv = document.createElement('div');
		editableDiv.className = "textCell";
		editableDiv.setAttribute('contenteditable',false);
		newCell.ondblclick = function(e){
			newCell.classList.toggle('selectedTd');
			editableDiv.setAttribute('contenteditable',!(editableDiv.contentEditable === 'true'));
			editableDiv.focus();
		};
		editableDiv.addEventListener('focusout' , function(e){
			editableDiv.setAttribute('contenteditable',false);
			newCell.classList.toggle('selectedTd');
		});
		editableDiv.addEventListener('keydown' , function(e){
			if(e.code === 'Enter'){
				editableDiv.blur();
				let cellIndex = this.parentNode.cellIndex;
				let rowIndex = this.parentNode.parentNode.rowIndex - 1;
				table.rows[rowIndex].cells.splice(cellIndex,1,editableDiv.innerHTML);
			}
		});
		
		newCell.appendChild(editableDiv);
		tr.appendChild(newCell);
		applyTypeRules(editableDiv,headerRow.childNodes[newCell.cellIndex].columnType);
		
		table.rows[index].cells.push(editableDiv.innerHTML);

	});


		
}

function applyTypeRules(element,type){
	switch(type){

		//Number formatting
		case 'Number':
			element.className = 'numberCell';
			element.addEventListener('keydown' , function(e){
				if(!(e.keyCode < 14 || e.keyCode == 110 || ((e.keyCode > 47 && e.keyCode <58) ||(e.keyCode > 95 && e.keyCode <106) ))){
					e.preventDefault();
				}
				if(e.code === 'Enter'){
					element.blur();
				}
			});
			break;
		
		// Text formatting
		case 'Text':
			element.className = 'textCell';
			break;
		
		// Email formatting
		case 'Email':
			element.className = 'emailCell';
			element.addEventListener('click',function(e){
				e.ctrlKey && window.open('mailto:'+element.innerHTML);
			})
			break;
		
		// Url formatting	
		case 'Url':
			element.className = 'urlCell';
			element.addEventListener('click',function(e){
				e.ctrlKey && window.open(element.innerHTML);
			})
			break;
	}
}


