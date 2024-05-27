export function deleteSave(saveName) {
    let saves = localStorage.getItem('saves');
    const savesObj = JSON.parse(saves);

    for (let i = 0; i < savesObj.length; i++) {
        if (savesObj[i].name === saveName) {
            savesObj.splice(i, 1);
        }
    }

    saves = JSON.stringify(savesObj);
    localStorage.setItem("saves", saves);
    location.reload();
}

export function download(file, button)
{
    button.href = file;
    button.click();
}

export function save(saveName, data) {
    let saves = localStorage.getItem("saves");
    if (saves === null)
    {
        saves = "[]"
    }

    const savesObj = JSON.parse(saves);
    for (let i = 0; i < savesObj.length; i++) {
        if (savesObj[i].name === saveName)
        {
            savesObj.data = data;
            saves = JSON.stringify(savesObj);
            localStorage.setItem("saves", saves);
            location.reload();
            return;
        }
        
    }
    savesObj.push({name:saveName, data:data});
    saves = JSON.stringify(savesObj);
    localStorage.setItem("saves", saves);
    location.reload();
}

export function loadSaves(btnNewSave) {
    const saves = localStorage.getItem("saves");
    if (saves !== null) {
        const savesObj = JSON.parse(saves);
        for (let i = 0; i < savesObj.length; i++) {
            const dropdowns = document.getElementsByClassName("dropdown-menu")
            for (let j = 0; j < dropdowns.length; j++) {
                const li = document.createElement('li');
                if (dropdowns[j].id === "new-save-dropdown") {
                    const a = document.createElement('a');
                    a.className = "dropdown-item";
                    a.href = "#";
                    a.textContent = savesObj[i].name;
                    li.appendChild(a);
                    dropdowns[j].insertBefore(li, btnNewSave.parentElement)
                }
                else {
                    const div = document.createElement('div');
                    div.className = "load-save dropdown-item d-flex justify-content-between"
                    div.dataset.name = savesObj[i].name;
                    const p = document.createElement('p');
                    p.textContent = savesObj[i].name;
                    div.appendChild(p);
                    const a = document.createElement('a');
                    a.className = "delete-save text-reset text-decoration-none"
                    a.href = '#';
                    const icon = document.createElement('i');
                    icon.className = "far fa-trash-alt";
                    a.appendChild(icon);
                    div.appendChild(a);
                    li.appendChild(div);
                    dropdowns[j].appendChild(li);
                }
            }
        }
    }
}

export function loadSave(saveName, context, posX, posY) {
    let saves = localStorage.getItem('saves');
    const savesObj = JSON.parse(saves);

    for (let i = 0; i < savesObj.length; i++) {

        if (savesObj[i].name === saveName) {
            context.clearRect(0, 0, posX , posY);
            const data = savesObj[i].data;

            const img = new Image();
            img.onload = () => {
                context.drawImage(img, 0, 0);
            }
            img.src = data;

        }
    }
}