import { useSQLiteContext } from "expo-sqlite";

/* DEFINIÇÃO DE TIPOS PARA OS OBJETOS */
export type TaskTable = {
    id: number
    description: string
    date: string
}


export function useTaskTable(){

    const database = useSQLiteContext();

    async function create(data: Omit<TaskTable, "id">){
        const statement = await database.prepareAsync(
            "INSERT INTO tasks (description, date) VALUES ($description, $date)"
        );

        try{
            const result = await statement.executeAsync(
                {
                    $description: data.description,
                    $date: data.date

                }
            );
        }catch(error){
            throw error;
        }finally{
            await statement.finalizeAsync;
        }

    }

    async function search(txt: string){
        const statement = await database.prepareAsync("SELECT * FROM tasks WHERE description LIKE $txt");

        try {
            const result = await statement.executeAsync<TaskTable>(
                {$txt: `%${txt}%`}
            );
            const list = await result.getAllAsync();
            return list  
        } catch (error) {
            throw error;
        }finally{
            await statement.finalizeAsync()
        }
    }

    /*
    async function search(txt: string){
        try {
            const query = "SELECT * FROM tasks WHERE description LIKE ?";
            const response = await database.getAllAsync<TaskTable>(query, `%${txt}%`);
            return response;
        }catch (error) {
            throw error;
        }
    }
    */


    async function destroy(id: number){
        const statement = await database.prepareAsync("DELETE FROM tasks WHERE id = $id");

        try{
            const result = await statement.executeAsync(
                {$id: id}
            );
        }catch (error) {
            throw error;
        }finally{
            await statement.finalizeAsync();
        }
    }

    async function findId(id: number){
        const statement = await database.prepareAsync("SELECT * FROM tasks WHERE id = $id");

        try {
            const result = await statement.executeAsync<TaskTable>(
                {$id: id}
            )
            const item = await result.getFirstAsync();
            return item
        } catch (error) {
            throw error;
        }finally{
            await statement.finalizeAsync();
        }
    }

    async function update(data: TaskTable){

        console.log(data)
        const statement = await database.prepareAsync(
            "UPDATE tasks SET description = $description, date = $date WHERE id = $id"
        );
        console.log(statement)
        try{
            const result = await statement.executeAsync(
                {
                    $id: data.id,
                    $description: data.description,
                    $date: data.date

                }
            );
        }catch(error){
            throw error;
        }finally{
            await statement.finalizeAsync;
        }
    }


    return { create, search, destroy, findId, update };

}