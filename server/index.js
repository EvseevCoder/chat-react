const express = require("express");
const http = require("http");
const { Server} = require("socket.io");
const cors = require("cors");
const { addUser } = require("./users");

const app = express();

const route = require("./route");

app.use(cors({ origin: "*"}));
// app.use(route);

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log("User connected");

    socket.on("join", (data) => {
        socket.join(data?.room);

        const { user } = addUser(data);

        socket.emit("message", {
            data: {
                user: "admin",
                text: `Hey, my love ${user?.name}!`,
            }
        });

        socket.broadcast.to(data?.room).emit("message", {
            data: {
                user: "admin",
                text: `${user?.name} has joined the room`,
            }
        })
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});


server.listen(5000, () => {
    console.log("Server is running on port 5000");
})