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
        if(Number.isInteger(e.target.value)){
            step = e.target.value
        }
    })

    setStepBtn.addEventListener('click', (e) => {
        step_value.innerText = step;
        input.value= 1;
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

