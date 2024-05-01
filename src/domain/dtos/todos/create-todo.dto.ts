

export class CreateTodoDTO{
   private constructor( // Solo se llama un static
        public readonly text :string
    ){}

    static create (props: {[key:string] : any}): [string?, CreateTodoDTO?]{
        const {text} = props;
        if (!text ) return ['Text Property is required ', undefined];
        // 
        return [undefined,new CreateTodoDTO(text)]
    }
}