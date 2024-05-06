import { CreateTodoDTO, TodoDataSource, TodoEntity, TodoRepository, UpdateTodoDTO } from "../../domain";

export class TodoRepositoryImpl implements TodoRepository{
    constructor(
        private readonly datasource: TodoDataSource,
    ){}
    create(createTodoDTO: CreateTodoDTO): Promise<TodoEntity> {
        return this.datasource.create(createTodoDTO)
    }
    getAll(): Promise<TodoEntity[]> {
     return this.datasource.getAll()   
    }
    findById(id: number): Promise<TodoEntity> {
        return this.datasource.findById(id);
     
    }
    updateById(updateDto: UpdateTodoDTO): Promise<TodoEntity> {
        return this.datasource.updateById(updateDto);
        
    }
    deleteById(id: number): Promise<TodoEntity> {
        return this.datasource.deleteById(id)
    }

}