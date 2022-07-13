import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import useCrypto from "../../hooks/useCrypto";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";

const SignUp = ({ handleClose }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const { setAlert } = useCrypto();

    const handleSubmit = async () => {
        if (password !== confirmPassword) {
            setAlert({
                open: true,
                message: "Las contraseñas deben coincidir.",
                type: "error",
            });
            return;
        }

        try {
            const result = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            setAlert({
                open: true,
                message: `Registro exitoso. Bienvenido ${result.user.email}`,
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
            <TextField
                variant="outlined"
                type="password"
                label="Confirma la contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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

export default SignUp;
