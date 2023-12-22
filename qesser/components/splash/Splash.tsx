import { StyleSheet, Text, Animated, View } from 'react-native'
import React from 'react'

type Props = {
    setActiveTab: Function, 
    nextScreen: string
}


const Splash:React.FC<Props> = ({setActiveTab, nextScreen}) => {
    const translateY1 = new Animated.Value(0)
    const translateY2 = new Animated.Value(600)
    const translateX1 = new Animated.Value(0)
    const translateX2 = new Animated.Value(0)
    const duration = 700
    const separationDuration = 500

    React.useEffect(() => {
        Animated.parallel([
            Animated.timing(translateY1, {
                toValue: 150,
                duration: duration,
                useNativeDriver: false,
            }),
            Animated.timing(translateY2, {
                toValue: 150,
                duration: duration,
                useNativeDriver: false,
            }),
        ]).start(() => {
            setTimeout(() => {
                Animated.parallel([
                    Animated.timing(translateX1, {
                        toValue: -300,
                        duration: separationDuration,
                        useNativeDriver: false,
                    }),
                    Animated.timing(translateX2, {
                        toValue: 300,
                        duration: separationDuration,
                        useNativeDriver: false,
                    }),
                ]).start(() => {
                    setActiveTab(nextScreen)
                })
            }, 500)
        })
    }, [])

    return (
        <View style={styles.container}>
            <Animated.View style={[{ transform: [{ translateY: translateY1 }, { translateX: translateX1 }] }]}>
                <Text style={styles.text}>Qes</Text>
            </Animated.View>
            <Animated.View style={[{ transform: [{ translateY: translateY2 }, { translateX: translateX2 }] }]}>
                <Text style={styles.text}>ser</Text>
            </Animated.View>
        </View>
    )
}

export default Splash

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'black'
    },
    text: {
        color: 'white',
        fontSize: 100,
    }
})