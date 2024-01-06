document.addEventListener("DOMContentLoaded", function() {
  var buttons = document.querySelectorAll('.nav_link');

  buttons.forEach(function(button) {
    button.addEventListener('click', function() {
      buttons.forEach(function(btn) {
        btn.classList.remove('active');
      });

      button.classList.add('active');
    });
  });
});


const toggleSidebar = () => document.body.classList.toggle("open");