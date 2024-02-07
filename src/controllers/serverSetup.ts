 
import http from 'http';
 

export async function startServer() {
    const server = http.createServer((req, res) => {
        // This is just a placeholder, you can handle HTTP requests if needed
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello World\n');
    });

    try {
 

        // Listen on a specified port
        const PORT = process.env.PORT || 5000;
        server.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });

        return server;
    } catch (err) {
        console.log('Error connecting to the database:', err);
        throw err;
    }
}
