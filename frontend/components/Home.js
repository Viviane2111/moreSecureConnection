// components/Home.js
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import "moment/locale/fr";
import { useSelector } from "react-redux";
import Header from "./Header";

function Home() {
  const user = useSelector((state) => state.user.value);
    const [date, setDate] = useState("2050-11-22T23:59:59");

  useEffect(() => {
    setDate(new Date());
  }, []);

  let username = "";
  if (user.username) {
    username = user.username;
    console.log("Utilisateur", username);
  }

  return (
    <div>
      <div className="border-b">
        <Header />
      </div>
      <main className="flex flex-col items-center h-[100vh] my-16">
        <Moment className={styles.date} date={date} format="dddd DD MMM YYYY" />
        <h1 className={styles.title}>Welcome {username}</h1> {/* AFFICHAGE DU USERNAME */}
      </main>
    </div>
  );
}
export default Home;
