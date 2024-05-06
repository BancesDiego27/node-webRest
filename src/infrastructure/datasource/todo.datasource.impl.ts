import { prisma } from "../../data/postgres";
import { CreateTodoDTO, TodoDataSource, TodoEntity, UpdateTodoDTO } from "../../domain";

export class TodoDatasourceImpl implements TodoDataSource{

    async create(createTodoDTO: CreateTodoDTO): Promise<TodoEntity> {
        const todo = await prisma.todo.create({
            data:createTodoDTO!
            })
        return TodoEntity.fromObject(todo)
    }
    
   async getAll(): Promise<TodoEntity[]> {
        const allTodos = await prisma.todo.findMany()

        return allTodos.map(todo => TodoEntity.fromObject(todo))
    }

    async findById(id: number): Promise<TodoEntity> {
        const todo = await prisma.todo.findUnique({
            where:{
                id
            }
        });
        if(!todo) throw `Todo with id ${id} not found`
        return TodoEntity.fromObject(todo)
    }

    async updateById(updateDto: UpdateTodoDTO): Promise<TodoEntity> {
        await this.findById(updateDto.id)
        const updateTodo = await prisma.todo.update({
            where: {
               id: updateDto.id,
            },
            data: updateDto!.values,
          });

          return TodoEntity.fromObject(updateDto)
    }

   async deleteById(id: number): Promise<TodoEntity> {
        await this.findById(id);
        const deleteTodo = await  prisma.todo.delete({
            where:{
                id
            }
        });
        return TodoEntity.fromObject(deleteTodo)
    }

}