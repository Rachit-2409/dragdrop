let color = document.getElementById('color');
let add = document.getElementById('addbtn');
let list = document.getElementById('list');

let textattribute = {
    placeholder: 'Enter Your Content',
    cols: '30',
    rows: '10'
};

// Load saved notes on page load
window.onload = () => {
    if (localStorage.getItem('data')) {
        list.innerHTML = localStorage.getItem('data');
        addEventListenersToExistingNotes();
    }
};

// Function to add a note
add.addEventListener('click', (e) => {
    e.preventDefault();
    createNote();
    saveData();
});

// Create a new note
function createNote(content = "", colorValue = color.value, position = { left: "50px", top: "50px" }) {
    let div = document.createElement('div');
    let span = document.createElement('span');
    let text = document.createElement('textarea');

    for (let x in textattribute) {
        text.setAttribute(x, textattribute[x]);
    }

    text.value = content; // Restore previous content if available
    div.style.borderColor = colorValue;
    span.innerText = 'x';
    span.setAttribute('class', 'close');
    div.setAttribute('class', 'notes');

    // Ensure positioning for movement
    div.style.position = 'absolute';
    div.style.left = position.left;
    div.style.top = position.top;

    div.appendChild(span);
    div.appendChild(text);
    list.appendChild(div);

    addEventListenersToNote(div);
}

// Save data to localStorage
function saveData() {
    localStorage.setItem('data', list.innerHTML);
}

// Add event listeners to all existing notes after loading
function addEventListenersToExistingNotes() {
    document.querySelectorAll('.notes').forEach(note => {
        addEventListenersToNote(note);
    });
}

// Add drag & delete functionality to a note
function addEventListenersToNote(note) {
    note.querySelector('.close').addEventListener('click', (event) => {
        event.target.parentNode.remove();
        saveData();
    });

    note.querySelector('textarea').addEventListener('input', saveData);
}

// Dragging functionality
let cursor = { x: null, y: null };
let note = { dom: null, x: null, y: null };
let isDragging = false;

document.addEventListener('mousedown', (event) => {
    if (event.target.classList.contains('notes')) {
        isDragging = true;
        cursor = { x: event.clientX, y: event.clientY };
        note = {
            dom: event.target,
            x: event.target.offsetLeft,
            y: event.target.offsetTop
        };
    }
});

document.addEventListener('mousemove', (event) => {
    if (!isDragging || !note.dom) return;

    let distanceX = event.clientX - cursor.x;
    let distanceY = event.clientY - cursor.y;

    note.dom.style.left = note.x + distanceX + 'px';
    note.dom.style.top = note.y + distanceY + 'px';
});

document.addEventListener('mouseup', () => {
    if (isDragging) {
        saveData(); // Save updated position in localStorage
    }
    isDragging = false;
});
