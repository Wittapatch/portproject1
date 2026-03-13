const addBtn = document.getElementById("additem-btn");
const createCategory = document.getElementById("createcategory-btn");
const inputText = document.getElementById("inputtask");
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




