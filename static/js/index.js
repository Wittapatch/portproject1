const addBtn = document.getElementById("additem-btn");
const inputText = document.getElementById("inputtask");
const inputContainer = document.getElementById("inputContainer");

function addItem() {
    const row = document.createElement("div");
    row.className = "input-row";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-checkbox";

    const textInput = document.createElement("p");
    textInput.textContent = inputText.value;

    checkbox.addEventListener("change", function(){
        if (checkbox.checked) {
            textInput.classList.add("done");

            setTimeout(function() {
                row.remove();
            }, 100);
        }
    })

    row.appendChild(checkbox);
    row.appendChild(textInput);

    inputContainer.prepend(row);

    inputText.value = "";
}

addBtn.addEventListener("click", addItem);



