const toggle = document.getElementById('toggle');
const close = document.getElementById('close');
const open = document.getElementById('open');
const modal = document.getElementById('modal');

//Toggle Nav
toggle.addEventListener('click', ()=>
document.body.classList.toggle('show-nav')
);

//Show modal
open.addEventListener('click', () => modal.classList.add('show-modal'))

//Hide Modal
close.addEventListener('click', () => modal.classList.remove('show-modal'))


//Hide Modal on outside click

window.addEventListener('click', e =>
 e.target == modal ? modal.classList.remove('show-modal') : false
);

function random() {
            num = Math.floor(Math.random() * 100); 
            document.getElementById('profile').attributes['src'].value  = `https://randomuser.me/api/portraits/men/${num}.jpg`  
           }

           random();

           


//If you have multiple buttons that would add an open modal class to
//So two seperate models, but we add show-modal to open that specific modal

// const openModalBtns = document.querySelectorAll('.open-modal');
// if(openModalBtns.length > 0) { // check if buttons exist on page
// openModalBtns.forEach(btn => {
// btn.addEventListener('click', () => modal.classList.add("show-modal"))
// });
// }
