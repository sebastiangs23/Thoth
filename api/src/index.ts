import 'dotenv/config.js'
import server from './app.js';

const PORT = Number(process.env.PORT) || 5001;

server.listen(PORT, '0.0.0.0', () => {
    console.log(`SERVER LISTENING TO: ${PORT}.`)
});

