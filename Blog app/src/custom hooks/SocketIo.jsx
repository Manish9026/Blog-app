import React from 'react'
import {io} from 'socket.io-client'
import { url } from '../tools/serverURL'
const SocketIo = () => {
const socketIo=io(url)


}

export default SocketIo