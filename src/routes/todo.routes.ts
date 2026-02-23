import { Router } from "express";
import {
    createTodo,
    getTodos,
    getTodo,
    updateTodo
} from "../controllers/todo.controller.js";

const router = Router();

router.get("/", getTodos);
router.get("/:id", getTodo);
router.post("/", createTodo);
router.patch("/:id", updateTodo);

export default router;