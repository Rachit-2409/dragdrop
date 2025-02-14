let color = document.getElementById('color');
let add = document.getElementById('addbtn');
let list = document.getElementById('list');

let textattribute = {
    placeholder: 'Enter Your Content',
    cols: '30',
    rows: '10'
};

add.addEventListener('click', (e) => {
    e.preventDefault();

    let div = document.createElement('div');
    let span = document.createElement('span');
    let text = document.createElement('textarea');

    for (let x in textattribute) {
        text.setAttribute(x, textattribute[x]);
    }

    div.style.borderColor = color.value;
    span.innerText = 'x';
    span.setAttribute('class', 'close');
    div.setAttribute('class', 'notes');

    div.style.position = 'absolute'; // Ensure positioning for movement
    div.style.left = '50px';
    div.style.top = '50px';

    div.appendChild(span);
    div.appendChild(text);
    list.appendChild(div);
});

document.addEventListener('click', (event) => {
    if (event.target.classList.contains('close')) {
        event.target.parentNode.remove();
    }
});

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
    isDragging = false;
});