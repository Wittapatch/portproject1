const addBtn = document.getElementById("additem-btn");
const createCategory = document.getElementById("createcategory-btn");
const inputText = document.getElementById("inputtask");
const inputContainer = document.getElementById("inputContainer");
const inputCategory = document.getElementById("inputCategory");
const categoryContainer = document.getElementById("categorycontainer");
const categories = [];

function addItem() {

    fetch("/get_data", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({inputtask: inputText, all_categories: categories})
    })

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

function addCategory() {
    const category = document.createElement("div");
    category.className = "input-category-box";

    const textCategory = document.createElement("h2");
    textCategory.textContent = inputCategory.value;

    category.appendChild(textCategory);
    categoryContainer.prepend(category);

    categories.push(inputCategory); // append to list 

    inputCategory.value = "";
}




addBtn.addEventListener("click", addItem);
createCategory.addEventListener("click", addCategory);




