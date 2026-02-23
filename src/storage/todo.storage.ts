import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "../data/todo.json");
// console.log(__dirname);
// console.log(filePath);

// todo interface
export interface Todo {
    id: number;
    title: string;
    completed: boolean;
}
// read todos
export const readTodos = (): Todo[] => {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data || "[]");
};

// write todos
export const writeTodos = (todos: Todo[]) => {
    fs.writeFileSync(filePath, JSON.stringify(todos, null, 2));
}