import React, { useState } from "react";
import styles from "../styles/Main.module.css";
import { Link } from "react-router-dom";

const FIELDS = {
    NAME: "name",
    ROOM: "room",
}

export default function Main() {

    // Constants
    const { NAME, ROOM } = FIELDS;

    const [values, setValues] = useState({ [NAME]: "", [ROOM]: "" });

    // Functions
    const handleChange = ({target: {value, name}}) => {
        setValues({ ...values, [name]: value });
    }

    const handleClick = (e) => {
        const isDisabled = Object.values(values).some(value => value === "");
        if (isDisabled) {
            e.preventDefault();
        }
    }

    return (
        <div className={styles.wrap}>
            <h1 className={styles.heading}>
                Join
            </h1>

            <form className={styles.form}>
                <div className={styles.group}>
                    <input
                        type="text"
                        name="name"
                        value={values[NAME]}
                        className={styles.input}
                        autoComplete="off"
                        placeholder="Enter your name"
                        required
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="room"
                        value={values[ROOM]}
                        className={styles.input}
                        autoComplete="off"
                        placeholder="Enter your Room"
                        required
                        onChange={handleChange}
                    />

                    <Link
                        className={styles.group}
                        onClick={handleClick}
                        to={`/chat?name=${values[NAME]}&room=${values[ROOM]}`}
                    >
                        <button 
                            className={styles.button}
                            type="submit"
                        >
                            Sign In
                        </button>
                    </Link>
                </div>
            </form>
        </div>
    )
}