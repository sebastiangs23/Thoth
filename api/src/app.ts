import express, { Request, Response, NextFunction } from 'express';


const app = express();

/*_________________
|   MIDDLEWARES  */


/*_____________
|   ROUTES   */
import routes from './router/index.js';

app.use('/', routes);

/*_______________________
|   START THE SERVER   */
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || 500;
    const message = err.message || err;
    res.status(status).send(message);
});

export default app;