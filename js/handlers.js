
let table2 = {
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

let table = {
	headers: [],
	rows: []
};

document.addEventListener("DOMContentLoaded", loadTable);

function loadTable(){
	table = JSON.parse(localStorage.getItem('table')) ||  { headers: [], rows: [] };;
	populateTable();
}

function pushRow(){
	table.rows.push({
		id: (table.rows.reduce((prev,next) => { return { id: (Math.max(prev.id,next.id))} }, {id:0}).id + 1),
		cells: new Array(table.headers.length).fill('')
	});
	populateTable();
	saveTable();
}

function pushColumn(){
	const type = document.getElementById('typeSelect').value;
	const name = document.getElementById('columnNameInput').value;
	table.headers.push(
		{
		id: (table.headers.reduce((prev,next) => { return { id: (Math.max(prev.id,next.id))} }, {id:0}).id + 1),
			type: type,
			text: name
		}
	);
	table.rows.forEach((row)=>{
		row.cells.push('');
	});
	populateTable();
	saveTable();
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

function saveTable(){
	let jsonTable = JSON.stringify(table);
	localStorage.setItem('table',jsonTable);
}

function populateTable(){
	createNewTable();
	
	const headerRow = document.getElementById('headerRow');
	const checkboxInput = document.createElement('input');
	const checkboxLabel = document.createElement('label');
	checkboxLabel.className = 'checkboxLabel';

	checkboxInput.type= 'checkbox';
	checkboxInput.className = 'checkbox';
	checkboxInput.id = 'headerCheckbox';
	checkboxInput.addEventListener('change',selectAllRows)
	const checkBoxHeader = document.createElement('th');
	checkBoxHeader.className = 'checkboxCell';

	checkboxLabel.appendChild(checkboxInput);
	checkBoxHeader.appendChild(checkboxLabel);

	headerRow.appendChild(checkBoxHeader);
	
	
	if(table.headers.length > 0){
		//Headers first!
		table.headers.forEach(header =>{
			addTableHeader(header);
		});

		table.rows.forEach(row => {
			addTableRow(row);
		});
		return;
	}


	addTableHeader({text:"",type:"Number"})


}

function addTableHeader(header){
	const headerRow = document.getElementById('headerRow');
	const columnHeader = document.createElement('th');
	const text = document.createTextNode(header.text);
	columnHeader.sort = 'no';
	console.log(columnHeader.sort);

	// Column sorting
	columnHeader.addEventListener('click', function(e){
		let columnIndex = e.currentTarget.cellIndex - 1;
		this.sort = this.sort == "no" ? 'desc' : this.sort == 'desc' ? 'asc' : 'desc';
		switch(this.sort){
			case 'no':
				break;
				
			case 'asc':
				table.rows.sort((current, next) => {
					if (current.cells[columnIndex] < next.cells[columnIndex]){
						return  -1;
					}
					else{
						return 1;
					}
				});
				document.querySelectorAll('#coolTableBody tr').forEach(element => {
					element.remove()
				});
				table.rows.forEach(row => {
					addTableRow(row);
				});
				break;
			case 'desc':
				table.rows.sort((current, next) => {
					if (current.cells[columnIndex] < next.cells[columnIndex]){
						return  1;
					}
					else{
						return -1;
					}
				});
				document.querySelectorAll('#coolTableBody tr').forEach(element => {
					element.remove()
				});
				table.rows.forEach(row => {
					addTableRow(row);
				});
				break;
		}
	});

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
	checkboxLabel.className = 'checkboxLabel';
	const selectCell = newRow.insertCell();
	selectCell.className = 'checkboxCell';
	checkboxCell.addEventListener('change',function (e){
		let checked = e.currentTarget.checked;
		document.getElementById('headerCheckbox').checked = checked ? document.getElementById('headerCheckbox').checked : checked;
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
				const columnIndex = this.parentNode.cellIndex - 1;
				const rowIndex = this.parentNode.parentNode.rowIndex - 1;
				const type = headerRow.childNodes[index+1].columnType;
				console.log(type);
				if (type === 'Number'){
					table.rows[rowIndex].cells[columnIndex] = Number.parseFloat(e.currentTarget.innerHTML);
				}
				else{
					table.rows[rowIndex].cells[columnIndex] =  e.currentTarget.innerHTML;
				}
				saveTable();
				console.log(table.rows);
			}
		});
		const text = document.createTextNode(cell);
		
		editableDiv.appendChild(text);
		newCell.appendChild(editableDiv);
		// index +1 due to the pressence of the checkbox cell
		applyTypeRules(editableDiv,headerRow.childNodes[index+1].columnType);
	});
	const settingCell = newRow.insertCell();
	settingCell.className = "settingCell";
	
	const icon = document.createElement('span');
	const dropdownWrapper = document.createElement('div');
	dropdownWrapper.className = 'selectDropdownWrapper';

	dropdownWrapper.addEventListener('click', function(e){
		let currentClass = e.currentTarget.childNodes[1].className;
		e.currentTarget.childNodes[1].className = currentClass === 'selectDropdown' ? 'selectDropdown show' : 'selectDropdown';
	});

	const dropdown = document.createElement('div');
	dropdown.className = 'selectDropdown';

	const csv = document.createElement('a');
	const div1 = document.createElement('div');

	csv.innerHTML =  "Copy (Csv)"
	div1.appendChild(csv);
	const json = document.createElement('a');
	json.innerHTML =  "Copy (Json)"
	const deleteRow = document.createElement('a');
	deleteRow.innerHTML =  "Delete"
	deleteRow.addEventListener('click', removeRow );


	const copyIcon = document.createElement('span');
	copyIcon.className = "material-icons small";
	copyIcon.innerHTML = "content_paste";

	const copyIcon2 = document.createElement('span');
	copyIcon2.className = "material-icons small";
	copyIcon2.innerHTML = "content_paste";

	const deleteIcon = document.createElement('span');
	const test = document.createElement('a');
	test.innerHTML = "Hello";
	deleteIcon.className = "material-icons small red";
	deleteIcon.innerHTML = "clear";


	csv.appendChild(copyIcon);
	json.appendChild(copyIcon2);
	deleteRow.appendChild(deleteIcon);

	dropdown.appendChild(csv);
	dropdown.appendChild(json);
	dropdown.appendChild(deleteRow);

	dropdownWrapper.appendChild(icon);
	dropdownWrapper.appendChild(dropdown);

	

	icon.className = "material-icons md-20";
	icon.innerHTML = "settings";
	settingCell.appendChild(dropdownWrapper);

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

function removeRow(e){
	let rowIndex = e.currentTarget.parentNode.parentNode.parentNode.parentNode.rowIndex - 1;
	table.rows.splice(rowIndex,1);
	console.log(table.rows);
	saveTable();
	populateTable();
}


window.addEventListener('click', function(e){
	
	if( e.target.className !== "selectDropdownWrapper" ){
		document.querySelectorAll(".selectDropdown").forEach((element)=>{
			if(element.className == 'selectDropdown show'){
				element.classList.remove('show');
			}
		});
	}
});