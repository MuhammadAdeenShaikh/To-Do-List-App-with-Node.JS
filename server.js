const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname)); // serve index.html, script.js, style.css

const tasksFile = path.join(__dirname, "tasks.json");

// Get tasks
app.get("/tasks", (req, res) => {
    const tasks = JSON.parse(fs.readFileSync(tasksFile, "utf8") || "[]");
    res.json(tasks);
});

// Add task
app.post("/tasks", (req, res) => {
    const tasks = JSON.parse(fs.readFileSync(tasksFile, "utf8") || "[]");
    tasks.push(req.body);
    fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2));
    res.json({ message: "Task added", tasks });
});

// Delete task
app.delete("/tasks/:id", (req, res) => {
    const tasks = JSON.parse(fs.readFileSync(tasksFile, "utf8") || "[]");
    const id = parseInt(req.params.id);
    if (tasks[id] !== undefined) {
        tasks.splice(id, 1);
        fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2));
        res.json({ message: "Task deleted", tasks });
    } else {
        res.status(400).json({ message: "Invalid task id" });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
