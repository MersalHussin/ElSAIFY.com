let toggleModeBtn = document.getElementById("toggle-mode-btn")
let body = document.body    
let landing = document.querySelector(".landing")


let savedMode = localStorage.getItem('darkMode');
if (savedMode === 'dark-mode') {
  // إعادة تعيين وضع الليل إذا كان محفوظًا سابقًا
  body.classList.add('dark-mode');
  toggleModeBtn.innerHTML = "🌚"
  landing.style.backgroundImage = "url(images/land-page-dr.jpg)"
  toggleModeBtn.style.backgroundColor = "#4c14d1"
}
toggleModeBtn.addEventListener("click",()=>{

    body.classList.toggle("dark-mode")
    if(body.classList.contains("dark-mode")){
        toggleModeBtn.innerHTML = "🌚"
        landing.style.backgroundImage = "url(images/land-page-dr.jpg)"
        toggleModeBtn.style.backgroundColor = "#4c14d1"
    }else{
        toggleModeBtn.innerHTML = "🌞"
        landing.style.backgroundImage = "url(images/land-page.jpg)"
        toggleModeBtn.style.backgroundColor = "rgb(32, 158, 216"
    }

    let currentMode = body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';
    localStorage.setItem('darkMode', currentMode);
})

