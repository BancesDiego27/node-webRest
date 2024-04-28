import { Request, Response } from "express"
import { todo } from "node:test";

const todos= [
    {id: 1, text:'buy milk', completedAt: new Date()},
    {id: 2, text:'buy bread', completedAt: null},
    {id: 3, text:'buy butter', completedAt: new Date()},
];

export class TodoController {

    constructor(){}

    public getTodos = (req:Request,res:Response)=>{
        return res.json(todos)
    }

    public getTodoById = (req:Request,res:Response)=>{
        const id = +req.params.id
        if(isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number'})
        const todo = todos.find(todo => todo.id===id);

        (todo)? res.json(todo):res.status(404).json({error: `TODO with id ${id} not found`})

        return res.json(todo)
    }

    public createTodo = (req:Request,res:Response)=>{
        const  {text} = req.body
        if(!text ) return res.status(400).json({error: 'Text property is required'});
        const newTodo = {
            id: todos.length + 1,
            text,
            completedAt: null
        }
        todos.push(newTodo)

        return res.json({status: 'Todo created correct'})
    }

    public updateTodo = (req:Request,res:Response)=>{
        const id = +req.params.id
        if(isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number'})
        const todo = todos.find(todo => todo.id ===id);
        if(!todo) return res.status(404).json({ error: `Todo with id ${id} not found `})
        const {text,completedAt} = req.body
        //if(!text )  return res.status(400).json({error: 'Text property is required'});

        todo.text = text || todo.text;
        (completedAt === 'null')?todo.completedAt= null: todo.completedAt= new Date(completedAt || todo.completedAt)
/*
        todos.forEach((todo,index )=>{
            if (todo.id === id){
                todos[index] = todo;
            }
        })
*/
        return res.json(todo)

    }

    public deleteTodo =(req:Request,res:Response)=> {
        const id = +req.params.id
     
        if(isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number'})

        const todo = todos.find(todo => todo.id === id);

        if(!todo) return res.status(404).json({ error: `Todo with id ${id} not found `})

        todos.splice(todos.indexOf(todo),1)

        return res.json({status: 'deleted correctly',todo})
        
    }


}