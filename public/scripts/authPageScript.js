//Adding all the 
const openModalSignupBtn = document.querySelector('.open-modal-signup');
const closeModalSignupBtn = document.querySelector('.close-modal-signup');
const modalSignup = document.querySelector('.modal-signup');
const modalOverlay = document.getElementById("modal-overlay");
const signupInsteadBtn = document.querySelector('.close-modal-login-to-signup');
const loginInsteadBtn = document.querySelector('.close-modal-signup-to-login');

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

function closeModalLoginToSignup() {
    modalLogin.style.display = 'none';
    modalLogin.setAttribute('aria-hidden', 'true');
    modalOverlay.classList.toggle("closed");
    
}

function closeModalSignupToLogin() {
    modalSignup.style.display = 'none';
    modalSignup.setAttribute('aria-hidden', 'true');
    modalOverlay.classList.toggle("closed");
}

openModalSignupBtn.addEventListener('click', openModalSignup);
closeModalSignupBtn.addEventListener('click', closeModalSignup);
openModalLoginBtn.addEventListener('click', openModalLogin);
closeModalLoginBtn.addEventListener('click', closeModalLogin);
signupInsteadBtn.addEventListener('click', closeModalLoginToSignup);
signupInsteadBtn.addEventListener('click', openModalSignup);
loginInsteadBtn.addEventListener('click', closeModalSignupToLogin);
loginInsteadBtn.addEventListener('click', openModalLogin);
