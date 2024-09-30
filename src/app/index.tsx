import { useTaskTable, TaskTable } from '@/database/useTaskTable';
import DateTimePicker from '@react-native-community/datetimepicker';

import { useEffect, useState } from 'react';
import { Alert, Button, FlatList, Text, TextInput, TouchableHighlight, View } from 'react-native';
import { Link, router } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Ionicons } from '@expo/vector-icons';


export default function Home(){
    const taskTable = useTaskTable();

    const [tasks, setTasks] = useState<TaskTable[]>([])
    const [description, setDescription] = useState("") 
    const [date, setDate] = useState("")

    const [textSearch, setTextSearch] = useState("")

    /* FUNÇÃO DATETIMEPICKER
    const [dtp, setDtp] = useState(new Date());
    const [showDtp, setShowDtp] = useState(false);
    const hdChangeDate = (event, selectedDate)=>{
        if (event.type === 'set'){
            const currentDate = selectedDate
            //setDtp(currentDate)
            setDate(currentDate.toString())
            setShowDtp(false)
          
        }
        console.log(date)
        
        Alert.alert("Datado")
    }
    */

    async function create(){
        try{
            const response = await taskTable.create(
                {description, date}
            ); 
            Alert.alert("Tarefa Criada!");  
            search();        
        }catch(error){
            console.log("Erro no cadastramento");
        }

    }

    async function search(){
        const response = await taskTable.search(textSearch);
        setTasks(response);
        console.log(response);
    }



    useEffect(() => {
        search();
    },[textSearch])

    return (
        <View className="bg-indigo-900 flex-1 justify-center items-center pl-4 pr-4">
            <Text className="self-start text-xl text-indigo-100 font-semibold mt-4 mb-4">My Schedules - Tasks</Text>

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
                    //onTouchStart={()=>setShowDtp(true)}
                    value={date}
                />

                { 
                /*
                    showDtp && (<DateTimePicker mode='date' value={dtp || new Date() } onChange={hdChangeDate} display='spinner' />)         
                */
                }

                <TouchableHighlight onPress={create} className="bg-indigo-800 p-4 rounded-lg ">
                    <Text className="text-center font-bold text-white">Gravar</Text>
                </TouchableHighlight>

            </View>

            <View className="bg-indigo-400 w-full mt-4 mb-4 p-2 flex-row justify-between items-center ">
                <TextInput className="border w-11/12  text-white" placeholder="Pesquisar Tarefa" onChangeText={setTextSearch} />
                <Ionicons className="" name="search" size={24} color="blue" />
            </View>


            <FlatList
                className="bg-indigo-950 w-full p-2"
                data={tasks}
                keyExtractor={(item)=>String(item.id)}
                renderItem={({item})=>
                    <View className="flex-row justify-between">
                        <Text className="text-indigo-100">
                            {item.id} - {item.description} - {item.date}
                        </Text>

                        <FontAwesome name="trash-o" size={24} color="red" onPress={()=>router.push({pathname:'./excluir/[id]', params:{id:item.id}})} />
                        <FontAwesome6 name="edit" size={24} color="black" onPress={()=>router.push({pathname:'./update/[id]', params:{id:item.id}})}/>

                        {/*
                        <Link href={{pathname:'./excluir/[id]', params:{id:item.id}}}>
                            <FontAwesome name="trash-o" size={24} color="blue" />
                        </Link>

                        <Link href={`./excluir/${item.id}`}>
                            <FontAwesome name="trash-o" size={24} color="yellow" />
                        </Link>
                        */}
                    </View>
                }
            />

        </View>
    )
}