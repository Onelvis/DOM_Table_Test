


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
