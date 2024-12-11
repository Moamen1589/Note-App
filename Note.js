"use strict";
let form = document.getElementById('form');
let subBtn = document.getElementById('submit');
let texInput = document.getElementById('text');
let content = document.getElementById('textarea');
let notesCon = document.querySelector('.notes');

if (!window.localStorage.getItem('titleandcontent')) {
    window.localStorage.setItem('titleandcontent', JSON.stringify({}));
}

form.onsubmit = function (e) {
    e.preventDefault();
};

function createElement() {
    subBtn.addEventListener('click', () => {
        let titleValue = texInput.value.trim();
        let contentValue = content.value.trim();

        if (!titleValue || !contentValue) {
            alert('Both fields are required!');
            return;
        }


        let add = JSON.parse(window.localStorage.getItem('titleandcontent'))
        let newNote = document.createElement('div');
        let title = document.createElement('h3');
        let noteText = document.createElement('p');
        let del = document.createElement('button');
        newNote.classList.add('new-note')
        title.textContent = titleValue;
        noteText.textContent = contentValue;
        Object.defineProperty(add, titleValue, {
            value: contentValue,
            writable: true,
            configurable: true,
            enumerable: true,
        });
        window.localStorage.setItem('titleandcontent', JSON.stringify(add));

        del.style.backgroundColor = 'red';
        del.style.color = 'white';
        del.textContent = 'Delete';
        del.style.cursor = 'pointer';
        del.style.border = 'none';
        del.style.padding = '10px';
        newNote.appendChild(title);
        newNote.appendChild(noteText);
        newNote.appendChild(del);
        notesCon.appendChild(newNote);

        del.addEventListener('click', () => {
            const storedData = JSON.parse(window.localStorage.getItem('titleandcontent'));
            if (title.textContent.trim() === titleValue) {
                delete storedData[titleValue];
                window.localStorage.setItem('titleandcontent', JSON.stringify(storedData));
                newNote.remove();
            }
        });

        texInput.value = '';
        content.value = '';
    });
}

createElement();

if (window.localStorage.getItem('titleandcontent')) {
    local(JSON.parse(window.localStorage.getItem('titleandcontent')));
}

function local(localobj) {
    for (let [key, value] of Object.entries(localobj)) {
        let newNote = document.createElement('div');
        newNote.classList.add('new-note')
        let title = document.createElement('h3');
        let noteText = document.createElement('p');
        let del = document.createElement('button');
        title.textContent = key;
        noteText.textContent = value;
        del.style.backgroundColor = 'red';
        del.style.color = 'white';
        del.textContent = 'Delete';
        del.style.cursor = 'pointer';
        del.style.border = 'none';
        del.style.padding = '10px';

        newNote.appendChild(title);
        newNote.appendChild(noteText);
        newNote.appendChild(del);
        notesCon.appendChild(newNote);

        del.addEventListener('click', () => {
            const storedData = JSON.parse(window.localStorage.getItem('titleandcontent'));
            if (title.textContent.trim() === key.trim()) {
                delete storedData[key];
                window.localStorage.setItem('titleandcontent', JSON.stringify(storedData));
                newNote.remove();
            }
        });
    }
}
