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

const HandleSetStep = () => {
    const form = document.querySelector('.step_form')
    const input = document.querySelector('#step');
    step = parseInt(input.value)

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        step = Number(input.value);
        step_value.innerText = step;
        input.value = 1;
    })
}
    
HandleSetStep();

const decrementBtn = document.querySelector('#decrement')
    decrementBtn.addEventListener('click',(e) => {
            action('-')
        
    })


const incrementBtn = document.querySelector('#increment')
    incrementBtn.addEventListener('click',(e) => {
            action("+")
        
    })


//--- Auto Decrement Button ----    
let id;
const autoDecrementBtn = document.querySelector('#auto_decrement')
//const dec_interval = setInterval(auto_dec, 1000)
function auto_dec() {
    action("-")
}
    
const dec_interval = autoDecrementBtn.addEventListener('click', (e) => {
        clearInterval(id)
        id = setInterval(auto_dec, 1000)
})
    

//--- Auto Increment Button ------
const autoIncrementBtn = document.querySelector('#auto_increment')

function auto_inc() {
    action("+")
}

const inc_interval = autoIncrementBtn.addEventListener('click', (e) => {
    clearInterval(id)
    id = setInterval(auto_inc, 1000)
})


/*
 * the auto counter should stop
 */
const autoStopBtn = document.querySelector('#stop_auto')
autoStopBtn.addEventListener('click', (e) => {
    clearInterval(id)
})
