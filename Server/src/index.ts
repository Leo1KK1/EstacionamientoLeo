import server from "./server";

server.listen(3001, () => {
    console.log('Server is running on port 3001');
    console.log('http://localhost:3001');
});