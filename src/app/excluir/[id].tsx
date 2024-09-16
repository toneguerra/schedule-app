import { Text, View } from "react-native";
import {useLocalSearchParams, Link, router} from "expo-router"
import { useTaskTable } from "@/database/useTaskTable";


export default function Excluir(){
    const taskTable = useTaskTable()
    const param = useLocalSearchParams()

    async function destroy(id:Number){
        await taskTable.destroy(Number.parseInt(id.toString()))
        router.push("/");
    }

    return (
        <View className="flex flex-1 justify-center items-center">
            <Text>Tarefa id: {param.id}</Text>

        <View className="flex-row justify-around w-full mt-2">
            <Text onPress={()=>destroy(Number.parseInt(param.id.toString()))}>Excluir</Text>
            <Link href={"/"}>Cancelar</Link>    
        </View>

        </View>
    );
}