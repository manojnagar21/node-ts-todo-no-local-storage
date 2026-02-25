import type { Request, Response } from "express";
import { readTodos, writeTodos } from "../storage/todo.storage.js";
import type { Todo } from "../storage/todo.storage.js";

// Get all todos
export const getTodos = (_req: Request, res: Response) => {
    const todos = readTodos();
    return res.json(todos);
}
// Get todo by id
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

// Update todo
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


// Delete todo
export const deleteTodo = (req: Request, res: Response) => {
    let todos = readTodos();
    const id = Number(req.params.id);
    let todoToDelete = todos.find(t => t.id === id);
    if(!todoToDelete) {
        return res.status(404).send({ msg: "Task not available" });
    }
    todos = todos.filter(t => t.id !== id);
    writeTodos(todos);
    res.status(200).send({ msg: "Todo deleted", data: todoToDelete })
}
/*
python set
https://www.programiz.com/online-compiler/88M3vhd4uDpyW
https://www.programiz.com/online-compiler/0KUPJ6ryI1kqj
https://www.programiz.com/online-compiler/1TvGrcsODWFzR

https://www.programiz.com/online-compiler/0TvGrcTaLWBaA
https://www.programiz.com/online-compiler/2WaN4g4G436qp


python dictionary
https://www.programiz.com/online-compiler/2aYTp0BFGeb75
https://www.programiz.com/online-compiler/0AF2BrIcNsMtW
https://www.programiz.com/online-compiler/2kBzNxwPbAoYs
https://www.programiz.com/online-compiler/6xlhPW1mXrFSa
*/