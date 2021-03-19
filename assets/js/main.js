function writeCurrentYear() {
    document.querySelector('.footer p span').innerHTML = '2020 - ' + new Date().getFullYear();
}

function sendRequest(method, url, data, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        success(xhr.response, xhr.responseType);
      } else {
        error(xhr.status, xhr.response, xhr.responseType);
      }
    };
    xhr.send(data);
}

window.addEventListener('DOMContentLoaded', () => {
    writeCurrentYear();

    const form = document.getElementById('form-contact');
    const button = document.getElementById('form-contact-button');
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
        var data = new FormData(form);
        sendRequest(form.method, form.action, data, success, error);
    });

});

setTimeout(
  () => {
    document.querySelector('.loading').classList.add('loaded');
    window.scrollTo(0, 0);
  }, 1000
)