import React, { useState, useEffect } from "react";
import useCrypto from "../hooks/useCrypto";
import axios from "axios";
import { HistoricalChart } from "../api/api";
import { ThemeProvider, createTheme, useTheme } from "@mui/material/styles";
import { Box, CircularProgress } from "@mui/material";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import { chartDays } from "../data/chartDays";
import SelectButton from "./SelectButton";

const CoinInfo = ({ coin }) => {
    ChartJS.register(...registerables);
    const [historicData, setHistoricData] = useState();
    const [days, setDays] = useState(1);

    const theme = useTheme();

    const { moneda } = useCrypto();

    const fetchHistoricData = async () => {
        const { data } = await axios.get(
            HistoricalChart(coin.id, days, moneda)
        );
        setHistoricData(data.prices);
    };

    useEffect(() => {
        fetchHistoricData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [moneda, days]);

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
            <Box
                sx={{
                    width: "75%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 2,
                    padding: 4,
                    [theme.breakpoints.down("md")]: {
                        width: "100%",
                        marginTop: 2,
                        padding: 2,
                        paddingTop: 0,
                    },
                }}
            >
                {!historicData ? (
                    <CircularProgress
                        sx={{ color: "gold" }}
                        size={250}
                        thickness={1}
                    />
                ) : (
                    <>
                        <Line
                            data={{
                                labels: historicData.map((coin) => {
                                    let date = new Date(coin[0]);
                                    let time =
                                        date.getHours() > 12
                                            ? `${
                                                  date.getHours() - 12
                                              }:${date.getMinutes()} PM`
                                            : `${date.getHours()}:${date.getMinutes()} AM`;
                                    return days === 1
                                        ? time
                                        : date.toLocaleDateString();
                                }),

                                datasets: [
                                    {
                                        data: historicData.map(
                                            (coin) => coin[1]
                                        ),
                                        label: `Precio ( Pasado ${days} días ) en ${moneda}`,
                                        borderColor: "#EEBC1D",
                                    },
                                ],
                            }}
                            options={{
                                elements: {
                                    point: {
                                        radius: 1,
                                    },
                                },
                            }}
                        />
                        <Box
                            sx={{
                                display: "flex",
                                marginTop: 4,
                                justifyContent: "space-around",
                                width: "100%",
                            }}
                        >
                            {chartDays.map((day) => (
                                <SelectButton
                                    key={day.value}
                                    onClick={() => setDays(day.value)}
                                    selected={day.value === days}
                                >
                                    {day.label}
                                </SelectButton>
                            ))}
                        </Box>
                    </>
                )}
            </Box>
        </ThemeProvider>
    );
};

export default CoinInfo;
