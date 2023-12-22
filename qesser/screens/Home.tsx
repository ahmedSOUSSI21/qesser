import { StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'
import Messages from '../components/messages/Messages'
import Notifications from '../components/notifications/Notifications'
import Search from '../components/search/Search'
import Menu from '../components/menu/Menu'
import Profile from '../components/profile/Profile'
import Splash from '../components/splash/Splash'

const tabData = (setActiveTab: Function) : any => {
    return {
        "messages": <Messages/>,
        "search": <Search />,
        "notifications": <Notifications />,
        "profile": <Profile />,
        "splash": <Splash setActiveTab={setActiveTab} nextScreen='messages'/>
    }
}

const Home = () => {
    const [activeTab, setActiveTab] = React.useState('splash' as string)
    return (
        <SafeAreaView style={styles.container}>
            {tabData(setActiveTab)[activeTab]}
            {activeTab != "splash" && <Menu activeTab={activeTab} setActiveTab={setActiveTab} />}
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        flex: 1,
        justifyContent: 'space-between',
    }
})