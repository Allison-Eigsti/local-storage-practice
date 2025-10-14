const color1 = document.getElementById('color1');
const color2 = document.getElementById('color2');
const color3 = document.getElementById('color3');
const color4 = document.getElementById('color4');

const colorPicker1 = document.getElementById('colorPicker1');
const colorPicker2 = document.getElementById('colorPicker2');
const colorPicker3 = document.getElementById('colorPicker3');
const colorPicker4 = document.getElementById('colorPicker4');

const singlePalette = {
    title: '',
    colors: ['', '', '', '']
}

const libraryWrapper = document.getElementById('library-wrapper');


document.addEventListener('DOMContentLoaded', () => {
    for (let i = 1; i <= 4; i++) {
        const color = document.getElementById(`color${i}`);
        const picker = document.getElementById(`colorPicker${i}`);

        if (color && picker) {
            color.addEventListener('click', () => {
                picker.click();
            })

            picker.addEventListener('input', (event) => {
                const colorValue = event.target.value;
                color.style.backgroundColor = colorValue;
                singlePalette.colors[i - 1] = colorValue;
            })
        }
    }

    if (libraryWrapper) {
        load();
    }
})


function saveToLocalStorage() {
    const title = document.getElementById('palette-title').value || 'Untitled Palette';
    singlePalette.title = `${title}`;
    
    let newPalette = {...singlePalette, colors: [...singlePalette.colors]};

    let loadExistingPalettes = JSON.parse(localStorage.getItem('allPalettes')) || [];

    loadExistingPalettes.push(newPalette);

    localStorage.setItem('allPalettes', JSON.stringify(loadExistingPalettes));
    
    window.location.href= 'library.html';
};


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
        <div class="box" id="color2" style="background-color: ${palette.colors[1]};">${palette.colors[1]}</div>
        <div class="box" id="color3" style="background-color: ${palette.colors[2]};">${palette.colors[2]}</div>
        <div class="box" id="color4" style="background-color: ${palette.colors[3]};">${palette.colors[3]}</div>`

            libraryWrapper.appendChild(paletteInfo);
        });
        console.log(loadExistingPalettes);
    }
}
