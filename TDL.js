let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let but = document.getElementById("but");
let lst = document.getElementById("lst");
let p1 = document.getElementById("p1");

// 1. Render tasks from localStorage on page load
function renderTasks() {
    lst.innerHTML = "";
    tasks.forEach(taskText => {
        createTaskElement(taskText);
    });
}

// 2. DRY function to create and append task elements
function createTaskElement(taskText) {
    let li = document.createElement("li");
    let textNode = document.createTextNode(taskText);
    li.appendChild(textNode);

    let editBtn = document.createElement("button");
    editBtn.innerHTML = "Edit";
    editBtn.style.backgroundColor = "orange";
    editBtn.style.cursor = "pointer";
    editBtn.style.marginLeft = "10px";
    
    editBtn.addEventListener("click", () => {
        let newText = prompt("Enter your new task", textNode.textContent);
        if (newText === null || newText.trim() === "") return;

        let trimmedText = newText.trim();
        
        // Check for duplicates before editing
        let duplicateExists = tasks.some((t, idx) => t.toLowerCase() === trimmedText.toLowerCase() && tasks.indexOf(textNode.textContent) !== idx);
        if (duplicateExists) {
            alert("A task with this name already exists!");
            return;
        }

        // Update localStorage
        let oldTask = textNode.textContent;
        let index = tasks.indexOf(oldTask);
        if (index !== -1) {
            tasks[index] = trimmedText;
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }

        // Update DOM
        textNode.textContent = trimmedText;
    });

    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "Delete";
    deleteBtn.style.backgroundColor = "red";
    deleteBtn.style.cursor = "pointer";
    deleteBtn.style.marginLeft = "10px";
    
    deleteBtn.addEventListener("click", () => {
        tasks = tasks.filter(task => task !== textNode.textContent);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        li.remove();
    });

    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    lst.appendChild(li);
}

// 3. Add Task Event Listener
but.addEventListener("click", () => {
    let userInput = document.getElementById("userInput").value;

    if (userInput.trim() === "") {
        p1.innerHTML = "Please enter a task!";
        return;
    }
    
    p1.innerHTML = "";
    let trimmedInput = userInput.trim();

    // Check if task already exists (against actual saved state)
    let isDuplicate = tasks.some(t => t.toLowerCase() === trimmedInput.toLowerCase());
    if (isDuplicate) {
        p1.innerHTML = "Task already exists!";
        return;
    }

    // Update state and storage
    tasks.push(trimmedInput);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Render new task
    createTaskElement(trimmedInput);
    document.getElementById("userInput").value = "";
});

// Initialize app
renderTasks();
