const add_yoda = document.querySelector('#add_yoda');
const subtract_yoda = document.querySelector('#subtract_yoda');
let quantity_yoda = 0;
quantity_yoda = document.querySelector('#quantity_yoda');
let total_yoda = document.querySelector('#total_yoda');
let price_yoda = parseFloat(document.querySelector("#price_yoda").innerHTML);

add_yoda.addEventListener('click', () => {
    quantity_yoda.value = Number(quantity_yoda.value) + 1;
    total_yoda.textContent = calcularTotal(price_yoda, quantity_yoda.value);
});

subtract_yoda.addEventListener('click', () => {
    quantity_yoda.value > 0 ? quantity_yoda.value = Number(quantity_yoda.value) - 1 : quantity_yoda.value;
    total_yoda.textContent = calcularTotal(price_yoda, quantity_yoda.value);
});

function calcularTotal(price, quantity){
    newTotal = price * quantity;
    return newTotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}