import express from 'express';

import cors from 'cors';
import globalErrorHandelar from './src/middleware/globalErrorHandeler.js';
import notFound from './src/middleware/notFound.js';



const app = express();

//middleware
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running");
});

// app.use('/api/v1/user',AuthRouter);
// app.use('/api/v1/message',MessageRouter);
// app.use('/api/v1/conversation',ConversationRouter)



app.use(globalErrorHandelar);
app.use(notFound);

export default app;
