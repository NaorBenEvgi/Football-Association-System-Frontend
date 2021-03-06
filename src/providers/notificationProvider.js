import React from 'react';
import SockJsClient from "react-stomp";
import logger from '../logger';

export const NotificationContext = React.createContext();

function NotificationProvider({ children }) {

    const [state, setState] = React.useState({
        topics: [],
        clientConnected: false,
        notifications: [],
        client: null
    })

    const onMessageReceive = (msg, topic) => {
        logger.log('NotificationProvider -> onMessageReceive', `Got new message. content: ${msg}`);
        setState({ ...state, notifications: [...state.notifications, msg] })
        // On login, we need to set notification array like this: [...state.notifications, msg]: notificationContext.setState({ ...state, notifications: user.norification }))
    }

    const initClient = client => {
        if (!state.clientConnected && client) {
            setState({ ...state, client: client, clientConnected: true });
        }
        return null;
    }
    logger.log('NotificationProvider -> topics', `Got topics: ${state.topics}`);

    return (
        //console.log(state.topics),
        <NotificationContext.Provider value={{ state, setState }}>
            {
                children
            }
            <SockJsClient url="http://localhost:8080/notifications" topics={state.topics}
                onMessage={onMessageReceive} ref={(client) => { initClient(client) }}
                onConnect={() => { setState({ ...state, clientConnected: true }) }}
                onDisconnect={() => { setState({ ...state, clientConnected: false }) }}
                debug={false} />
        </NotificationContext.Provider>
    )
}

export default NotificationProvider;
