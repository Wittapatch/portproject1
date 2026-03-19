const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const submitbtn = document.getElementById("submit-inputs-btn");


async function submit_inputs() {
    if (username.value && email.value && password.value) {

        const response = fetch()



        username.value = ""
        email.value = ""
        password.value = ""
    }
}

submitbtn.addEventListener("click", submit_inputs);




