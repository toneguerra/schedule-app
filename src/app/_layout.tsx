import { Slot } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";

import { initializeDatabase } from "@/database/initializeDatabase";
import { StatusBar } from "expo-status-bar";


export default function Layout(){
    return (
        <>
        <StatusBar translucent={false} backgroundColor="background-color: rgb(148 163 184)"/>  
        <SQLiteProvider databaseName="prjschedule.db" onInit={initializeDatabase}>
            <Slot />
        </SQLiteProvider>
        </>
    );
}