//Modal Interaction
const addBook = document.querySelector('#add-new-book');
const dialog = document.querySelector('#modal');
const closeModalBtns = document.querySelectorAll('.close-modal, #cancel-button');

//Form Interaction
const form = document.querySelector('#modal form')
const bookAuthor = document.querySelector('#book-author');
const title = document.querySelector('#book-name');
const bookPages = document.querySelector('#book-pages');

//Boddy Interaction
const library = document.querySelector('.body');

document.addEventListener('DOMContentLoaded', () => {
    renderLibrary();
})

const myLibrary = [
    {
        name: "Harry Potter and the Sorcerer's Stone",
        author: "J.K. Rowling",
        pages: 320,
        read: true,
        id: crypto.randomUUID(),
    },
    {
        name: "To Kill a Mockingbird",
        author: "Harper Lee",
        pages: 300,
        read: false,
        id: crypto.randomUUID(),
    },
    {
        name: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        pages: 200,
        read: false,
        id: crypto.randomUUID(),
    },
    {
        name: "1984",
        author: "George Orwell",
        pages: 328,
        read: true,
        id: crypto.randomUUID(),
    }
];

function Book(name, author, pages, read) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}

function addBookToLibrary(name, author, pages, read) {
    const newBook = new Book(name, author, pages, read);
    myLibrary.push(newBook);
}

const renderSingleCard = (i) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.id = myLibrary[i].id;
    const name = document.createElement('h2');
    name.classList.add('name');
    const author = document.createElement('h3');
    author.classList.add('author');
    const pages = document.createElement('h4');
    pages.classList.add('pages');
    const cardButtons = document.createElement('div');
    cardButtons.classList.add('card-buttons');
    const delBtn = document.createElement('button');
    delBtn.classList.add('del-button');
    delBtn.dataset.id = myLibrary[i].id;
    const toggleBtn = document.createElement('button');
    toggleBtn.classList.add('toggle-button');
    toggleBtn.dataset.id = myLibrary[i].id;
    const read = document.createElement('h5');
    
    if (myLibrary[i].read) {
        read.classList.add('read', 'read-status');
        read.textContent = '✓ Read';
    }
    else {
        read.classList.add('not-read', 'read-status');
        read.textContent = '📖 Not read';
    }

    name.textContent = myLibrary[i].name;
    author.textContent = 'By ' + myLibrary[i].author;
    pages.textContent = myLibrary[i].pages + ' Pages';
    delBtn.textContent = "Remove";
    toggleBtn.textContent = "Toggle read";

    toggleBtn.style.backgroundColor = 'rgb(208, 237, 254)';
    delBtn.style.backgroundColor = 'rgb(254, 212, 212)';

    library.appendChild(card);
    cardButtons.append(toggleBtn, delBtn);
    card.append(name, author, pages, read, cardButtons);
}

const renderLibrary = () => {

    if (myLibrary.length == 0) {
        library.textContent = 'No books to show here';
    }
    else if (myLibrary.length > 0) {
        library.innerHTML = '';
        for (let i = 0; i <= myLibrary.length - 1; i++) {
            renderSingleCard(i);
        }
    }
}

library.addEventListener('click', (e) => {
    if (e.target.classList.contains('del-button')) {
        e.preventDefault();
        const idToDelete = e.target.dataset.id;
        const indexToDelete = myLibrary.findIndex((book) => book.id === idToDelete);

        if (indexToDelete === -1) {
            return;
        }

        myLibrary.splice(indexToDelete, 1);
        document.querySelector(`.card[data-id="${idToDelete}"]`).remove();

    } else if (e.target.classList.contains('toggle-button')) {
        e.preventDefault();

        const idToToggle = e.target.dataset.id;
        const indexToToggle = myLibrary.findIndex((book) => book.id == idToToggle);
        const read = document.querySelector(`.card[data-id="${idToToggle}"] .read-status`);

        if (indexToToggle === -1) {
            return;
        }

        if (!myLibrary[indexToToggle].read) {
            myLibrary[indexToToggle].read = true;
            read.classList.add('read');
            read.classList.remove('not-read');
            read.textContent = '✓ Read';
        } else {
            myLibrary[indexToToggle].read = false;
            read.classList.add('not-read');
            read.classList.remove('read');
            read.textContent = '📖 Not read';
        }
    }
})

addBook.addEventListener('click', (e) => {
    e.preventDefault();
    dialog.showModal();
})

closeModalBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        dialog.close();
    })
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const author = bookAuthor.value;
    const name = title.value;
    const pages = bookPages.value;
    let read = null;
    const selectedOption = document.querySelector('input[type="radio"]:checked');

    if (selectedOption.value == 'true') {
        read = true;
    } else {
        read = false;
    }

    addBookToLibrary(name, author, pages, read);
    renderLibrary();
    dialog.close();
    form.reset();
    
    console.log(myLibrary);
})

