const grid = document.querySelector('#grid')
const gridSizeBtn = document.querySelector('.gridSize')
const modal = document.querySelector('#modal')
const modalBtn = document.querySelector('#modalBtn')
const gridNumber = document.querySelector('#gridNumber')
const newGridBtn = document.querySelector('.clearGrid')

let num = 0

document.addEventListener('onload', drawGrid(16))

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


grid.addEventListener('mousedown', ()=>{
    grid.addEventListener('mouseover',startLine)

})

grid.addEventListener('mouseup', stopLine)

function startLine(e){
    e.target.style.backgroundColor = 'black'
}   

function stopLine(){
    grid.removeEventListener('mouseover',startLine)
}