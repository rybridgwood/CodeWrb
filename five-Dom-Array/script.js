//Event Listeners

const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const  doubleMoneyBtn= document.getElementById('double');
const  showMillionBtn= document.getElementById('show-millionaires');
const  sortBtn = document.getElementById('sort');
const calcWealthBtn = document.getElementById('calculate-wealth');
let toggle = 1;
let millionairToggle = true;

let data = [];
getRandomUser();
getRandomUser();
getRandomUser();

//fetch random user and add money
async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api?nat=us');
    const data = await res.json();
    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random()*1000000)
    };

    addData(newUser);
    
}

//Add new object to data array
function addData(obj){
    data.push(obj);
    updateDom();
}

//updates DOM to add 
function updateDom(providedData = data) {
    //Clear main div
    main.innerHTML = ' <h2><strong>Person</strong> Wealth</h2>';
    //For each element append to main
    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(element);
    });
}

//Format number as money
function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');  // 12,345.67
}

//Double Money Function
function doubleMoney(){
    const doubleArray = data.map( item => {
        item.money *= 2;
        return item
    });
    updateDom(doubleArray);
}
//Sorts users by richest
function sort() {
    toggle *=-1;
  data.sort((a,b)=>(toggle) * (b.money-a.money));
    updateDom();

}

//Filter only millionaires
function showMillionaire() {
    const tempData = data.filter(user => user.money>=1000000);
    if (millionairToggle) {
        updateDom(tempData);
        millionairToggle = false;
    } else {
        updateDom();
        millionairToggle = true;
    }
    
}

//Calculate the total weath
function calculateWealth(){
    const wealth = data.reduce((acc,user)=>(acc + user.money),0)
   
   const wealthElement = document.createElement('div');
   wealthElement.innerHTML = `<h3>Total Wealth: <strong> ${formatMoney(wealth)}</strong></h3>`;
   main.appendChild(wealthElement);
    console.log(formatMoney(wealth));
}

//Event Listeners

addUserBtn.addEventListener('click',getRandomUser);
doubleMoneyBtn.addEventListener('click',doubleMoney);
sortBtn.addEventListener('click',sort);
showMillionBtn.addEventListener('click',showMillionaire);
calcWealthBtn.addEventListener('click',calculateWealth)