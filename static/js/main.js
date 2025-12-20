// -----------------------login interface---------------------------------------------------
const logindlg = document.getElementById('loginDialog');
const openLogin = document.getElementById('openLogin');
const SignUpdlg = document.getElementById('SignUpDialog');

if (openLogin) {
    openLogin.addEventListener('click', () => logindlg.showModal());
    document.getElementById('closeLogin').addEventListener('click', () => logindlg.close());
    document.getElementById('openSignIn')
            .addEventListener('click', () => {
                                            SignUpdlg.close()
                                            logindlg.showModal()
                                            });

    document.getElementById('openSignup')
            .addEventListener('click', () => {
                                            logindlg.close()
                                            SignUpdlg.showModal()
                                            console.log("clicked")
                                        });
    document.getElementById('closeSignUp').addEventListener('click', () => SignUpdlg.close());
}


// -----------------------login Ajax---------------------------------------------------
const loginForm = document.getElementById("loginForm");
const errortint = document.getElementById("errortint");

loginForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const formData = new FormData(loginForm);

    // -----------------Ajax------------------------------
    let xhr = new XMLHttpRequest(); 
    xhr.onreadystatechange = handlerFunction; 

    function handlerFunction (event){     
        if(xhr.readyState === XMLHttpRequest.DONE){
            if (xhr.status === 200) {
                if (xhr.responseText == "No"){
                    errortint.textContent = "This username does not exist."
                }
                else if(xhr.responseText == "wrong"){
                    errortint.textContent = "Incorrect password. Please try again."
                }
                else{
                    document.location.href = "/";
                }
            } else {
                console.log(xhr.status)
            }
        }
    };

    xhr.open("POST","/login",true); 
    xhr.send(formData);
    // -----------------Ajax finish-----------------------
});

// -----------------------Exit session---------------------------------------------------
const menu = document.getElementById("menuBox");
const userarea = document.getElementById("userarea");

if (userarea && menu) {
    userarea.addEventListener("mouseenter", () => {
        menu.style.display = "block";
    });
    userarea.addEventListener("mouseleave", () => {
        menu.style.display = "none";
    });
}
// ---------------- Cookie Banner Close ----------------
document.addEventListener("DOMContentLoaded", function () {
    const banner = document.getElementById("cookieBanner");
    const acceptBtn = document.getElementById("cookieAccept");
    const ManageBtn = document.getElementById("cookieManage");

    acceptBtn.addEventListener("click", function (e) {
        e.preventDefault();               
        banner.style.display = "none";    
    });
    ManageBtn.addEventListener("click", function (e) {
        e.preventDefault();
        banner.style.display = "none";
    });
});
