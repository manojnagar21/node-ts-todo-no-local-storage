import type { Request, Response } from "express";
import { readTodos, writeTodos } from "../storage/todo.storage.js";
import type { Todo } from "../storage/todo.storage.js";

// Get all todos
export const getTodos = (_req: Request, res: Response) => {
    const todos = readTodos();
    return res.json(todos);
}
// get todo by id
export const getTodo = (req: Request, res:Response) => {
    const todos = readTodos();
    const id = Number(req.params.id);
    const todo = todos.find(t => t.id === id);
    if(!todo) {
        return res.status(404).send({ msg: "Task not available" });
    }
    res.json(todo);
}
// Create todo
export const createTodo = (req: Request, res: Response) => {
    const todos = readTodos();

    const newTodo: Todo = {
        id: Date.now(),
        title: req.body.title,
        completed: false
    }
    todos.push(newTodo);
    writeTodos(todos);
    res.status(201).json(newTodo);
}

// update todo
export const updateTodo = (req: Request, res: Response) => {
    const todos = readTodos();
    const id = Number(req.params.id);
    const todo = todos.find(t => t.id === id);
    if(!todo) {
        return res.status(404).send({ msg: "Task not available" });
    }
    todo.completed = !todo?.completed;
    writeTodos(todos);
    res.json(todo);
}