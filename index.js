let step = 0;
let counter = 0;

const step_value = document.querySelector('.step_value')

const action = (symbol) => {
    if(symbol == '+') {
        counter = counter + step;
    }else {
        counter = counter - step;
    }
    const counter_value = document.querySelector('.counter_value')
    counter_value.innerText = counter;
}

const handleSetStep = () => {
    const setStepBtn = document.querySelector('.step_form button')
    const input = document.querySelector('#step');
    step = input.value;

    input.addEventListener('change',(e) => {
        step = e.target.value
    })

    setStepBtn.addEventListener('click', (e) => {
        step_value.innerText = step;
        
        input.value = 1;
    })
}

const decrementBtn = document.querySelector('#decrement')
    decrementBtn.addEventListener('click',(e) => {
        step = parseInt(step_value.innerText)
            action('-')
        
    })


const incrementBtn = document.querySelector('#increment')
    incrementBtn.addEventListener('click',(e) => {
        step = parseInt(step_value.innerText)
            action("+")
        
    })


//--- Auto Increment Button ----    
let id;
const autoDecrementBtn = document.querySelector('#auto_decrement')
//const dec_interval = setInterval(auto_dec, 1000)
function auto_dec() {
    step = parseInt(step_value.innerText)
    console.log(step)
    action("-")
}
    
const dec_interval = autoDecrementBtn.addEventListener('click', (e) => {
        clearInterval(id)
        id = setInterval(auto_dec, 1000)
})
    
//--- Auto increment Button ------
const autoIncrementBtn = document.querySelector('#auto_increment')

function auto_inc() {
    step = parseInt(step_value.innerText)
    console.log(step)
    action("+")
}

const inc_interval = autoIncrementBtn.addEventListener('click', (e) => {
    clearInterval(id)
    id = setInterval(auto_inc, 1000)
})


