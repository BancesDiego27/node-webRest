import { Request, Response } from "express"

import { prisma } from "../../data/postgres";
import { CreateTodoDTO, UpdateTodoDTO } from "../../domain/dtos";
import { TodoRepository } from "../../domain";



export class TodoController {

    constructor(
        private readonly todoRepository : TodoRepository,
    ){}

    public getTodos = async(req:Request,res:Response)=>{
        const alltodos= await this.todoRepository.getAll()
        return res.json(alltodos)
    }

    public getTodoById = async (req:Request,res:Response)=>{
        const id = +req.params.id
        try {
            const todo = await this.todoRepository.findById(id)
            return res.json(todo)
        } catch (error) {
            res.status(400).json({error})
        }
    }

    public createTodo = async (req:Request,res:Response)=>{
        const [error,createTodoDTO] = CreateTodoDTO.create(req.body)
        if(error) return res.status(400).json({error});

       const todo = await this.todoRepository.create(createTodoDTO!)
        return res.json({status: 'Todo created correct', todo})
    }

    public updateTodo = async (req:Request,res:Response)=>{
        const id = +req.params.id
        const [error,updateTodoDTO] = UpdateTodoDTO.create({
            ...req.body,
            id,
        })

        if(error) return res.status(400).json({error});

            const updateTodo = await this.todoRepository.updateById(updateTodoDTO!)
            return res.json(updateTodo)

    }

    public deleteTodo = async(req:Request,res:Response)=> {
        const id = +req.params.id
     
       
        const deleteTodo = this.todoRepository.deleteById(id)
        return res.json({status: 'deleted correctly',deleteTodo})
        
    }


}