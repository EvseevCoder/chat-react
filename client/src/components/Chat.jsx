import React, { useEffect, useState }from "react";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000");

export default function Chat() {
    const {search} = useLocation();
    const [params, setParams] = useState({
        name: "",
        room: "",
    });

    useEffect(() => {
        const searchParams = Object.fromEntries(new URLSearchParams(search));
        setParams(searchParams);

        socket.emit("join", {
            ...searchParams,
        });
    }, [search]);

    useEffect(() => {
        socket.on("message", (data) => {
            console.log(data);
        });
    }, []);

    return (
        <div>
            <h1>Chat</h1>
        </div>
    )
}