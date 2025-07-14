// create todo //
let inputValue = "";
const addTodobutton = document.querySelector("button");
let todoId = 1;
//todoDisplayParent
const todoParentDiv = document.querySelector(".todoDisplayParent");

//Add todo on button click-----------------------------------------------------------------------------------------------------
addTodobutton.addEventListener("click", () => {
  //extraction of input-value from input tag
  inputValue = document.querySelector("input").value;

  //creating and set new todovalue
  const todoChild = document.createElement("div");
  todoChild.setAttribute("id", `${todoId}`);
  todoChild.innerHTML = `<h1>${inputValue}</h1>`;

  const create_DeleteTodoButton = document.createElement("button");
  create_DeleteTodoButton.innerText = " X ";
  create_DeleteTodoButton.setAttribute("id", todoId);
  create_DeleteTodoButton.setAttribute("class", "delete-button");
  todoChild.appendChild(create_DeleteTodoButton);

  const create_MarkAsCompletedTodoButton = document.createElement("button");
  create_MarkAsCompletedTodoButton.innerText = " ✓ ";
  create_MarkAsCompletedTodoButton.setAttribute("id", todoId);
  create_MarkAsCompletedTodoButton.setAttribute("class", "Completed-button");
  todoChild.appendChild(create_MarkAsCompletedTodoButton);

  const create_EditTodoButton = document.createElement("button");
  create_EditTodoButton.innerText = " Edit ";
  create_EditTodoButton.setAttribute("id", todoId);
  create_EditTodoButton.setAttribute("class", "Edit-button");
  todoChild.appendChild(create_EditTodoButton);

  //Finally adding to the dom
  todoParentDiv.appendChild(todoChild);
  todoId++;

  document.querySelector("input").value = "";
});

todoParentDiv.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-button")) {
    // delete todo //----------------------------------------------------------------------------------------------------
    const deleteId = event.target.id;
    console.log(`Delete button called with parentDivId: ${deleteId}`);
    document.getElementById(deleteId).remove();
  } else if (event.target.classList.contains("Completed-button")) {
    // completed todo //-------------------------------------------------------------------------------------------------
    const completeID = event.target.id;
    console.log(`Completed button called with parentDivId: ${completeID}`);
    const parent = document.getElementById(completeID);
    const child = parent.querySelector("h1");
    child.style.textDecoration = "line-through";
    child.classList.add("completed");


  } else if (event.target.classList.contains("Edit-button")) {
    // Update a todo-----------------------------------------------------------------------------------------------------
    const editId = event.target.id;
    console.log(`Edit called for div with parentDiv: ${editId}`);

    const parent = document.getElementById(editId);
    const headingElement = parent.querySelector("h1");
    const currentText = headingElement.textContent;

    // Create input box
    const input = document.createElement("input");
    input.type = "text";
    input.value = currentText;

    parent.replaceChild(input, headingElement);

    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);

    const saveEditedText = () => {
      const newHeading = document.createElement("h1");
      newHeading.textContent = input.value;
      parent.replaceChild(newHeading, input);
    };

    input.addEventListener("blur", saveEditedText);
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        saveEditedText();
      }
    });
  }
});
