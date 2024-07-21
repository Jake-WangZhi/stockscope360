import { Switch, FormControlLabel } from "@mui/material";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useSettingsContext } from "@/context/SettingsContext";
import { useDefaultDisplayInfo } from "@/hooks/useDefaultDisplayInfo";
import { useFavoriteDisplayInfo } from "@/hooks/useFavoriteDisplayInfo";
import moment from "moment";

interface Props {
  stockIds: Array<string>;
  setStockIds: Dispatch<SetStateAction<string[]>>;
}

export default function DefaultAndFavoriteToggle({
  stockIds,
  setStockIds,
}: Props) {
  const {
    dates,
    isFavorite,
    setIsFavorite,
    isStockIdsChanged,
    setIsStockIdsChanged,
    currency,
    frequency,
    email,
  } = useSettingsContext();
  const [startDate, setStartDate] = useState(
    moment("2019-01-02").format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD"));

  const { defaultRefetch } = useDefaultDisplayInfo({
    start_date: startDate,
    end_date: endDate,
    stockIds: stockIds,
    currency: currency,
    frequency: frequency,
  });
  const { favoriteRefetch } = useFavoriteDisplayInfo({
    email: email,
    start_date: startDate,
    end_date: endDate,
    currency: currency,
    frequency: frequency,
  });

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsFavorite(event.target.checked);
  };

  useEffect(() => {
    const { startDate, endDate } = dates;
    const formattedStartDate = startDate.format("YYYY-MM-DD");
    const formattedEndDate = endDate.format("YYYY-MM-DD");

    setStartDate(formattedStartDate);
    setEndDate(formattedEndDate);
  }, [startDate, endDate, dates]);

  useEffect(() => {
    if (isFavorite) favoriteRefetch();
    else defaultRefetch();
  }, [defaultRefetch, favoriteRefetch, startDate, endDate, isFavorite]);

  useEffect(() => {
    if (isStockIdsChanged) {
      const storedValue = localStorage.getItem("stockIds");
      const stockIdsArray = JSON.parse(storedValue || "");
      setStockIds(stockIdsArray);
      setIsStockIdsChanged(false);
    }
  }, [isStockIdsChanged, setIsStockIdsChanged, setStockIds]);

  useEffect(() => {
    defaultRefetch();
  }, [defaultRefetch, stockIds]);

  useEffect(() => {
    if (email) setIsFavorite(true);
  }, [email, setIsFavorite]);

  return (
    <>
      {email && (
        <FormControlLabel
          control={<Switch checked={isFavorite} onChange={handleToggle} />}
          label={isFavorite ? "Favorite" : "Default"}
          style={{ marginLeft: "200px" }}
        />
      )}
    </>
  );
}
