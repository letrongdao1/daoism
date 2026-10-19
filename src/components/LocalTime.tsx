"use client";

import { useEffect, useState } from "react";

const localTime = () =>
  new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Ho_Chi_Minh",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date());

export default function LocalTime() {
  const [time, setTime] = useState(localTime);
  useEffect(() => {
    const id = setInterval(() => setTime(localTime()), 10_000);
    return () => clearInterval(id);
  }, []);
  // server and client clocks can straddle a minute
  return <time suppressHydrationWarning>{time} GMT+7</time>;
}
