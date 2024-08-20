import React from 'react'
import {io} from 'socket.io-client'
import { url } from '../tools/serverURL'
const useSocket = () => {
    console.log(url);
    
const socketIo= io(url)


return socketIo
}

export default useSocket