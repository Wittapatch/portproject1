// Buttons
const addBtn = document.getElementById("additem-btn");
const createCategory = document.getElementById("createcategory-btn");

// Text Input
const inputText = document.getElementById("inputtask");
const inputCategory = document.getElementById("inputCategory");

// Div Container for adding in tasks
const categoryContainer = document.getElementById("categorycontainer");
const categories = [];


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
        const result = data.result;
        const h2List = document.querySelectorAll("#categorycontainer h2");

        h2List.forEach(h2 => {
            const row = document.createElement("div");
            row.className = "input-row";

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.className = "task-checkbox";

            const item = document.createElement("p");
            item.textContent = inputText.value;

            checkbox.addEventListener("change", function(){
                if (checkbox.checked) {
                    item.classList.add("done");

                    setTimeout(function() {
                        row.remove();
                    }, 100);
                }
            });
            if (h2.textContent.trim().toLowerCase() === result.toLowerCase().replace("'", "")) {
                const parent = h2.parentElement;

                const item = document.createElement("p");
                item.textContent = inputText.value;

                row.appendChild(checkbox);
                row.appendChild(item);

                parent.appendChild(row);
            }
        })
        inputText.value = "";
    }
    
}

function addCategory() {

    // Check if the inputCategory is empty or not
    if (inputCategory.value) {
        const category = document.createElement("div");
        category.className = "input-category-box";

        const textCategory = document.createElement("h2");
        textCategory.textContent = inputCategory.value;

        categories.push(inputCategory.value); // append to list 

        category.appendChild(textCategory);
        categoryContainer.prepend(category);

        inputCategory.value = "";
    }
}


addBtn.addEventListener("click", addItem);
createCategory.addEventListener("click", addCategory);




