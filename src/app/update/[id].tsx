import { TaskTable, useTaskTable } from "@/database/useTaskTable";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Text, TextInput, TouchableHighlight, View } from "react-native";

export default function update(){
    const [id, setId] = useState(0) 
    const [description, setDescription] = useState("") 
    const [date, setDate] = useState("")


    const param = useLocalSearchParams()

    const taskTable = useTaskTable()

    async function detailId(){
        const result =  await taskTable.findId(Number.parseInt(param.id.toString()));
        setId(result!.id)
        setDescription(result!.description)
        setDate(result!.date)
    }

    async function saveModifies(){
        try{

            await taskTable.update(
                {id, description, date}
            ); 
            Alert.alert("Tarefa Atualizada!");  
            router.push('/')
               
        }catch(error){
            console.log("Erro no cadastramento");
        }
    }

    useEffect(() => {
        detailId()
    },[])
    
    return (
        <View className="flex-1 justify-center p-2">
            <Text>{param.id}</Text>

            <View className="w-full">

                <TextInput 
                    className="border border-indigo-800
                        bg-indigo-200
                        rounded-md 
                        p-1 pl-2 pr-2 mb-4
                        focus:border-2
                        focus:bg-indigo-50
                        focus:border-indigo-500"
                    placeholder = "Descrição da Tarefa"
                    onChangeText={setDescription}
                    value={description}
                />

                <TextInput 
                    className="border border-indigo-800
                        bg-indigo-200
                        rounded-md 
                        p-1 pl-2 pr-2 mb-4
                        focus:border-2
                        focus:bg-indigo-50
                        focus:border-indigo-500"
                    placeholder = "Data"
                    onChangeText={setDate}
                    value={date}
                />

                <TouchableHighlight onPress={saveModifies} className="bg-indigo-800 p-4 rounded-lg ">
                    <Text className="text-center font-bold text-white">Gravar</Text>
                </TouchableHighlight>
            </View>
        </View>
    );
}