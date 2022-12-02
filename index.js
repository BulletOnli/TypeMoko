import { texts } from "./comp/sentences.js"

// const texts = ['hello world this is me and myself rovie i love you po', 'sfsdfsdfsdfwerwrwr']
const inputEl = document.querySelector('.input')
const sentenceContainer = document.querySelector('.sentences') // sentence element
// Timer Elements
const timerEl = document.querySelector('.timer')
const errorEl = document.querySelector('.errorEl')
// Buttons Elements
const start = document.querySelector('.start')
const reset = document.querySelector('.reset')
const change = document.querySelector('.change')
// Record Elements
const table = document.querySelector('table')

const closeBtn = document.querySelector('.fa-xmark')
const modalSection = document.querySelector('.modalSection')

// timer
let paused = true;
let seconds = 0;
let startTime = 0
let currentTime = 0

let index = 0 // counting index
let errors = 0 // Error count
let correct = 0
let totalclicks = 0

let span; // words container that has been splitted

start.addEventListener('click', () => {
    inputEl.focus()
    
    if (paused) {
        start.style.opacity = 0.5
        paused = false
        startTime = Date.now() - currentTime
        setInterval(timer)
    }  
})

reset.addEventListener('click', () => {
    resetGame()
})

change.addEventListener('click', () => {
    sentenceContainer.innerHTML = ''
    randomText()
})

// Manually focus the input element
sentenceContainer.addEventListener('click', () => {
    if (!paused) {
        inputEl.focus()
    }
})

function randomText() {
    const randomNum = Math.floor(Math.random() * texts.length)
    texts[randomNum].toLowerCase().split("").forEach(txt => {
        sentenceContainer.innerHTML += `<span>${txt}</span>`
    })
}

function checkInput() {
    inputEl.addEventListener('input', e => {
        span = sentenceContainer.querySelectorAll("span")
        const inputs = e.target.value.split("")

        if (inputs.length <= span.length) {
            if (inputs[index] == span[index].innerText) {
                span[index].style.color = '#FE9700'
                correct++
                totalclicks++
            } else {    
                span[index].style.color = 'red'
                errors++
                totalclicks++
                errorEl.textContent = `Errors: ${errors}`
            }
            index++
        }
        
        if (inputs.length == span.length) {
            renderRecord()
            resetGame()
        }

    })
}

randomText() 
checkInput()

function timer() {
    if (!paused) {
        currentTime = Date.now() - startTime
        seconds = Math.floor( (currentTime / 1000) % 60 )
        timerEl.textContent = `Time: ${seconds}s`

        if (seconds == 59) {
            renderRecord()
            resetGame()
        }
    }
}

function renderRecord() {
    document.querySelector('.notice').innerHTML = ''

    let accuracy = Math.floor((correct / span.length) * 100) 
    
    const tr = document.createElement('tr')
    tr.innerHTML += `
    <td>${seconds}s</td>
    <td>${errors}</td>
    <td>${accuracy}%</td>
    `
    table.appendChild(tr)
}

function resetGame() {
    inputEl.blur()
    inputEl.value = ''

    // Reset Timer
    paused = true
    seconds = 0
    currentTime = 0
    startTime = 0
    timerEl.textContent = `Time: 0s`
    clearInterval(timer)

    // Others
    index = 0
    errors = 0
    correct = 0
    start.style.opacity = 1
    errorEl.textContent = `Errors: 0`
    sentenceContainer.innerHTML = ''

    randomText()
}

closeBtn.addEventListener('click', () => {
    modalSection.classList.add('hideModal')
})