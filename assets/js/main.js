import { writeCurrentYear, sendRequest } from './utils.js'
import './../css/style.css';
import './../css/animation.css';
import './../../index.html';

window.addEventListener('DOMContentLoaded', () => {
    writeCurrentYear();

    const form = document.getElementById('form-contact');
    const status = document.getElementById('form-contact-status');

    function success() {
        form.reset();
        status.style.display = "block";
        status.innerHTML = "Your message has been sent!";
        status.classList.add("success");
        
        setTimeout(() => {
          status.style.opacity = 0;
          status.style.display = "none";
        }, 5000);
    }
  
    function error() {
        status.innerHTML = "Oops! An error has occured, please try again";
        status.classList.add("error");
    }

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        let data = new FormData(form);
        sendRequest(form.method, form.action, data, success, error);
    });

});