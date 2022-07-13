import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import useCrypto from "../../hooks/useCrypto";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";

const Login = ({ handleClose }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { setAlert } = useCrypto();

    const handleSubmit = async () => {
        if (!email || !password) {
            setAlert({
                open: true,
                message: "Todos los campos son obligatorios.",
                type: "error",
            });
            return;
        }

        try {
            const result = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            setAlert({
                open: true,
                message: `Ingreso exitoso. Bienvenido ${result.user.email}`,
                type: "success",
            });
            handleClose();
        } catch (error) {
            setAlert({
                open: true,
                message: error.message,
                type: "error",
            });
        }
    };

    return (
        <Box
            sx={{
                padding: 3,
                display: "flex",
                flexDirection: "column",
                gap: "20px",
            }}
        >
            <TextField
                variant="outlined"
                type="email"
                label="Ingresa un email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
            />
            <TextField
                variant="outlined"
                type="password"
                label="Ingresa una contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
            />

            <Button
                variant="contained"
                size="large"
                sx={{
                    backgroundColor: "#eebc1b",
                }}
                onClick={handleSubmit}
            >
                Sign Up
            </Button>
        </Box>
    );
};

export default Login;
