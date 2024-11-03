/**
 * This file will automatically be loaded by vite and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import "./index.css";

const taskInput = document.getElementById("taskInput");
const tasks = document.getElementById("tasks");
const doneTasks = document.getElementById("completed");
const time = document.getElementById("timeRemaining");

function newTask() {
  const taskDesc = taskInput.value.trim();
  if (taskDesc !== "") {
    const li = document.createElement("li");
    li.textContent = taskDesc;

    li.addEventListener("click", () => {
      if (li.parentElement === tasks) {
        doneTasks.appendChild(li);
        li.classList.add("completedTask");
      } else {
        tasks.appendChild(li);
        li.classList.remove("completedTask");
      }
    });
    tasks.appendChild(li);
    taskInput.value = "";
  }
}

document.getElementById("add").addEventListener("click", newTask);

function timeNow() {
  const now = new Date().toLocaleTimeString([], { hour12: false });
  const [hours, minutes] = now.split(":").map(Number);
  const remainMinutes = minutes === 0 ? 0 : 60 - minutes;
  const remainHours = hours === 23 && minutes > 0 ? 0 : 23 - hours;
  if (remainMinutes === 0 && minutes > 0) {
    remainHours--;
  }
  time.innerHTML = `${remainHours}h ${remainMinutes}min`;
}
timeNow();
setInterval(timeNow, 1000);
