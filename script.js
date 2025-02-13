let color = document.getElementById('color');
let add = document.getElementById('addbtn');
let list = document.getElementById('list');
let textattribute = {
    placeholder: 'Enter Your Content',
    cols: '30',
    rows: '10'
}





add.addEventListener('click', (e) => {
    /*------------------*/
    e.preventDefault();

    /*------------------*/
    let div = document.createElement('div');
    let span = document.createElement('span');
    let text = document.createElement('textarea');

    /*------------------*/
    for (let x in textattribute) {
        text.setAttribute(x, textattribute[x])
    }
    /*------------------*/

    div.style.borderColor = color.value;
    span.innerText = 'x';
    /*------------------*/
    span.setAttribute('class' , 'close')
    div.setAttribute('class', 'notes');
    div.appendChild(span);
    div.appendChild(text);

    /*------------------*/
    list.appendChild(div);

});

document.addEventListener('click',(event)=>{
    if(event.target.classList.contains('close')){
        event.target.parentNode.remove()
    }
})


let cursor = {
    x : null,
    y : null
}

let note = {
    dom : null,
    x : null,
    y : null
}

document.addEventListener('mousedown', (event)=>{
        if(event.target.classList.contains('notes')){
            cursor = {
                x : event.clientX,
                y : event.clientY
            }
            note = {
                dom : event.target,
                x : event.target.getBoundingClientRect().left,
                y : event.target.getBoundingClientRect().top
            }
        }
        console.table(cursor,note)
       
})  

document.addEventListener('mousemove', (event)=>{
    if(note.dom == null ) return ;

    let currentCursor = {
        x : event.clientX,
        y : event.clientY 
    }
    let distance = {
        x : currentCursor.x - cursor.x,
        y : currentCursor.y - cursor.y
    }

    note.dom.style.left = (note.x + distance.x) + 'px';
    note.dom.style.top = (note.y + distance.y) + 'px'

})