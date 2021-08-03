const openModalSignupBtn = document.querySelector('.open-modal-signup');
const closeModalSignupBtn = document.querySelector('.close-modal-signup');
const modalSignup = document.querySelector('.modal-signup');
const modalOverlay = document.getElementById("modal-overlay");

function openModalSignup() {
    modalSignup.style.display = 'flex';
    modalSignup.removeAttribute('aria-hidden');
    modalOverlay.classList.toggle("closed");
}

function closeModalSignup() {
    modalSignup.style.display = 'none';
    modalSignup.setAttribute('aria-hidden', 'true');
    modalOverlay.classList.toggle("closed");
}

openModalSignupBtn.addEventListener('click', openModalSignup);
closeModalSignupBtn.addEventListener('click', closeModalSignup);

const openModalLoginBtn = document.querySelector('.open-modal-login');
const closeModalLoginBtn = document.querySelector('.close-modal-login');
const modalLogin = document.querySelector('.modal-login');


function openModalLogin() {
    modalLogin.style.display = 'flex';
    modalLogin.removeAttribute('aria-hidden');
    modalOverlay.classList.toggle("closed");
}

function closeModalLogin() {
    modalLogin.style.display = 'none';
    modalLogin.setAttribute('aria-hidden', 'true');
    modalOverlay.classList.toggle("closed");
}

openModalLoginBtn.addEventListener('click', openModalLogin);
closeModalLoginBtn.addEventListener('click', closeModalLogin);