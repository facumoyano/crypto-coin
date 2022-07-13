import React from "react";
import { Box, Container, Typography } from "@mui/material";
import Carousel from "./Carousel";

const Banner = () => {
    return (
        <Box
            sx={{
                backgroundImage: "url(./banner2.jpg)",
            }}
        >
            <Container
                sx={{
                    height: 400,
                    display: "flex",
                    flexDirection: "column",
                    paddingTop: 5,
                    justifyContent: "space-around",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        height: "40%",
                        flexDirection: "column",
                        justifyContent: "center",
                        textAlign: "center",
                    }}
                >
                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: "bold",
                            marginBottom: 3,
                            fontFamily: "Montserrat",
                        }}
                    >
                        Crypto Coins
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        sx={{
                            color: "darkgrey",

                            fontFamily: "Montserrat",
                        }}
                    >
                        Obtén información de todas tus cryptos favoritas.
                    </Typography>
                </Box>
                <Carousel />
            </Container>
        </Box>
    );
};

export default Banner;
