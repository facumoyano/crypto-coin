import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useCrypto from "../hooks/useCrypto";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
    Container,
    Typography,
    TextField,
    TableContainer,
    LinearProgress,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Box,
    Pagination,
} from "@mui/material";

const CoinsTable = () => {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const navigate = useNavigate();

    const { moneda, symbol, coins, loading, fetchCoins } = useCrypto();

    useEffect(() => {
        fetchCoins();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [moneda]);

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff",
            },
            mode: "dark",
        },
    });

    const handleSearch = () => {
        return coins.filter(
            (coin) =>
                coin.name.toLowerCase().includes(search) ||
                coin.symbol.toLowerCase().includes(search)
        );
    };

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <Container sx={{ textAlign: "center" }}>
                <Typography
                    variant="h4"
                    sx={{ margin: 6, fontFamily: "Montserrat" }}
                >
                    Precios de criptomonedas por Market cap
                </Typography>
                <TextField
                    label="Busca una criptomoneda"
                    variant="outlined"
                    onChange={(e) => setSearch(e.target.value)}
                    sx={{ marginBottom: 10, width: "100%" }}
                />
                <TableContainer>
                    {loading ? (
                        <LinearProgress sx={{ background: "gold" }} />
                    ) : (
                        <Table>
                            <TableHead sx={{ backgroundColor: "#EEBC1D" }}>
                                <TableRow>
                                    {[
                                        "Coin",
                                        "Price",
                                        "24h Change",
                                        "Market Cap",
                                    ].map((head) => (
                                        <TableCell
                                            key={head}
                                            sx={{
                                                color: "black",
                                                fontWeight: "bold",
                                                fontFamily: "Montserrat",
                                            }}
                                            align={
                                                head === "Coin" ? "" : "right"
                                            }
                                        >
                                            {head}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {handleSearch()
                                    .slice(
                                        (page - 1) * 10,
                                        (page - 1) * 10 + 10
                                    )
                                    .map((coin) => {
                                        const profit =
                                            coin.price_change_percentage_24h >
                                            0;
                                        return (
                                            <TableRow
                                                onClick={() =>
                                                    navigate(
                                                        `/coins/${coin.id}`
                                                    )
                                                }
                                                key={coin.name}
                                                sx={{
                                                    backgroundColor: "#16171a",
                                                    cursor: "pointer",
                                                    "&:hover": {
                                                        backgroundColor:
                                                            "#131111",
                                                    },
                                                    fontFamily: "Montserrat",
                                                }}
                                            >
                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 1,
                                                    }}
                                                >
                                                    <img
                                                        src={coin?.image}
                                                        alt={coin.name}
                                                        height="50"
                                                        style={{
                                                            marginBottom: 5,
                                                        }}
                                                    />
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection:
                                                                "column",
                                                        }}
                                                    >
                                                        <Typography
                                                            variant="subtitle1"
                                                            textTransform="uppercase"
                                                            fontSize={22}
                                                            as="span"
                                                        >
                                                            {coin.symbol}
                                                        </Typography>
                                                        <Typography
                                                            as="span"
                                                            sx={{
                                                                color: "darkgrey",
                                                            }}
                                                        >
                                                            {coin.name}
                                                        </Typography>
                                                    </Box>
                                                </TableCell>
                                                <TableCell align="right">
                                                    {symbol}{" "}
                                                    {numberWithCommas(
                                                        coin.current_price.toFixed(
                                                            2
                                                        )
                                                    )}
                                                </TableCell>
                                                <TableCell
                                                    align="right"
                                                    sx={{
                                                        color:
                                                            profit > 0
                                                                ? "rgb(14, 203, 129)"
                                                                : "red",
                                                        fontWeight: 500,
                                                    }}
                                                >
                                                    {profit && "+"}
                                                    {coin.price_change_percentage_24h.toFixed(
                                                        2
                                                    )}
                                                    %
                                                </TableCell>
                                                <TableCell align="right">
                                                    {symbol}{" "}
                                                    {numberWithCommas(
                                                        coin.market_cap
                                                            .toString()
                                                            .slice(0, -6)
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    )}
                </TableContainer>
                <Pagination
                    sx={{
                        padding: 10,
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        "& .MuiPaginationItem-root": {
                            color: "gold",
                        },
                    }}
                    count={(handleSearch()?.length / 10).toFixed(0)}
                    onChange={(_, value) => {
                        setPage(value);
                        window.scroll(0, 450);
                    }}
                />
            </Container>
        </ThemeProvider>
    );
};

export default CoinsTable;
