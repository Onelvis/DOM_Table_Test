
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


function addRow(){
	table.rows.push({
		cells: new Array(table.headers.length).fill('')
	});
	populateTable();
}

function addColumn(){

}


function populateTable(){


	//Headers first!
	table.headers.forEach(header =>{
		addTableHeader(header);
	});

	table.rows.forEach(row => {
		addTableRow(row);
	});
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
	const tableBody = document.getElementById('mainTableBody');
	const newRow = tableBody.insertRow(-1);
	const headerRow = document.getElementById('headerRow');

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
		applyTypeRules(editableDiv,headerRow.childNodes[index].columnType);
	});
}



function addRowOld(){

	const thHeaders = document.querySelectorAll('#tableHead th');

	let newArray = new Array(thHeaders.length).fill('');

	const tableBody = document.getElementById('mainTableBody');
	const newRow = tableBody.insertRow(-1);
	
	thHeaders.forEach((th,index)=>{
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
		index: ( table.rows.reduce((prev,next) => Math.max(prev.id,next.id)) + 1),
		cells: newArray
	});
	

}

function addColumnOld(){
	//Creating header column
	const headerRow = document.getElementById('headerRow');
	const columnHeader = document.createElement('th');
	const type = document.getElementById('type-select').value;
	const text = document.createTextNode(type);
	columnHeader.className = "tableHeaders";
	columnHeader.columnType = type;
	columnHeader.typeFormatter = numberFormater;
	columnHeader.appendChild(text);
	headerRow.appendChild(columnHeader);
	// tableHead.appendChild(headerRow);
	


	document.querySelectorAll("#mainTableBody tr").forEach( (tr,index) =>{
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
		
		newCell.appendChild(editableDiv);
		tr.appendChild(newCell);
		applyTypeRules(editableDiv,headerRow.childNodes[newCell.cellIndex].columnType);
	});

		
}

function applyTypeRules(element,type){
	switch(type){
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
		case 'Text':
			element.className = 'textCell';
			break;
		case 'Email':
			element.className = 'emailCell';
			element.addEventListener('click',function(e){
				e.ctrlKey && window.open('mailto:'+element.innerHTML);
			})
			break;
		case 'Url':
			element.className = 'urlCell';
			element.addEventListener('click',function(e){
				e.ctrlKey && window.open(element.innerHTML);
			})
			break;
	}
}


function numberFormater(editableDiv){
	//editableDiv.classList.toggle('numberCell')
}
