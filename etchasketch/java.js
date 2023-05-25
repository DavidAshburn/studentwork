
const gridContainer = document.querySelector('.grid-container')
const resetBtn = document.querySelector('.reset');
const clearBtn = document.querySelector('.clear');
const rainbowBtn = document.querySelector('.rainbow');

let currentSize = 16;
let style = "plain";

function startGrid (newSize) {

	if (newSize > 100) {newSize = 100;}
	else if (newSize <= 11) {newSize = 12;}

	//clear the current grid since we also use this for reseting
	const currentField = document.querySelectorAll('.grid-column');
	for(let i=0; i< currentField.length; i++)
		{currentField[i].remove();}

	for(let c = 0; c < newSize; c++)
	{	
		const newCol = document.createElement("div");
		newCol.classList.add("grid-column");
		gridContainer.appendChild(newCol);

		for(let r = 0; r < newSize - 5; r++)
		{
			const newCell = document.createElement("div");
			newCell.classList.add("grid-cell");
			newCell.addEventListener('mouseover', () => newCell.classList.add("activeCell"));
			
			newCol.appendChild(newCell);
		}
	}
	style = "plain";
}

function resizeGrid () {

	//i had to change the aspect ratio to fit an E&S so our minimum rose to 12 columns
	let newSize = prompt("Please enter a new grid size. 12 - 100");
	if (newSize > 100) {newSize = 100;}
	else if (newSize <= 11) {newSize = 12;}

	currentSize = newSize;

	const currentField = document.querySelectorAll('.grid-column');
	for(let i=0; i< currentField.length; i++)
		{currentField[i].remove();}

	//the only difference between Grid versions is the mouseover Event Listener function
	for(let c = 0; c < newSize; c++)
	{	
		const newCol = document.createElement("div");
		newCol.classList.add("grid-column");
		gridContainer.appendChild(newCol);

		for(let r = 0; r < newSize - 5; r++)
		{
			const newCell = document.createElement("div");
			newCell.classList.add("grid-cell");
			newCell.addEventListener('mouseover', () => newCell.classList.add("activeCell"));
			
			newCol.appendChild(newCell);
		}
	}
	style = "plain";
}

function rainbowGrid () {

	let newSize = prompt("Please enter a new grid size. 12 - 100");
	if (newSize > 100) {newSize = 100;}
	else if (newSize <= 11) {newSize = 12;}

	currentSize = newSize;

	const currentField = document.querySelectorAll('.grid-column');
	for(let i=0; i< currentField.length; i++)
		{currentField[i].remove();}

	for(let c = 0; c < newSize; c++)
	{	
		const newCol = document.createElement("div");
		newCol.classList.add("grid-column");
		gridContainer.appendChild(newCol);

		// random color assignment on mouseover event doesn't use a class, so, if a clear is requested,
		// I need to replace this grid using the global size variable
		for(let r = 0; r < newSize - 5; r++)
		{
			const newCell = document.createElement("div");
			newCell.classList.add("grid-cell");
			newCell.addEventListener('mouseover', () => {
				let randomColor = Math.floor(Math.random()*16777215).toString(16);
				newCell.style.backgroundColor = "#" + randomColor;
			});
			newCol.appendChild(newCell);
		}
	}
	style = 'rainbow';
}

function rainbowDeclareGrid (newSize) {

	if (newSize > 100) {newSize = 100;}
	else if (newSize <= 11) {newSize = 12;}

	const currentField = document.querySelectorAll('.grid-column');
	for(let i=0; i< currentField.length; i++)
		{currentField[i].remove();}

	for(let c = 0; c < newSize; c++)
	{	
		const newCol = document.createElement("div");
		newCol.classList.add("grid-column");
		gridContainer.appendChild(newCol);

		//random color assignment on mouseover event
		for(let r = 0; r < newSize - 5; r++)
		{
			const newCell = document.createElement("div");
			newCell.classList.add("grid-cell");
			newCell.addEventListener('mouseover', () => {
				let randomColor = Math.floor(Math.random()*16777215).toString(16);
				newCell.style.backgroundColor = "#" + randomColor;
			});
			newCol.appendChild(newCell);
		}
	}
	style = 'rainbow';
}

function clearGrid() {
	if(style == 'plain')
		startGrid(currentSize);
	else rainbowDeclareGrid(currentSize);
}


resetBtn.addEventListener('click', resizeGrid);
clearBtn.addEventListener('click', clearGrid);
rainbowBtn.addEventListener('click', rainbowGrid);


startGrid(currentSize);