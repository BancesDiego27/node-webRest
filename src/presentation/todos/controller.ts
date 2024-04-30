import { Request, Response } from "express"

import { prisma } from "../../data/postgres";



export class TodoController {

    constructor(){}

    public getTodos = async(req:Request,res:Response)=>{
        const allTodos = await prisma.todo.findMany()
        return res.json(allTodos)
    }

    public getTodoById = async (req:Request,res:Response)=>{
        const id = +req.params.id
        if(isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number'})
        //const todo = todos.find(todo => todo.id===id);
        const todo = await prisma.todo.findUnique({
            where:{
                id
            }
        });

        (todo)? res.json(todo):res.status(404).json({error: `TODO with id ${id} not found`})

        return res.json(todo)
    }

    public createTodo = async (req:Request,res:Response)=>{
        const  {text} = req.body
        if(!text ) return res.status(400).json({error: 'Text property is required'});

       const todo = await prisma.todo.create({
        data: {
            text,
        }
        })
        return res.json({status: 'Todo created correct', todo})
    }

    public updateTodo = async (req:Request,res:Response)=>{
        const id = +req.params.id
        if(isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number'})
        const todo = await prisma.todo.findUnique({
            where:{
                id
            }
        });
        (todo)? res.json(todo):res.status(404).json({error: `TODO with id ${id} not found`})

        const {text,completedAt} = req.body
        if(!text )  return res.status(400).json({error: 'Text property is required'});
        const updateTodo = await prisma.todo.update({
            where: {
              id,
            },
            data: {
              text,completedAt:(completedAt)? new Date(completedAt): null
            },
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
        (todo)? res.json(todo):res.status(404).json({error: `TODO with id ${id} not found`})
        const deleteTodo = await  prisma.todo.delete({
            where:{
                id
            }
        });
        (todo)? res.json(todo):res.status(404).json({error: `TODO with id ${id} not found`})


        return res.json({status: 'deleted correctly',deleteTodo})
        
    }


}