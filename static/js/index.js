const addBtn = document.getElementById("additem-btn");
const createCategory = document.getElementById("createcategory-btn");
const inputText = document.getElementById("inputtask");
const inputContainer = document.getElementById("inputContainer");
const inputCategory = document.getElementById("inputCategory");
const categoryContainer = document.getElementById("categorycontainer");
const categories = [];

async function addItem() {

    const response = await fetch("/get_inputtask", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            inputtask: inputText.value,
            all_categories: categories
        })
    });

    const data = await response.json();
    const result = data.result;

    const row = document.createElement("div");
    row.className = "input-row";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-checkbox";

    const textInput = document.createElement("p");
    textInput.textContent = inputText.value;

    const output = document.createElement("p");
    output.textContent = result;

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
    row.appendChild(output);

    inputContainer.prepend(row);
    inputText.value = "";
}

function addCategory() {
    const category = document.createElement("div");
    category.className = "input-category-box";

    const textCategory = document.createElement("h2");
    textCategory.textContent = inputCategory.value;

    categories.push(inputCategory.value); // append to list 

    category.appendChild(textCategory);
    categoryContainer.prepend(category);

    inputCategory.value = "";
}


addBtn.addEventListener("click", addItem);
createCategory.addEventListener("click", addCategory);




