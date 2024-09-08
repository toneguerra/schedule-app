import { useTaskTable, TaskTable } from '@/database/useTaskTable';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useEffect, useState } from 'react';
import { View, Text, TextInput, Alert, Button, FlatList } from 'react-native';

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
        <View style={{flex:1, justifyContent:'center', alignItems:'center', marginTop:20}}>
            <Text>My Schedules - Tasks</Text>

            <View>
                <TextInput 
                    placeholder = "Descrição da Tarefa"
                    onChangeText={setDescription}
                    value={description}
                />
                <TextInput 
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

                <Button title="Gravar" onPress={create} />
            </View>

            <View>
                <TextInput placeholder="Pesquisar Tarefa" onChangeText={setTextSearch} />
            </View>

            <FlatList
                data={tasks}
                keyExtractor={(item)=>String(item.id)}
                renderItem={({item})=>
                    <Text>
                        {item.id} - {item.description} - {item.date}
                    </Text>}
            />

        </View>
    )
}