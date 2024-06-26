import { CreateTodoDTO, UpdateTodoDTO } from "../dtos";
import { TodoEntity } from "../entities/todo.entity";


export abstract class TodoRepository{
    abstract create(createTodoDTO: CreateTodoDTO): Promise<TodoEntity>;
    //todo: pagination
    abstract getAll():Promise<TodoEntity[]>;  
    abstract findById(id:number) : Promise<TodoEntity>;
    abstract updateById(updateDto: UpdateTodoDTO): Promise<TodoEntity>;
    abstract deleteById(id:number): Promise<TodoEntity>;


}