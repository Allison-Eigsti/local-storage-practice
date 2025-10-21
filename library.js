import { libraryWrapper, saveToLocalStorage, singlePalette, saveBtn } from "./index.js";


function load() {
    let loadExistingPalettes = JSON.parse(localStorage.getItem('allPalettes')) || [];

    if (loadExistingPalettes.length === 0) {
        window.alert('No existing palettes');
    }
    else {        
        loadExistingPalettes.forEach(palette => {
            let paletteInfo = document.createElement('div');
            paletteInfo.classList.add('palette-wrapper');
            paletteInfo.innerHTML = `
            <h2 class="palette-title">${palette.title}</h2>
        <div class="box" id="color1" style="background-color: ${palette.colors[0]};">${palette.colors[0]}</div>
            <input type="color" id="colorPicker1" style="display: none;">
        <div class="box" id="color2" style="background-color: ${palette.colors[1]};">${palette.colors[1]}</div>
            <input type="color" id="colorPicker2" style="display: none;">        
        <div class="box" id="color3" style="background-color: ${palette.colors[2]};">${palette.colors[2]}</div>
            <input type="color" id="colorPicker3" style="display: none;">
        <div class="box" id="color4" style="background-color: ${palette.colors[3]};">${palette.colors[3]}</div>
            <input type="color" id="colorPicker4" style="display: none;">`
        
        // <div class="btn-wrapper">
        // <button class="btn-delete" onclick="deletePalette('${palette}')">Delete</button>
        // </div>`

            libraryWrapper.appendChild(paletteInfo);

            // const dropDown = document.getElementById('drop-down');
            // document.addEventListener('click', (e) => {
            //     if (e.target.matches('.select')) {
            //         dropDown.classList.toggle('closed');
            //         console.log(dropDown);
            //     };
            // })
        });

        // dynamically edit color palettes
        for (let i = 1; i <= 4; i++) {
            let color = document.getElementById(`color${i}`);
            let picker = document.getElementById(`colorPicker${i}`);
            let initialColor = color.textContent;
            let paletteTitle = document.querySelector('.palette-title').textContent;
            
            if (color && picker) {
                color.addEventListener('click', () => {
                    picker.click();
                })
            
                picker.addEventListener('input', (event) => {
                    const colorValue = event.target.value;
                    color.style.backgroundColor = colorValue;
                    color.textContent = colorValue;
                    singlePalette.colors[i - 1] = colorValue;
                    if (initialColor !== colorValue) {
                        editLocalStorage(paletteTitle, colorValue, initialColor);
                    }
                })
            }
        }
    }
}

function editLocalStorage(paletteTitle, colorValue, initialColor) {
    let loadExistingPalettes = JSON.parse(localStorage.getItem('allPalettes')) || [];
    let palette = loadExistingPalettes.find((palette) => palette.title === paletteTitle);
    let index = palette.colors.findIndex((color) => color === initialColor);
    palette.colors.splice(index, 1, colorValue);

    localStorage.setItem('allPalettes', JSON.stringify(loadExistingPalettes));
}


function editPalette(palette) {
    const paletteToEdit = JSON.parse(localStorage.getItem('allPalettes'));
    console.log(paletteToEdit);
}

function deletePalette(palette) {
    const paletteToEdit = JSON.parse(localStorage.getItem('palette'));
    console.log(paletteToEdit);
}


export { load };