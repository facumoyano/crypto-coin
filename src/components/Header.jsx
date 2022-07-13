import React from "react";
import {
    AppBar,
    Container,
    Toolbar,
    Typography,
    Select,
    MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import useCrypto from "../hooks/useCrypto";

const Header = () => {
    const navigate = useNavigate();
    const { moneda, setMoneda } = useCrypto();

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff",
            },
            mode: "dark",
        },
    });

    return (
        <ThemeProvider theme={darkTheme}>
            <AppBar color="transparent" position="static">
                <Container>
                    <Toolbar>
                        <Typography
                            variant="h5"
                            sx={{
                                color: "gold",
                                flex: 1,
                                fontFamily: "Montserrat",
                                fontWeight: "bold",
                                cursor: "pointer",
                            }}
                            onClick={() => navigate("/")}
                        >
                            Crypto Coins
                        </Typography>
                        <Select
                            variant="outlined"
                            value={moneda}
                            onChange={(e) => setMoneda(e.target.value)}
                            sx={{
                                width: 100,
                                height: 40,
                            }}
                        >
                            <MenuItem value={"USD"}>USD</MenuItem>
                            <MenuItem value={"ARS"}>ARS</MenuItem>
                        </Select>
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    );
};

export default Header;
