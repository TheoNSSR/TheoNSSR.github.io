/* 
    Theo Neusser
    IDA-P3C
    15.01.2024
    paint.js
*/

import { deleteSave, download, loadSaves, save, loadSave } from "./models/saves.js";



const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.height = window.innerHeight / 2;
canvas.width = window.innerWidth;

const btnClear = document.getElementById('btn-clear');
const btnDownload = document.getElementById('btn-download');
const btnNewSave = document.getElementById("new-save");
const deleteButtons = document.getElementsByClassName("delete-save")

const loadButtons = document.getElementsByClassName('load-save');

const rect = canvas.getBoundingClientRect();

let canDownload = false;

loadSaves(btnNewSave);

window.addEventListener('deviceorientation', (e) => {
    let x = e.alpha;
    let y = e.beta;
    if (x > 180)
    {
        x = 180 - x;
    }
    let obj = {x: x / 250, y: y / 250};
    setPosition(obj);
    draw(obj);

}, false);

canvas.addEventListener('touchmove', (e) => {
    draw(e);
}, false);

canvas.addEventListener('touchstart', (e) => {
    setPosition(e);
}, false);

btnClear.addEventListener('click', clear)
btnDownload.addEventListener('click', (e) => {
    downloadEvent(e);
}, false);
btnNewSave.addEventListener('click', () => {
    const data = canvas.toDataURL();
    const saveName = prompt("Save name: ")
    save(saveName, data)
});

for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener('click', () => {
        deleteSave(deleteButtons[i].parentElement.dataset.name);
    })
}

for (let i = 0; i < loadButtons.length; i++) {
    loadButtons[i].addEventListener('click', () => {
        const posX = canvas.width;
        const posY = canvas.height;
        loadSave(loadButtons[i].dataset.name, ctx, posX, posY);
    })
}


let pos = { x: canvas.width / 2, y: canvas.height / 2 };

function setPosition(e) {
    if (pos.x - e.x > 0 || pos.x - e.x < canvas.width)
    {
        pos.x -= e.x;
    }
    if (pos.y - e.y > 0 || pos.y - e.y < canvas.height)
    {
        pos.y -= e.y
    }
}

function draw(e) {
    // mouse left button must be pressed
  
    ctx.beginPath(); // begin
  
    ctx.moveTo(pos.x, pos.y); // from
    setPosition(e);
    ctx.lineTo(pos.x, pos.y); // to
  
    ctx.stroke(); // draw it!
    ctx.closePath();
}

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pos = { x: canvas.width / 2, y: canvas.height / 2 };
}

function downloadEvent(e) {
    if (!canDownload)
    {
        canDownload = !canDownload;
        download(canvas.toDataURL("image/png"), btnNewSave)
        e.preventDefault();
    }
    canDownload = !canDownload;
}