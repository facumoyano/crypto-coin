import { LinearProgress, Typography, Box } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../api/api";
import CoinInfo from "../components/CoinInfo";
import useCrypto from "../hooks/useCrypto";
import { useTheme } from "@mui/material/styles";

const CoinPage = () => {
    const { id } = useParams();
    const [coin, setCoin] = useState();
    const theme = useTheme();

    const { moneda, symbol } = useCrypto();

    const fetchCoin = async () => {
        const { data } = await axios.get(SingleCoin(id));

        setCoin(data);
    };

    useEffect(() => {
        fetchCoin();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

    return (
        <Box
            sx={{
                display: "flex",
                [theme.breakpoints.down("md")]: {
                    flexDirection: "column",
                    alignItems: "center",
                },
            }}
        >
            <Box
                sx={{
                    width: "30%",
                    [theme.breakpoints.down("md")]: {
                        width: "100%",
                    },
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginTop: 10,
                    borderRight: "2px solid grey",
                }}
            >
                <img
                    src={coin?.image.large}
                    alt={coin?.name}
                    height="200"
                    style={{ marginBottom: 20 }}
                />
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: "bold",
                        marginBottom: 3,
                        fontFamily: "Montserrat",
                    }}
                >
                    {coin?.name}
                </Typography>
                <Typography
                    variant="subtitle1"
                    sx={{
                        width: "100%",
                        fontFamily: "Montserrat",
                        padding: 4,
                        textAlign: "justify",
                    }}
                >
                    {coin?.description.en.split(". ")[0]}.
                </Typography>
                <Box
                    sx={{
                        alignSelf: "start",
                        padding: 4,

                        width: "100%",
                        [theme.breakpoints.down("md")]: {
                            display: "flex",
                            justifyContent: "space-around",
                        },
                        [theme.breakpoints.down("sm")]: {
                            flexDirection: "column",
                        },
                        [theme.breakpoints.down("xs")]: {
                            alignItems: "start",
                        },
                    }}
                >
                    <span style={{ display: "flex" }}>
                        <Typography variant="h5" fontWeight="bold">
                            Rank:
                        </Typography>
                        &nbsp; &nbsp;
                        <Typography
                            variant="h5"
                            style={{
                                fontFamily: "Montserrat",
                            }}
                        >
                            {numberWithCommas(coin?.market_cap_rank)}
                        </Typography>
                    </span>

                    <span
                        style={{
                            display: "flex",
                            marginTop: 8,
                            marginBottom: 8,
                        }}
                    >
                        <Typography variant="h5" fontWeight="700">
                            Precio actual:
                        </Typography>
                        &nbsp; &nbsp;
                        <Typography
                            variant="h5"
                            style={{
                                fontFamily: "Montserrat",
                            }}
                        >
                            {symbol}{" "}
                            {numberWithCommas(
                                coin?.market_data.current_price[
                                    moneda.toLowerCase()
                                ]
                            )}
                        </Typography>
                    </span>
                    <span style={{ display: "flex" }}>
                        <Typography variant="h5" fontWeight="700">
                            Market Cap:
                        </Typography>
                        &nbsp; &nbsp;
                        <Typography
                            variant="h5"
                            style={{
                                fontFamily: "Montserrat",
                            }}
                        >
                            {symbol}{" "}
                            {numberWithCommas(
                                coin?.market_data.market_cap[
                                    moneda.toLowerCase()
                                ]
                                    .toString()
                                    .slice(0, -6)
                            )}
                            M
                        </Typography>
                    </span>
                </Box>
            </Box>
            <CoinInfo coin={coin} />
        </Box>
    );
};

export default CoinPage;
