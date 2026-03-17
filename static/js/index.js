// Buttons
const addBtn = document.getElementById("additem-btn");
const createCategory = document.getElementById("createcategory-btn");

// Text Input
const inputText = document.getElementById("inputtask");
const inputCategory = document.getElementById("inputCategory");

// Div Container for adding in tasks
const categoryContainer = document.getElementById("categorycontainer");
let categories = {};

// Saving data using localStorage
function saveData() {
    localStorage.setItem("categories", JSON.stringify(categories));
}

function loadData() {
    const saved_data = localStorage.getItem("categories");

    if (saved_data) {
        categories = JSON.parse(saved_data);
    }
}

function render_task_row(taskText, categoryName) {
    const row = document.createElement("div");
    row.className = "input-row";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-checkbox";

    const item = document.createElement("p");
    item.textContent = taskText;

    checkbox.addEventListener("change", function (){
        const index = categories[categoryName].indexOf(taskText);
        categories[categoryName].splice(index, 1);
        item.classList.add("done");
        saveData();
        setTimeout(function () {
            row.remove();
        }, 100);
    });
    
    row.appendChild(checkbox);
    row.appendChild(item);

    return row;
}

function render_categories() {
    categoryContainer.innerHTML = ""; // Make it empty so that you can update it each time cleanly

    for (const categoryName in categories) {
        const category = document.createElement("div");
        category.className = "input-category-box";

        const textCategory = document.createElement("h2");
        textCategory.textContent = categoryName;

        category.appendChild(textCategory);

        categories[categoryName].forEach(taskText => {
            const row = render_task_row(taskText, categoryName);
            category.appendChild(row);
        });

        categoryContainer.prepend(category);
    }
}


async function addItem() {
    // Check if the inputText is empty or no 
    if (inputText.value) {
        // For APIs
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

        const data = await response.json(); // Waiting for the model answer
        categories = data.categories;

        saveData();
        render_categories();
        inputText.value = "";
    }
    
}

function addCategory() {

    if (inputCategory.value) {
        const categoryName = inputCategory.value;

        if (!categories[categoryName]) {
            categories[categoryName] = [];
            saveData();
            render_categories();
        }

        inputCategory.value = "";
    }
}

loadData();
render_categories();


addBtn.addEventListener("click", addItem);
createCategory.addEventListener("click", addCategory);




