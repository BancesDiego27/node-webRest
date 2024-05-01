import { Request, Response } from "express"

import { prisma } from "../../data/postgres";
import { CreateTodoDTO, UpdateTodoDTO } from "../../domain/dtos";



export class TodoController {

    constructor(){}

    public getTodos = async(req:Request,res:Response)=>{
        const allTodos = await prisma.todo.findMany()
        return res.json(allTodos)
    }

    public getTodoById = async (req:Request,res:Response)=>{
        const id = +req.params.id
        if(isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number'})

        const todo = await prisma.todo.findUnique({
            where:{
                id
            }
        });

        (todo)? res.json(todo):res.status(404).json({error: `TODO with id ${id} not found`})

        return res.json(todo)
    }

    public createTodo = async (req:Request,res:Response)=>{
        const [error,createTodoDTO] = CreateTodoDTO.create(req.body)
        if(error) return res.status(400).json({error});

       const todo = await prisma.todo.create({
        data:createTodoDTO!
        })
        return res.json({status: 'Todo created correct', todo})
    }

    public updateTodo = async (req:Request,res:Response)=>{
        const id = +req.params.id
        const [error,updateTodoDTO] = UpdateTodoDTO.create({
            ...req.body,
            id,
        })

        if(error) return res.status(400).json({error});

        const todo = await prisma.todo.findUnique({
            where:{
                id
            }
        });
        if(!todo) return res.status(404).json({error: `TODO with id ${id} not found`})


      
        const updateTodo = await prisma.todo.update({
            where: {
              id,
            },
            data: updateTodoDTO!.values,
          });
       
        return res.json(updateTodo)

    }

    public deleteTodo = async(req:Request,res:Response)=> {
        const id = +req.params.id
     
        if(isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number'})
        const todo = await prisma.todo.findUnique({
            where:{
                id
            }
        });
        if(!todo) return res.status(404).json({error: `TODO with id ${id} not found`})
        const deleteTodo = await  prisma.todo.delete({
            where:{
                id
            }
        });
        


        return res.json({status: 'deleted correctly',deleteTodo})
        
    }


}