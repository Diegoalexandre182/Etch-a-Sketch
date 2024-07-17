const grid = document.querySelector('#grid')
const gridSizeBtn = document.querySelector('.gridSize')
const modal = document.querySelector('#modal')
const modalBtn = document.querySelector('#modalBtn')
const gridNumber = document.querySelector('#gridNumber')
const newGridBtn = document.querySelector('.clearGrid')
const radioBtns = document.querySelectorAll('input[name = "radioGroup"]')
let lineColor, rainbowHUE = 0, num = 16

function drawGrid(num){ // CREATE GRID AND PREVENT DRAGGING
    
    for (let index = 0; index < (num * num) ; index++) {
        let newDiv = document.createElement('div')
        newDiv.style.width = `calc(100% / ${num})`
        // newDiv.style.border = "1px solid black"
        newDiv.style.backgroundColor = 'rgb(255, 255, 255)'  
        newDiv.setAttribute('draggable','false')
        newDiv.addEventListener('dragstart', (event) => event.preventDefault() )
        grid.append(newDiv)
    }
}

function dinamicGrid(){ // ARRAY WITH ALL GRID DIVS
    return Array.from( grid.getElementsByTagName('div'))
}

function clearGrid(){ // RESET BGCOLOR AND OPACITY
    
    dinamicGrid().forEach( div=> {
        div.style.backgroundColor = "rgb(255, 255, 255)"
        div.style.opacity = ''
    })
}

function newGrid(){ // REMOVE ALL GRID DIVS
    
    dinamicGrid().forEach( div=> {
        div.parentNode.removeChild(div)
    })
}

function getSelectedOpt(opt){ // MANAGES DRAWING OPTIONS

    stopEvents()  
    
    if (opt === 'draw') {  
      
        lineColor = document.querySelector('input[type ="color"]').value
        document.querySelector('input[type ="color"]').addEventListener('input', event =>{
            lineColor = event.target.value
        })
    }
    
    if (opt === 'rainbow') {

        dinamicGrid().forEach(div => div.addEventListener('mouseenter', generateRainbow)) 
    }
    
    if (opt === 'shader') {
        
        grid.addEventListener('mousedown', addShaderEvent)

        grid.addEventListener('mouseup', () => {
            dinamicGrid().forEach(div => div.removeEventListener('mouseover', changeOpacity))
        })    
    }
        
    if (opt === 'eraser') {

        grid.addEventListener('mousedown',addEraserEvent)

        grid.addEventListener('mouseup', () => {
            dinamicGrid().forEach(div => div.removeEventListener('mouseover', eraseLine))
        })
    }
} 

function addShaderEvent(){
    dinamicGrid().forEach(div => div.addEventListener('mouseover', changeOpacity))
}

function addEraserEvent(){ 
    dinamicGrid().forEach(div => div.addEventListener('mouseover',eraseLine))
}

function eraseLine(event){ // ERASER EFFECT
    lineColor = "rgb(255, 255, 255)"
    let currentOpacity = parseFloat(event.target.style.opacity) || 0.1
    if(currentOpacity < 1){
        currentOpacity = 1
        event.target.style.opacity = currentOpacity
    }
}

function changeOpacity(event){ // OPACITY EFFECT
    let currentOpacity = parseFloat(event.target.style.opacity) || 0.1;
    lineColor = event.target.style.backgroundColor

    if(lineColor === "rgb(255, 255, 255)") {
        lineColor = "rgb(0, 0, 0)"
        event.target.style.backgroundColor = lineColor
    }

    if(currentOpacity < 1){
        currentOpacity += 0.1
        event.target.style.opacity = currentOpacity
    }
}

function generateRainbow(){ // RAINBOW EFFECT
    rainbowHUE += 1
    if(rainbowHUE > 350) rainbowHUE = 0 
    lineColor =  `hsl(${rainbowHUE}, 80%, 45%)` 
    updateDotColor(`hsl(${rainbowHUE}, 80%, 45%)` )
    return lineColor  
}

function updateDotColor(color){ // DYNAMICALLY UPDATE DOT 
    const root = document.querySelector(':root')
    root.style.setProperty('--yellow-200', color)
}

function setLineColor(event){ // LINE COLOR
    event.target.style.backgroundColor = `${lineColor}`
}   

function stopEvents(){ // REMOVE ALL ACTIVE EFFECTS
    grid.removeEventListener('mousedown', addShaderEvent)
    grid.removeEventListener('mousedown', addEraserEvent)
    dinamicGrid().forEach(div => {       
        div.removeEventListener('mouseenter', generateRainbow)
    })
}

// -------------- EVENT LISTENER -------------------------------------------


document.addEventListener('DOMContentLoaded', () => { // Draw the first grid when the page is loaded
    drawGrid(num );
    getSelectedOpt('draw');
});

radioBtns.forEach( radio =>{ // RADIO LISTENER
    radio.addEventListener('change', ()=>{
        getSelectedOpt(radio.value)
    })
})

gridSizeBtn.addEventListener('click', ()=> modal.showModal())

modalBtn.addEventListener('click', ()=> {
    const inputValue = parseInt(gridNumber.value) 

    if (inputValue < 16 || inputValue > 100 || isNaN(inputValue)) {
        gridNumber.style.border = '3px solid red'
        gridNumber.value = ''
        gridNumber.style.outline = 'none'
        gridNumber.focus()
        return
    }
    if (!inputValue < 16) {
        num = inputValue
        gridNumber.style.border = ''
        gridNumber.value = ''
        newGrid()
        drawGrid(num)
        modal.close()
    }
})

newGridBtn.addEventListener('click', () => clearGrid())

grid.addEventListener('mousedown', ()=>{ // START  LINE
    dinamicGrid().forEach(div => div.addEventListener('mouseenter',setLineColor))
})
    
grid.addEventListener('mouseup', () => { // STOP  LINE
    dinamicGrid().forEach( div => div.removeEventListener('mouseenter', setLineColor))
})

grid.addEventListener('mouseleave', () => { //  STOP LINE WHEN CURSOR LEAVES GRID
    dinamicGrid().forEach( div => div.removeEventListener('mouseenter', setLineColor))
})