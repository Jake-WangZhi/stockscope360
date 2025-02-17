"use client";
import { Grid, Typography } from "@mui/material";
import { SignInButton } from "@/components/SignInButton";
import { DisplayNameSection } from "@/components/DisplayNameSection";
import StockDataGrid from "@/components/StockDataGrid";
import CalendarButton from "@/components/CalenderButton";
import DefaultAndFavoriteToggle from "@/components/DefaultFavoriteToggle";
import FrequencyButton from "@/components/FrequencyButton";
import StockChart from "@/components/StockChart";
import { SettingsProvider } from "@/context/SettingsContext";
import { useEffect, useState } from "react";

export default function Home() {
  const [stockIds, setStockIds] = useState<string[]>(["1", "2", "3", "4", "5"]);

  useEffect(() => {
    if (!localStorage.getItem("stockIds")) {
      const initialStockIds = [1, 2, 3, 4, 5];
      localStorage.setItem("stockIds", JSON.stringify(initialStockIds));
    }
    setStockIds(JSON.parse(localStorage.getItem("stockIds") || "[]"));
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-gray-400">
      <SettingsProvider>
        <div className="p-10 w-full items-center justify-between font-mono text-sm lg:flex">
          <Grid container alignItems="center">
            <Grid item xs={2}>
              <DisplayNameSection />
            </Grid>
            <Grid item xs={8}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 600,
                  textAlign: "center",
                }}
              >
                StockScope360
              </Typography>
            </Grid>
            <Grid item xs={2} sx={{ textAlign: "end" }}>
              <SignInButton />
            </Grid>
          </Grid>
        </div>
        <div className="relative flex place-items-center justify-between w-full">
          <div className="flex w-1/2 h-[480px] items-center justify-center bg-white">
            <StockChart stockIds={stockIds} setStockIds={setStockIds} />
          </div>
          <div className="flex w-1/2 h-[480px] justify-center">
            <StockDataGrid />
          </div>
        </div>
        <div>
          <CalendarButton />
          <DefaultAndFavoriteToggle
            stockIds={stockIds}
            setStockIds={setStockIds}
          />
        </div>
        <div>
          <FrequencyButton />
        </div>
      </SettingsProvider>
    </main>
  );
}
