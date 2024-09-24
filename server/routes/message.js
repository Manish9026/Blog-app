import express from 'express'
import { authMiddleWare } from '../middlewares/auth.js';
import { userMessage } from '../Controllers/userMessage.js';
export const messageRoute=express.Router();

messageRoute.get("/messages",authMiddleWare,userMessage.getMessages)

 