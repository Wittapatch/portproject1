const userName = document.getElementById("username");
const gmail = document.getElementById("email");
const passWord = document.getElementById("password");
const submitbtn = document.getElementById("submit-inputs-btn");


async function submit_inputs() {
    if (userName.value && gmail.value && passWord.value) {

        const response = await fetch("/get_signup_data", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: userName.value,
                email: gmail.value,
                password: passWord.value
            })
        })

        const data = await response.json();
        console.log(data.reply);

        const userInfo = {
            username: userName.value, 
            email: gmail.value,
        }

        localStorage.setItem("userInfo", JSON.stringify(userInfo))

        userName.value = "";
        gmail.value = "";
        passWord.value = "";
    }
}

submitbtn.addEventListener("click", submit_inputs);




