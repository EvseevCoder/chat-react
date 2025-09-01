// Imports
import React, { useEffect, useState }from "react";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";

// Styles
import styles from "../styles/Chat.module.css";

// Socket
const socket = io.connect("http://localhost:5000");

export default function Chat() {

    // Constants
    const {search} = useLocation();
    const [params, setParams] = useState({
        name: "",
        room: "",
    });
    const [message, setMessage] = useState("");
    const [state, setState] = useState([]);

    // Effects
    useEffect(() => {
        const searchParams = Object.fromEntries(new URLSearchParams(search));
        setParams(searchParams);

        socket.emit("join", {
            ...searchParams,
        });
    }, [search]);

    useEffect(() => {
        socket.on("message", ({ data }) => {
            setState((_state) => [..._state, data]);
        });
    }, []);

    // Functions
    const handleChange = ({target: {value}}) => {
        setMessage(value);
    }

    const leaveRoom = () => {
        console.log("leave room");
    }

    return (
        <div className={styles.wrap}>
            <div className={styles.header}>
                <div className={styles.title}>
                    {params.room}
                </div>
                <div className={styles.users}>
                    0 users in this room
                </div>

                <button
                    className={styles.left}
                    onClick={leaveRoom}
                >
                    Leave the room
                </button>
            </div>

            <div className={styles.messages}>
               {state.map(({message}) => <span>{message}</span>)}
            </div>

            <form action="" className={styles.form}>
                <div className={styles.input}>
                    <input
                        type="text"
                        name="message"
                        value={message}
                        autoComplete="off"
                        placeholder="What do you want to say?"
                        onChange={handleChange}
                        required
                    />
                </div>
            </form>
        </div>
    )
}