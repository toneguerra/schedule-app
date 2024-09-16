import { useTaskTable, TaskTable } from '@/database/useTaskTable';
import DateTimePicker from '@react-native-community/datetimepicker';

import { useEffect, useState } from 'react';
import { Alert, Button, FlatList, Text, TextInput, View } from 'react-native';
import { Link, router } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';


export default function Home(){
    const taskTable = useTaskTable();

    const [tasks, setTasks] = useState<TaskTable[]>([])
    const [description, setDescription] = useState("")

    const [dtp, setDtp] = useState(new Date());
    const [date, setDate] = useState(dtp.toString())

    const [textSearch, setTextSearch] = useState("")

    
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
        <View className="flex flex-1 w-full bg-slate-100 p-4">

            <Text className="bg-slate-500">My Schedules - Taskss</Text>

            <View>
                <TextInput 
                    placeholder = "Descrição da Tarefa"
                    onChangeText={setDescription}
                    value={description}
                />
                <TextInput 
                    placeholder = "Data"
                    onChangeText={setDate}
                    onTouchStart={()=>setShowDtp(true)}
                    value={date}
                />

                { 
                    showDtp && (<DateTimePicker mode='date' value={dtp || new Date() } onChange={hdChangeDate} display='spinner' />)         
                }

                <Button title="Gravar" onPress={create} />
            </View>

            <View>
                <TextInput placeholder="Pesquisar Tarefa" onChangeText={setTextSearch} />
            </View>

            <FlatList
                data={tasks}
                keyExtractor={(item)=>String(item.id)}
                renderItem={({item})=>
                    <View className="flex-row justify-between">
                        <Text>
                            {item.id} - {item.description} - {item.date}
                        </Text>

                        <FontAwesome name="trash-o" size={24} color="red" onPress={()=>router.push({pathname:'./excluir/[id]', params:{id:item.id}})} />
                        
                        <Link href={{pathname:'./excluir/[id]', params:{id:item.id}}}>
                            <FontAwesome name="trash-o" size={24} color="blue" />
                        </Link>

                        <Link href={`./excluir/${item.id}`}>
                            <FontAwesome name="trash-o" size={24} color="yellow" />
                        </Link>
                    </View>
                }
            />

        </View>
    )
}