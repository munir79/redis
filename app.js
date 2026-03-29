import express from 'express';

import cors from 'cors';
import globalErrorHandelar from './src/middleware/globalErrorHandeler.js';
import notFound from './src/middleware/notFound.js';
import redisClient from './src/config/redis.js';
import { productRouter } from './src/module/product/product.route.js';



const app = express();

//middleware
app.use(cors());

app.use(express.json());

app.get('/redis-test',async(req,res)=>{
 try{
   await redisClient.set('name',"munir");
  const data=await redisClient.get("name");
  res.json({
    message:" redis working",
    data:data
  })
 }
 catch(err){
  console.error(err);
  res.status(500).json({
    success:false,
    message:err.message
  })
 }
})

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use('/api/v1/product',productRouter);
// app.use('/api/v1/message',MessageRouter);
// app.use('/api/v1/conversation',ConversationRouter)



app.use(globalErrorHandelar);
app.use(notFound);

export default app;
