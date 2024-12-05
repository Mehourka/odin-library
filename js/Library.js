let myLibrary = [];

const form = document.querySelector("#bookinfo");

function Book(title, author, pages, isCompleted) {
	// Constructor
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.isCompleted = isCompleted === undefined ? false : isCompleted;
}

function addBookToLibrary(title, author, pages, isCompleted) {
	const newBook = new Book(title, author, pages, isCompleted);
	myLibrary.push(newBook);
	renderBooks();
}


function createCardButtons(card, book) {
	const container = document.createElement("div");
	container.className = "card-btn-container";

	const delete_button = document.createElement("button");
	delete_button.className = "card-delete-btn"
	delete_button.textContent = "X";

	const complete_button = document.createElement("button");
	complete_button.className = "card-complete-btn";
	complete_button.textContent = "toggleRead";

	delete_button.addEventListener("click", (event) => {
		myLibrary = myLibrary.filter(e => e != book);
		renderBooks();
	});

	complete_button.addEventListener("click", (event) => {
		book.isCompleted = !book.isCompleted;
		renderBooks();
	});

	container.appendChild(delete_button);
	container.appendChild(complete_button);
	return container;
}


function createBookCard(book) {
	// Creates a html card for the book
	const card = document.createElement("div");
	const buttons = createCardButtons(card, book);
	card.classList = "book card";
	if (book.isCompleted)
	{
		card.classList = card.classList + " completed";
	}
	card.innerHTML = `
		<h1>${book.title}</h1>
		<h3>${book.author}</h3>
		<p>${book.pages} pages</p>
	`
	card.appendChild(buttons);
	return card;
}

function renderBooks() {
	// Add the books to the DOM
	const cardContainer = document.getElementById("card-container");
	cardContainer.innerHTML = "";

	for(let book of myLibrary) {
		const newCard = createBookCard(book);
		cardContainer.appendChild(newCard);
	}
}

form.addEventListener("submit", (event) => {
	const form = event.target;
	if (! form instanceof HTMLFormElement) {
		console.error("Event target is not a form!");
		return;
	}

	event.preventDefault();

	const isCompleted = false;
	const formData = Object.fromEntries(
		new FormData(event.target)
	);
	addBookToLibrary(
		formData.title,
		formData.author,
		formData.pages,
		isCompleted
	);
	event.target.reset();
})

addBookToLibrary("Atomic Habbits","James Clear", "234", true);
addBookToLibrary("The art of living","Tin Hahn xo", "432", false);