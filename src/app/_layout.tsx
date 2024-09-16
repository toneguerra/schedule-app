import { Slot } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";

import { initializeDatabase } from "@/database/initializeDatabase";
import { StatusBar } from "expo-status-bar";
<<<<<<< HEAD


=======
>>>>>>> 13456adb4be3fd86471f3db5cf49bb6a1bceea5d


export default function Layout(){
    return (
        <>
<<<<<<< HEAD
            <StatusBar
                style="light"
                animated={true}
                backgroundColor="#61dafb"
                translucent={false}
            />
            <SQLiteProvider databaseName="prjschedule.db" onInit={initializeDatabase}>
                <Slot />
            </SQLiteProvider>
        </>



=======
        <StatusBar translucent={false} backgroundColor="background-color: rgb(148 163 184)"/>  
        <SQLiteProvider databaseName="prjschedule.db" onInit={initializeDatabase}>
            <Slot />
        </SQLiteProvider>
        </>
>>>>>>> 13456adb4be3fd86471f3db5cf49bb6a1bceea5d
    );
}