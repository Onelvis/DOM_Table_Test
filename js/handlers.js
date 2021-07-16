
function addRow(){


	const tableBody = document.getElementById('mainTableBody');
	const newRow = tableBody.insertRow(-1);
	
	document.querySelectorAll('#tableHead th').forEach((th)=>{
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

		newCell.appendChild(editableDiv);
		applyTypeRules(editableDiv,th.columnType);

	})
	

}

function addColumn(){
	let tableHead = document.getElementById('tableHead');
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
	tableHead.appendChild(headerRow);
	


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
