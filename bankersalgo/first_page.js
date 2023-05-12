"use-strict";

let count=0;
let mcount=0;
const res = localStorage.getItem("res");


function addRows(){ 
	count++;
	var table = document.getElementById('allocatedtable');
	var rowCount = table.rows.length;
	var cellCount = table.rows[0].cells.length; 
	var row = table.insertRow(rowCount);
	cell = row.insertCell(0);
	cell.innerHTML="P"+count;
	
	for(var i =1; i <= cellCount; i++){
		var cell = 'cell'+i;
		cell = row.insertCell(i);
		var copycel = document.getElementById('col'+i).innerHTML;
		cell.innerHTML=copycel;
	}
}
function maddRows(){ 
	mcount++;
	var mtable = document.getElementById('maxneedtable');
	var mrowCount = mtable.rows.length;
	var mcellCount = mtable.rows[0].cells.length; 
	var mrow = mtable.insertRow(mrowCount);
	mcell = mrow.insertCell(0);
	mcell.innerHTML="P"+mcount;
	
	for(var i =1; i <= mcellCount; i++){
		var mcell = 'cell'+i;
		mcell = mrow.insertCell(i);
		var copycel = document.getElementById('mcol'+i).innerHTML;
		mcell.innerHTML=copycel;
		
	}
}
function deleteRows(){
	
	var table = document.getElementById('allocatedtable');
	var rowCount = table.rows.length;
	if(rowCount > '2'){
		var row = table.deleteRow(rowCount-1);
		count--;
		rowCount--;
	}
	else{
		alert('There should be atleast one row');
	}
}
function mdeleteRows(){
	
	var table = document.getElementById('maxneedtable');
	var rowCount = table.rows.length;
	if(rowCount > '2'){
		var row = table.deleteRow(rowCount-1);
		mcount--;
		rowCount--;
	}
	else{
		alert('There should be atleast one row');
	}
}
function populateDropDown() {
	const tableCell = document.getElementById("total").rows[0].cells[1];
	const tableValue = parseInt(tableCell.querySelector('input').value);
	const select = document.getElementById("my-select");
	select.innerHTML = ""; // Clear any existing options
	for (let i = 1; i <= tableValue; i++) {
	  const option = document.createElement("option");
	  option.value = i;
	  option.textContent = i;
	  select.appendChild(option);

	}
}

function checkafter()
{
	const table= document.getElementById("total");
	const rowValues = [];

for (let j = 0; j < 4; j++) {
  const cellValue = table.rows[1].cells[j].querySelector('input').value;
  rowValues.push(cellValue);
}
	const tableCell = document.getElementById("total").rows[0].cells[1];
 var procnum=document.getElementById("procnum").value;
 var resnum=document.getElementById("resnum").value;
 var resvalue=document.getElementById("resvalue").value;
 if(procnum>count)
 {
   alert("Process Does not Exist");
 }
 else if(resnum>4)
 {
   alert("Resource Does not Exist");
 }
 else if(resvalue> rowValues[resnum-1])
 alert("Exceeded The Total Resources");
 else
 {

 }  	
}
//get the content of the table
var content = [];

function apply() {
	content.length = 0;

	if(count!=mcount)
	alert("make sure that the Allocated Table and the MaxNeed table have the same size");
	else{
		var table = document.getElementById("allocatedtable");
		var rows = table.rows;
		var numRows = rows.length;
		var numCols = rows[0].cells.length;
		
		for (var i = 1; i < numRows; i++) {
		  var rowContent = [];
		  for (var j = 1; j < numCols; j++) {
			var input = rows[i].cells[j].querySelector('input').value;
			rowContent.push(input);
		  }
		  content.push(rowContent);
		}
		
		


		return content;
}
  }
  var mcontent = [];
  function mapply() {
	mcontent.length = 0;
	
	if(count!=mcount)
	alert("make sure that the Allocated Table and the MaxNeed table have the same size");
	else{
		var table = document.getElementById("maxneedtable");
		var rows = table.rows;
		var numRows = rows.length;
		var numCols = rows[0].cells.length;
		
		
		for (var i = 1; i < numRows; i++) {
		  var rowContent = [];
		  for (var j = 1; j < numCols; j++) {
			var input = rows[i].cells[j].querySelector('input').value;
			rowContent.push(input);
		  }
		  mcontent.push(rowContent);
		}
		
		

		
}
  }
  var avcontent = [];		  
  
  function applyavailable() 
  {
	avcontent.length = 0;
	var table = document.getElementById("Available");


		var rows = table.rows;
		  for (var j = 0; j < 4; j++) {
			var input = rows[1].cells[j].querySelector('input').value;
			avcontent.push(input);
		  }		
		
		
		  console.log(avcontent);


  }
  var totalarr = [];		  
  function applytotal() 
  {
	totalarr.length = 0;

	var table = document.getElementById("total");


		var rows = table.rows;
		  for (var j = 0; j < 4; j++) {
			var input = rows[1].cells[j].querySelector('input').value;
			totalarr.push(input);
		  }		
		
		
		

		return totalarr;

}
 function check()
 {
	var processes=count+1;
	var work = [avcontent];
	var finish = Array(processes).fill(false);
	
	// Initialize the sequence vector
	var sequence = [];
	
	// Loop until all processes have been checked
	for (var i = 0; i < processes; i++) {
	  // Find a process that is not yet finished and whose needs can be satisfied by the available resources
	  var j;
	  for (j = 0; j < processes; j++) {
		if (!finish[j]) {
		  var k;
		  for (k = 0; k < work.length; k++) {
			if (mcontent[j][k] > work[k]) {
			  break;
			}
		  }
		  if (k === work.length) {
			break;
		  }
		}
	  }
	  
	  // If no such process is found, then the system is not in a safe state
	  if (j === processes) {
		alert("oopss!... The system is not in a safe state");
		return null;
	  }
	  
	  // Add the process to the sequence
	  sequence.push('p'+j);
	  
	  // Mark the process as finished and release its resources
	  finish[j] = true;
	  for (var k = 0; k < work.length; k++) {
		work[k] += content[j][k];
	  }
	}
	alert("wohooo!... The safe sequence is " + sequence);
 	

  }