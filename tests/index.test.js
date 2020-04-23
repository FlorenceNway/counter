document.body.innerHTML = `
    <h1>Counter exercise</h1>
	<div class="inc">
		<h4>Current step is: <span class="step_value">0</span></h4>
	</div>
	<form action="#" class="step_form">
		<label for="step">Step</label>
		<input type="number" id="step" value="1"/>
		<button>Set step</button>
	</form>
	<h2>Counter value</h2>
	<p class="counter_value">0</p>

	<div class="inc_dec">
		<button id="decrement">-</button>
		<button id="increment">+</button>
	</div>
	<div class="auto_inc_dec">
		<button id="auto_decrement">Auto Decrement</button>
		<button id="auto_increment">Auto Increment</button>
		<button id="stop_auto">Stop</button>	
    </div>
`;

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

//    input.addEventListener('change',(e) => {
//         if(Number.isInteger(e.target.value)){
//             step = e.target.value
//         }
//     })
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

const {
  fireEvent,
} = require("@testing-library/dom/dist/@testing-library/dom.umd.js");

const resetValues = () => {
  counter = 0;
  step = 0;
};

const wait = (time) => new Promise((resolve) => setTimeout(resolve, time));

describe("globals", () => {
  test("step should be an integer", () => {
    expect(Number.isInteger(step)).toBe(true);
  });

  test("counter should be an integer", () => {
    expect(Number.isInteger(counter)).toBe(true);
  });
});

// Exercise 1
describe("action", () => {
  afterEach(resetValues);

  test("action should be a function", () => {
    expect(typeof action).toEqual("function");
  });

  test("action with '+' param should increment counter", () => {
    step = 2;
    counter = 0;
    action("+");
    expect(counter).toEqual(2);
  });

  test("action with '-' param should decrement counter", () => {
    step = 5;
    counter = 8;
    action("-");
    expect(counter).toEqual(3);
  });

  test("action should update text in '.counter_value'", () => {
    step = 2;
    counter = 3;
    action("+");
    expect(counter).toEqual(5);
    expect(document.querySelector(".counter_value").innerText).toEqual(5);
  });
});

// Exercise 2
describe("Set step", () => {
  const form = document.querySelector(".step_form");
  const input = form.querySelector("input");
  const stepValueEl = document.querySelector(".step_value");

  afterEach(resetValues);

  test('click of "Set step" should update {step}', () => {
    input.value = 20;
    fireEvent.submit(form);

    expect(step).toEqual(20);
  });

  test('click of "Set step" should reset input value to 1', () => {
    input.value = 20;
    fireEvent.submit(form);

    expect(input.value).toEqual("1");
  });

  test("click of \"Set step\" should update text in '.step_value'", () => {
    input.value = 20;
    fireEvent.submit(form);

    expect(stepValueEl.innerText).toEqual(20);
  });
});

// Exercise 3
describe('click on "#decrement"', () => {
  const decBtn = document.querySelector("#decrement");
  afterEach(resetValues);

  test('click on "#decrement" should decrement counter by {step}', () => {
    counter = 5;
    step = 2;
    fireEvent.click(decBtn);

    expect(counter).toEqual(3);
  });

  test("'.counter_value' should be up to date", () => {
    step = 2;
    counter = 3;
    fireEvent.click(decBtn);

    expect(document.querySelector(".counter_value").innerText).toEqual(1);
  });
});

// Exercise 4
describe('click on "#increment"', () => {
  const incBtn = document.querySelector("#increment");
  afterEach(resetValues);

  test('click on "#increment" should increment counter by {step}', () => {
    step = 2;
    counter = 5;
    fireEvent.click(incBtn);

    expect(counter).toEqual(7);
  });

  test("'.counter_value' should be up to date", () => {
    step = 2;
    counter = 3;
    fireEvent.click(incBtn);

    expect(document.querySelector(".counter_value").innerText).toEqual(5);
  });
});

// Exercise 5
describe("click on #auto_decrement", () => {
  const decBtn = document.querySelector("#auto_decrement");
  afterEach(resetValues);

  test("every second {counter} should decrement by {step}", async () => {
    step = 1;
    counter = 3;
    fireEvent.click(decBtn);

    await wait(4000);

    expect(counter).toEqual(0);
  });

  test("'.counter_value' should be up to date", async () => {
    step = 2;
    counter = 3;
    fireEvent.click(decBtn);

    await wait(3000);

    expect(document.querySelector(".counter_value").innerText).toEqual(-1);
  });
});

// Exercise 6
describe("click on #auto_increment", () => {
  const incBtn = document.querySelector("#auto_increment");
  afterEach(resetValues);

  test("every second {counter} should increment by {step}", async () => {
    step = 1;
    counter = 3;
    fireEvent.click(incBtn);

    await wait(4000);

    expect(counter).toEqual(6);
  });

  test("'.counter_value' should be up to date", async () => {
    step = 2;
    counter = 3;
    fireEvent.click(incBtn);

    await wait(3000);

    expect(document.querySelector(".counter_value").innerText).toEqual(7);
  });
});

// Exercise 7
describe("click on #stop_auto", () => {
  const btn = document.querySelector("#stop_auto");
  const incBtn = document.querySelector("#auto_increment");
  afterEach(resetValues);

  test("should stop any auto incrementing", async () => {
    step = 3;
    counter = 3;
    fireEvent.click(incBtn);

    await wait(2000);

    const currentCounter = counter;

    fireEvent.click(btn);

    await wait(2000);

    expect(counter).toEqual(currentCounter);
  });
});
