import { Request, Response } from "express"


import { CreateTodoDTO, UpdateTodoDTO } from "../../domain/dtos";
import { CreateTodo, DeleteTodo, GetTodo, GetTodos, TodoRepository, UpdateTodo } from "../../domain";
import { error } from "console";



export class TodoController {

    constructor(
        private readonly todoRepository : TodoRepository,
    ){}

    public getTodos = (req:Request,res:Response)=>{
        new GetTodos(this.todoRepository).execute().then(
            todos => res.json(todos)
        ).catch(error => res.status(400).json(error))
    }

    public getTodoById =  (req:Request,res:Response)=>{
        const id = +req.params.id

        new GetTodo(this.todoRepository).execute(id).then(
            todo=> res.json(todo)
        ).catch(error => res.status(400).json(error))
    }

    public createTodo =  (req:Request,res:Response)=>{
        const [error,createTodoDTO] = CreateTodoDTO.create(req.body)
        if(error) return res.status(400).json({error});

     new CreateTodo(this.todoRepository).execute(createTodoDTO!).then(
        todo=> res.json(todo)
     ).catch(error => res.status(400).json(error))
    }

    public updateTodo =  (req:Request,res:Response)=>{
        const id = +req.params.id
        const [error,updateTodoDTO] = UpdateTodoDTO.create({
            ...req.body,
            id,
        })

        if(error) return res.status(400).json({error});

        new UpdateTodo(this.todoRepository).execute(updateTodoDTO!).then(
            todo => res.json(todo)
        ).catch(error => res.status(400).json(error))

    }

    public deleteTodo = async(req:Request,res:Response)=> {
        const id = +req.params.id
     
       
        new DeleteTodo(this.todoRepository).execute(id).then(
            todo => res.json(todo)
        ).catch(error => res.status(400).json(error))
        
    }


}