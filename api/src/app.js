import express from 'express';


const app = express();

/*_________________
|   MIDDLEWARES  */


/*_____________
|   ROUTES   */
import routes from './router/index.js';

app.use('/', routes);

/*_______________________
|   START THE SERVER   */
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || err;
    res.status(status).send(message);
})

export default app;