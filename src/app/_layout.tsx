import { Slot } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";

import { initializeDatabase } from "@/database/initializeDatabase";
import { StatusBar } from "expo-status-bar";




export default function Layout(){
    return (
        <>
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



    );
}