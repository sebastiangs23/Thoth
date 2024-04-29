import 'dotenv/config.js'
import server from './app.js';

const PORT = Number(process.env.PORT) || 5001;

server.listen(PORT, () => {
    console.log(`SERVER LISTENING TO: ${PORT}.`)
});

