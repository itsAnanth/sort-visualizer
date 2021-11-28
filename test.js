const root = document.getElementById('root');
// const speed = document.getElementById('speed')
const size = document.getElementById('size');
const start = document.getElementById('start');
const select = document.getElementById('algs');
const generate = document.getElementById('gen');
const algorithms = [bubbleSort, insertionSort];

let toSort = null;
// const random = document.getElementById('random');
// const reverseBtn = document.getElementById('reverse');


// var randomColor = () => "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
// reverseBtn.addEventListener('click', () => {
//     const array = getArray(size.value? size.value : Math.floor(Math.random() * 100));
//     array.sort((a, b) => a.value - b.value);
//     display(array);
//     reverse(array);

// });
// random.addEventListener('click', () => {
//     const array = getArray(Math.floor(Math.random() * 100));
//     display(array);
//     sort(array);
// })

generate.addEventListener('click', () => {
    toSort = getArray(size.value ? size.value : 10);
    display(toSort);
})
start.addEventListener('click', () => {
    const array = !toSort ? getArray(size.value ? size.value : 10) : toSort;
    display(array);
    algorithms[select.value](array);
});
// sort();

function wait(seconds){
    let time = seconds ? seconds * 1000 : 2;
	return new Promise(res => setTimeout(res, time));
};

async function reverse(array) {
    for (let i = 0; i < array.length / 2; i++) {
        let temp = array[i];
        array[i] = array[array.length - 1 - i];
        array[array.length - 1 - i] = temp;
        display(array);
        await wait(null);
    }
}
async function bubbleSort(array) {
    for (let i = 0; i < array.length; i++) {
        let swaps = 0;
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j].value > array[j + 1].value) {
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
                display(array)
                swaps++;
                await wait(null);
            }
        }
        if (swaps === 0) break;
    }
    handleFinish();
}


async function insertionSort(array) {
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let ptr = i - 1;
        while (ptr >= 0 && key.value < array[ptr].value) {
           
            array[ptr + 1] = array[ptr];
            ptr--;
            display(array);
            await wait(null);
        }
        array[ptr + 1] = key;
        display(array);
        await wait(null)
    }
    handleFinish();
}

function remove() {
    root.innerHTML = '';
}

function display(array) {
    remove();
    for (let i = 0; i < array.length; i++) {
        root.append(array[i].bar);
    }
}
function getArray(size) {
    const array = [];
    for (let i = 0; i < size; i++) {
        const bar = document.createElement('bar');
        const value = Math.floor(Math.random() * 50) + 5;
        bar.style.height = `${value}px`;
        bar.style.backgroundColor = `rgb(255,0,0, ${1 - 1 / 10})`;
        bar.className = 'bar';
        array.push({bar: bar, value: value });
    }
    return array;
}

function handleFinish() {
    toSort = null;
}