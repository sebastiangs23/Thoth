import 'dotenv/config'
import server from './app.js';

const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
    console.log(`SERVER LISTENING TO: ${PORT}.`)
});

