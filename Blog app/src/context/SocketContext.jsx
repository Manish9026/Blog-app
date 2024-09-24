import { io } from "socket.io-client";
import { url } from "../tools/serverURL";
import { createContext, useContext, useEffect } from "react";
import {useCookies} from 'react-cookie'
// socket context
const SocketContext=createContext(null);
// socket provider
const SocketProvider = ({ children }) => {
    const [cookies]=useCookies()
const socket=io(url,{auth:{
  token:cookies?.uid
}});
    
    useEffect(() => {
      // Handle socket events if needed globally
      // For example, connection errors
    console.log(cookies?.uid);

      socket.on('connect_error', (err) => {
        console.error('Socket connection error:', err);
      });
      
  
      // Cleanup on unmount
      return () => {
        socket.off('connect_error');
        socket.disconnect();
      };
    }, []);
  
    return (
      <SocketContext.Provider value={socket}>
        {children}
      </SocketContext.Provider>
    );
  };

//   socket custom hook
export const useSocket = () => {
    const socket = useContext(SocketContext);
    if (!socket) {
      throw new Error('useSocket must be used within a SocketProvider');
    }
    return socket;
  };
  export default SocketProvider;