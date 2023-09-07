import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {normalize} from "./src/consts/consts";
import BackgroundService from 'react-native-background-actions'
import BackgroundJob from 'react-native-background-actions'
import Sound from 'react-native-sound'
import Beep from './src/assets/beep.mp3'
import moment from "moment";

const options = {
    taskName: 'Demo',
    taskTitle: 'Demo Running',
    taskDesc: 'Demo',
    taskIcon: {
        name: 'ic_launcher',
        type: 'mipmap'
    },
    color: '#f0f',
    parameters: {
        delay: 10000
    },
    actions: '["Exit"]'
}

export default function App() {
    let intervalId;
    const beep = new Sound(Beep, Sound.MAIN_BUNDLE, (err) => {
        if (err) {
            console.log('Failed to load sound', err);
        }
    })
    useEffect(() => {
        if (!BackgroundJob.isRunning()) {
            BackgroundService.start(veryIntensiveTask, options).then();
        }
        return () => {
            // BackgroundService.stop().then();
        }
    }, [])
    const veryIntensiveTask = async (taskArguments) => {
        await new Promise(async (resolve) => {
            intervalId = setInterval(() => {
                if (checkIfHour()) makeBeepSounds()
            }, 60000)
        })
    }
    const checkIfHour = () => {
        const now = new Date();
        return now.getMinutes() === 0
    }
    const makeBeepSounds = () => {
        const now = new Date();
        const count = (now.getHours() % 12);
        console.log(count);
        beep.setNumberOfLoops(count === 0 ? 11 : count - 1).play()
    }

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeTxt}>Chime app</Text>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#181818',
        alignItems: 'center',
        justifyContent: 'center',
    },
    welcomeTxt: {
        fontSize: normalize(30),
        color: 'white',
        textAlign: 'center'
    },
});
