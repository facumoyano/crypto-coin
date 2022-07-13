import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import axios from "axios";
import { TrendingCoins } from "../api/api";
import useCrypto from "../hooks/useCrypto";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";

const Carousel = () => {
    const [trending, setTrending] = useState([]);
    const { moneda, symbol } = useCrypto();

    const fetchTrendingCoins = async () => {
        const { data } = await axios(TrendingCoins(moneda));
        setTrending(data);
    };

    useEffect(() => {
        fetchTrendingCoins();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [moneda]);

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const items = trending.map((coin) => {
        let profit = coin?.price_change_percentage >= 0;

        return (
            <Link
                to={`coins/${coin.id}`}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    cursor: "pointer",
                    textTransform: "uppercase",
                    color: "white",
                    fontFamily: "Montserrat",
                }}
            >
                <img
                    src={coin?.image}
                    alt={coin.name}
                    height="80"
                    style={{ marginBottom: 10 }}
                />
                <span>
                    {coin.symbol}
                    &nbsp;
                    <span
                        style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                        }}
                    >
                        {profit && "+"}{" "}
                        {coin?.price_change_percentage_24h?.toFixed(2)}%
                    </span>
                </span>
                <span style={{ fontSize: 22, fontWeight: 500 }}>
                    {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
                </span>
            </Link>
        );
    });

    const responsive = {
        0: {
            items: 2,
        },
        512: {
            items: 4,
        },
    };

    return (
        <Box
            sx={{
                height: "50%",
                display: "flex",
                alignItems: "center",
            }}
        >
            <AliceCarousel
                mouseTracking
                infinite
                autoPlayInterval={1000}
                animationDuration={1500}
                disableDotsControls
                disableButtonsControls
                responsive={responsive}
                autoPlay
                items={items}
            />
        </Box>
    );
};

export default Carousel;
