// Task Manager
const taskManager = {
    tasks: [],
    currentId: 0,
  
    addTask: function(name) {
      const task = {
        id: this.currentId++,
        name: name,
        description: "",
        status: "open"
      };
      this.tasks.push(task);
      this.renderTasks();
    },
  
    updateTaskDescription: function(id, description) {
      const task = this.tasks.find(task => task.id === id);
      if (task) {
        task.description = description;
        this.renderTasks();
      }
    },
  
    updateTaskStatus: function(id, status) {
      const task = this.tasks.find(task => task.id === id);
      if (task) {
        task.status = status;
        this.renderTasks();
      }
    },
  
    removeTask: function(id) {
      const taskIndex = this.tasks.findIndex(task => task.id === id);
      if (taskIndex !== -1) {
        this.tasks.splice(taskIndex, 1);
        this.renderTasks();
      }
    },
  
    renderTasks: function() {
      const openList = document.getElementById("openList");
      const inProgressList = document.getElementById("inProgressList");
      const inReviewList = document.getElementById("inReviewList");
      const doneList = document.getElementById("doneList");
  
      // Clear task lists
      openList.innerHTML = "";
      inProgressList.innerHTML = "";
      inReviewList.innerHTML = "";
      doneList.innerHTML = "";
  
      // Render tasks based on status
      this.tasks.forEach(task => {
        const li = document.createElement("li");
        li.textContent = task.name;
        li.draggable = true;
  
        // Add event listener for opening the description modal
        li.addEventListener("click", () => {
          openTaskDescriptionModal(task);
        });
  
        // Add event listener for drag start
        li.addEventListener("dragstart", (event) => {
          event.dataTransfer.setData("text/plain", task.id);
        });
  
        // Assign the task to the appropriate list based on status
        switch (task.status) {
          case "open":
            openList.appendChild(li);
            break;
          case "inProgress":
            inProgressList.appendChild(li);
            break;
          case "inReview":
            inReviewList.appendChild(li);
            break;
          case "done":
            doneList.appendChild(li);
            break;
        }
      });
    }
  };
  
  // Open the description modal for a task
  function openTaskDescriptionModal(task) {
    const modal = document.getElementById("taskModal");
    const title = document.getElementById("taskModalTitle");
    const description = document.getElementById("taskModalDescription");
    const saveBtn = document.getElementById("saveDescription");
    const deleteBtn = document.getElementById("deleteTask");
  
    title.textContent = task.name;
    description.value = task.description;
  
    saveBtn.addEventListener("click", () => {
      taskManager.updateTaskDescription(task.id, description.value);
      modal.style.display = "none";
    });
  
    deleteBtn.addEventListener("click", () => {
      taskManager.removeTask(task.id);
      modal.style.display = "none";
    });
  
    modal.style.display = "block";
  }
  
  // Close the description modal
  function closeTaskDescriptionModal() {
    const modal = document.getElementById("taskModal");
    modal.style.display = "none";
  }
  
  // Event listener for form submission
  const taskForm = document.getElementById("taskForm");
  taskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const taskNameInput = document.getElementById("taskName");
    const taskName = taskNameInput.value.trim();
    if (taskName !== "") {
      taskManager.addTask(taskName);
      taskNameInput.value = "";
    }
  });
  
  // Event listener for drop targets
  const dropTargets = document.getElementsByClassName("task-list");
  Array.from(dropTargets).forEach(target => {
    target.addEventListener("dragover", (event) => {
      event.preventDefault();
    });
  
    target.addEventListener("drop", (event) => {
      event.preventDefault();
      const taskId = event.dataTransfer.getData("text/plain");
      const targetId = event.currentTarget.id;
  
      switch (targetId) {
        case "openList":
          taskManager.updateTaskStatus(Number(taskId), "open");
          break;
        case "inProgressList":
          taskManager.updateTaskStatus(Number(taskId), "inProgress");
          break;
        case "inReviewList":
          taskManager.updateTaskStatus(Number(taskId), "inReview");
          break;
        case "doneList":
          taskManager.updateTaskStatus(Number(taskId), "done");
          break;
      }
    });
  });
  
  // Event listener for closing the description modal
  const closeModalBtn = document.getElementsByClassName("close")[0];
  closeModalBtn.addEventListener("click", () => {
    closeTaskDescriptionModal();
  });
  
// // Task Manager
// const taskManager = {
//     tasks: [],
//     currentId: 0,
  
//     addTask: function(name) {
//       const task = {
//         id: this.currentId++,
//         name: name,
//         description: "",
//         status: "open"
//       };
//       this.tasks.push(task);
//       this.renderTasks();
//     },
  
//     updateTaskDescription: function(id, description) {
//       const task = this.tasks.find(task => task.id === id);
//       if (task) {
//         task.description = description;
//         this.renderTasks();
//       }
//     },
  
//     updateTaskStatus: function(id, status) {
//       const task = this.tasks.find(task => task.id === id);
//       if (task) {
//         task.status = status;
//         this.renderTasks();
//       }
//     },
  
//     renderTasks: function() {
//       const openList = document.getElementById("openList");
//       const inProgressList = document.getElementById("inProgressList");
//       const inReviewList = document.getElementById("inReviewList");
//       const doneList = document.getElementById("doneList");
  
//       // Clear task lists
//       openList.innerHTML = "";
//       inProgressList.innerHTML = "";
//       inReviewList.innerHTML = "";
//       doneList.innerHTML = "";
  
//       // Render tasks based on status
//       this.tasks.forEach(task => {
//         const li = document.createElement("li");
//         li.textContent = task.name;
//         li.draggable = true;
  
//         // Add event listener for opening the description modal
//         li.addEventListener("click", () => {
//           openTaskDescriptionModal(task);
//         });
  
//         // Add event listener for drag start
//         li.addEventListener("dragstart", (event) => {
//           event.dataTransfer.setData("text/plain", task.id);
//         });
  
//         // Assign the task to the appropriate list based on status
//         switch (task.status) {
//           case "open":
//             openList.appendChild(li);
//             break;
//           case "inProgress":
//             inProgressList.appendChild(li);
//             break;
//           case "inReview":
//             inReviewList.appendChild(li);
//             break;
//           case "done":
//             doneList.appendChild(li);
//             break;
//         }
//       });
//     }
//   };
  
//   // Open the description modal for a task
//   function openTaskDescriptionModal(task) {
//     const modal = document.getElementById("taskModal");
//     const title = document.getElementById("taskModalTitle");
//     const description = document.getElementById("taskModalDescription");
//     const saveBtn = document.getElementById("saveDescription");
  
//     title.textContent = task.name;
//     description.value = task.description;
  
//     saveBtn.addEventListener("click", () => {
//       taskManager.updateTaskDescription(task.id, description.value);
//       modal.style.display = "none";
//     });
  
//     modal.style.display = "block";
//   }
  
//   // Close the description modal
//   function closeTaskDescriptionModal() {
//     const modal = document.getElementById("taskModal");
//     modal.style.display = "none";
//   }
  
//   // Event listener for form submission
//   const taskForm = document.getElementById("taskForm");
//   taskForm.addEventListener("submit", (event) => {
//     event.preventDefault();
//     const taskNameInput = document.getElementById("taskName");
//     const taskName = taskNameInput.value.trim();
//     if (taskName !== "") {
//       taskManager.addTask(taskName);
//       taskNameInput.value = "";
//     }
//   });
  
//   // Event listener for drop targets
//   const dropTargets = document.getElementsByClassName("task-list");
//   Array.from(dropTargets).forEach(target => {
//     target.addEventListener("dragover", (event) => {
//       event.preventDefault();
//     });
  
//     target.addEventListener("drop", (event) => {
//       event.preventDefault();
//       const taskId = event.dataTransfer.getData("text/plain");
//       const targetId = event.currentTarget.id;
  
//       switch (targetId) {
//         case "openList":
//           taskManager.updateTaskStatus(Number(taskId), "open");
//           break;
//         case "inProgressList":
//           taskManager.updateTaskStatus(Number(taskId), "inProgress");
//           break;
//         case "inReviewList":
//           taskManager.updateTaskStatus(Number(taskId), "inReview");
//           break;
//         case "doneList":
//           taskManager.updateTaskStatus(Number(taskId), "done");
//           break;
//       }
//     });
//   });
  
//   // Event listener for closing the description modal
//   const closeModalBtn = document.getElementsByClassName("close")[0];
//   closeModalBtn.addEventListener("click", () => {
//     closeTaskDescriptionModal();
//   });
  