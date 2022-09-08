import type { NextPage } from "next";
import React from "react";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const weeks: string[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const [days, setDays] = React.useState<number[]>([]);
  const [count, setCount] = React.useState<number>(0);
  const [heading, setHeading] = React.useState<string>(
    new Date().toLocaleString("default", { month: "long" }) +
      " " +
      new Date().getFullYear()
  );

  const getWeekDates = (num: number) => {
    return () => {
      const today = new Date();
      const day = today.getDay();
      const diff = today.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
      const monday = new Date(today.setDate(diff));
      const dates = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date(monday);
        date.setDate(date.getDate() + i + num * 7);
        dates.push(date);
      }
      setDays(dates.map((date) => date.getDate()));
    };
  };

  React.useEffect(() => {
    getWeekDates(count)();
  }, [count]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.centered}>{heading}</div>

        <div className={styles.gridContainer}>
          {weeks.map((day, i) => (
            <div key={i} className={styles.gridItem}>
              {day}
            </div>
          ))}

          {days.map((day, i) => (
            <div
              key={i}
              className={styles.gridItem}
              onClick={() =>
                setHeading(
                  new Date().toLocaleString("default", { month: "long" }) +
                    " " +
                    day + ", " +
                    new Date().getFullYear()
                )
              }
            >
              {day === new Date().getDate() && count === 0 ? (
                <div className={styles.isActive}>{day}</div>
              ) : (
                day
              )}
            </div>
          ))}
        </div>

        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={() => setCount(count - 1)}>
            Last Week
          </button>

          <button className={styles.button} onClick={() => setCount(0)}>
            This Week
          </button>

          <button className={styles.button} onClick={() => setCount(count + 1)}>
            Next Week
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
