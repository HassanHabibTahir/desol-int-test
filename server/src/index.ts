import 'dotenv/config';
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import timeout from 'connect-timeout';
import { serverError } from './middleware';
import { authRoutes } from './routes/auth.routes';
import { connectDB } from './utils/conn';
import { vehilesRoutes } from './routes/vehicles.routes';
import fileUpload, { UploadedFile } from 'express-fileupload';

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(timeout('60000s'));
app.use(cors());
app.use(fileUpload());
const main = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
};
app.use('/api/auth', authRoutes);
app.use('/api/vehicles', vehilesRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Express Server');
});


main().catch((error) => {
  console.error(error);
  process.exit(1);
});
app.use(serverError);
