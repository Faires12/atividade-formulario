let usernameCtrl = {status: 0, errortext: ""}
let emailCtrl = {status: 0, errortext: ""}
let passwordCtrl = {status: 0, errortext: ""}
let cpasswordCtrl = {status: 0, errortext: ""}

const usernameInput = document.getElementById("username")
const emailInput = document.getElementById("email")
const passwordInput = document.getElementById("password")
const cpasswordInput = document.getElementById("cpassword")
const button = document.getElementById("button")

usernameInput.addEventListener('blur', checkFields)
emailInput.addEventListener('blur', checkFields)
passwordInput.addEventListener('blur', checkFields)
cpasswordInput.addEventListener('blur', checkFields)

document.getElementById("form").addEventListener("submit", handleSubmit)

const userList = []

function checkFields(e){
    let {id, value} = e.target
    switch(id){
        case "username":
            if(!value){
                usernameCtrl = {status: 0, errortext: ""}
                break
            }
            if(value.length <= 3 || value.length >= 25){
                usernameCtrl = {status: 1, errortext: "O nome deve ter entre 3 e 25 caracteres!"}
                break
            } else {
                usernameCtrl = {status: 2, errortext: ""}
                break
            }
        case "email":
            if(!value){
                emailCtrl = {status: 0, errortext: ""}
                break
            }
            var re = /\S+@\S+\.\S+/;
            if(!re.test(value)){
                emailCtrl = {status: 1, errortext: "Insira um email válido!"}
                break
            } else {
                emailCtrl = {status: 2, errortext: ""}
                break
            }
        case "password":
            if(!value){
                passwordCtrl = {status: 0, errortext: ""}
                break
            }
            if(value.length < 8){
                passwordCtrl = {status: 1, errortext: "A senha deve ter no minimo 8 caracteres!"}
                break
            } else {
                passwordCtrl = {status: 2, errortext: ""}
                if(value === cpasswordInput.value){
                    cpasswordCtrl = {status: 2, errortext: ""}
                } else if(cpasswordCtrl.status !== 0){
                    cpasswordCtrl = {status: 1, errortext: "As senhas não coincidem!"}
                }
                break
            }
        case "cpassword":
            if(!value){
                cpasswordCtrl = {status: 0, errortext: ""}
                break
            }
            if(value !== passwordInput.value){
                cpasswordCtrl = {status: 1, errortext: "As senhas não coincidem!"}
                break
            } else if(passwordCtrl.status === 2){
                cpasswordCtrl = {status: 2, errortext: ""}
                break
            }
        default:
            break
    }
    drawStatus()
}

function drawStatus(){
    if(usernameCtrl.status === 0){
        usernameInput.style.border = "2px solid #000000"
    } else if(usernameCtrl.status === 1){
        usernameInput.style.border = "2px solid red"
    } else {
        usernameInput.style.border = "2px solid green"
    }

    if(emailCtrl.status === 0){
        emailInput.style.border = "2px solid #000000"
    } else if(emailCtrl.status === 1){
        emailInput.style.border = "2px solid red"
    } else {
        emailInput.style.border = "2px solid green"
    }
    
    if(passwordCtrl.status === 0){
        passwordInput.style.border = "2px solid #000000"
    } else if(passwordCtrl.status === 1){
        passwordInput.style.border = "2px solid red"
    } else {
        passwordInput.style.border = "2px solid green"
    }

    if(cpasswordCtrl.status === 0){
        cpasswordInput.style.border = "2px solid #000000"
    } else if(cpasswordCtrl.status === 1){
        cpasswordInput.style.border = "2px solid red"
    } else {
        cpasswordInput.style.border = "2px solid green"
    }

    document.getElementById("usernameerror").innerHTML = usernameCtrl.errortext
    document.getElementById("emailerror").innerHTML = emailCtrl.errortext
    document.getElementById("passworderror").innerHTML = passwordCtrl.errortext
    document.getElementById("cpassworderror").innerHTML = cpasswordCtrl.errortext

    if(usernameCtrl.status === 2 && emailCtrl.status === 2 && passwordCtrl.status === 2 && cpasswordCtrl.status === 2){
        button.disabled = false
    } else 
        button.disabled = true
}

function ResetForm(){
    usernameCtrl = {status: 0, errortext: ""}
    emailCtrl = {status: 0, errortext: ""}
    passwordCtrl = {status: 0, errortext: ""}
    cpasswordCtrl = {status: 0, errortext: ""}
    usernameInput.value = ""
    emailInput.value = ""
    passwordInput.value = ""
    cpasswordInput.value = ""
    drawStatus()
}

function handleSubmit(e){
    e.preventDefault()
    button.disabled = true
    if(usernameCtrl.status === 2 && emailCtrl.status === 2 && passwordCtrl.status === 2 && cpasswordCtrl.status === 2){
        for(let i in userList){
            if(userList[i].name === usernameInput.value){
                usernameCtrl.status = 1
                usernameCtrl.errortext = "Usuário já existente"
                usernameInput.focus()
                return drawStatus()
            }
            else if(userList[i].email === emailInput.value){
                emailCtrl.status = 1
                emailCtrl.errortext = "Email já cadastrado"
                emailInput.focus()
                return drawStatus()
            }
        }
        userList.push({name: usernameInput.value, email: emailInput.value})
        alert("Usuário cadastrado com sucesso!")
        return ResetForm()
    }

}