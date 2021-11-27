const root = document.getElementById('root');
const speed = document.getElementById('speed')
const size = document.getElementById('size');
const start = document.getElementById('start');
const random = document.getElementById('random');
const reverseBtn = document.getElementById('reverse');

reverseBtn.addEventListener('click', () => {
    const array = getArray(size.value? size.value : Math.floor(Math.random() * 100));
    array.sort((a, b) => a.value - b.value);
    display(array);
    reverse(array);

});
random.addEventListener('click', () => {
    const array = getArray(Math.floor(Math.random() * 100));
    display(array);
    sort(array);
})

start.addEventListener('click', () => {
    const array = getArray(size.value ? size.value : 10);
    display(array);
    sort(array);
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
        await wait(speed.value ? speed.value : null);
    }
}
async function sort(array) {
    for (let i = 0; i < array.length; i++) {
        let swaps = 0;
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j].value > array[j + 1].value) {
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
                display(array)
                swaps++;
                await wait(speed.value ? speed.value : null);
            }
        }
        if (swaps === 0) break;
    }
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
        bar.className = 'bar';
        array.push({bar: bar, value: value });
    }
    return array;
}