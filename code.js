const grid = document.querySelector('#grid')
const gridSizeBtn = document.querySelector('.gridSize')
const modal = document.querySelector('#modal')
const modalBtn = document.querySelector('#modalBtn')
const gridNumber = document.querySelector('#gridNumber')
const newGridBtn = document.querySelector('.clearGrid')
const radioBtns = document.querySelectorAll('input[name = "radioGroup"]')
let num = 0
let lineColor, rainbowHUE = 0

radioBtns.forEach( radio =>{
    radio.addEventListener('change', ()=>{
        getSelectedOpt(radio.value)
    })
})


document.addEventListener('onload', drawGrid(16), getSelectedOpt('draw')) // Draw the first grid

gridSizeBtn.addEventListener('click', ()=> {
    modal.showModal()
})

newGridBtn.addEventListener('click', clearGrid)

modalBtn.addEventListener('click', ()=> {
    
    if (gridNumber.value < 16 || gridNumber.value > 100) {
        gridNumber.style.border = '3px solid red'
        gridNumber.value = ''
        return
    }
    if (!gridNumber.value < 16) {
        num = gridNumber.value
        gridNumber.style.border = ''
        gridNumber.value = ''
        newGrid()
        drawGrid(num)
        modal.close()
    }
})

function drawGrid(num){
    
    for (let index = 0; index < (num * num) ; index++) {
        let newDiv = document.createElement('div')
        newDiv.style.width = `calc(100% / ${num})`
        // newDiv.style.border = "1px solid black"
        newDiv.style.backgroundColor = "var(--light-gray)"
        
        grid.appendChild(newDiv)
    }
}

function clearGrid(){
    let gridDiv = grid.getElementsByTagName('div')
    
    gridDiv = Array.from(gridDiv)
    
    gridDiv.forEach( div=> {
        div.style.backgroundColor = "var(--light-gray)"
    })
}

function newGrid(){
    let gridDiv = grid.getElementsByTagName('div')

    gridDiv = Array.from(gridDiv)
    
    gridDiv.forEach( div=> {
        div.parentNode.removeChild(div)
    })
}

function getSelectedOpt(opt = "draw"){
    if (opt == 'draw') {
        document.querySelector('input[type ="color"]').addEventListener('input', event =>{
            lineColor = event.target.value
        })
        console.log(opt)
        lineColor = document.querySelector('input[type ="color"]').value
        grid.removeEventListener('mouseover', rainbowColor)
    }
    if (opt == 'rainbow') {
        
        grid.addEventListener('mouseover', rainbowColor)
        
    }
    if (opt === 'shader') {
        console.log(opt)
    }
    if (opt === 'eraser') {
        lineColor = "var(--light-gray)"
    }
}

function rainbowColor(){
    rainbowHUE += 1
    if(rainbowHUE > 350) rainbowHUE = 0
    console.log(rainbowHUE)
    
    return lineColor = `hsl(${rainbowHUE}, 80%, 45%)`
    
}
// ----------------------------------- MOUSE EVENT -----------------------------
grid.addEventListener('mousedown', ()=>{
    grid.addEventListener('mouseover',startLine)
})

function startLine(e){
    e.target.style.backgroundColor = `${lineColor}`
}   

grid.addEventListener('mouseup', stopLine)

function stopLine(){
    grid.removeEventListener('mouseover',startLine, )
}