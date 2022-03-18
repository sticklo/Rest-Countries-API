document.addEventListener("DOMContentLoaded", function(event) {
    document.documentElement.setAttribute("data-theme", "light");
     // Get our button switcher
     var themeSwitcher = document.getElementById("theme-switcher");

     // When our button gets clicked
     themeSwitcher.onclick = function() {
         console.log(this)
       // Get the current selected theme, on the first run
       // it should be `light`
       var currentTheme = document.documentElement.getAttribute("data-theme");
 
       // Switch between `dark` and `light`
       var switchToTheme = currentTheme === "dark" ? "light" : "dark"
       if (switchToTheme === "light"){
           this.innerHTML = `<i class='bx bx-moon'></i><p>Dark mode</p>`

       } else {
        this.innerHTML = `<i class='bx bx-sun'></i><p>Light mode</p>`
       }
       // Set our currenet theme to the new one
       document.documentElement.setAttribute("data-theme", switchToTheme);
     }
  });