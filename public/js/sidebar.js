const menuToggle = document.querySelector('.menu-toggle')
const sidebar = document.querySelector('.sidebar')
const toggle = document.querySelector('.toggle')

toggle.addEventListener('click', ()=>{
    sidebar.classList.toggle('close')
})

menuToggle.addEventListener('click', ()=>{
    menuToggle.classList.toggle('is-active')
    sidebar.classList.toggle('is-active')
})

