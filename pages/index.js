import Head from "next/head";
import { useState } from "react";
import styles from '../styles/Home.module.css'

export default function Home() {
  const [dateInput, setDateInput] = useState("");
  const [resultList, setResultList] = useState([]);
  const [selectedButton, setSelectedButton] = useState("");
  const buttonList = [
  "Beach", 
  "Park", 
  "Lake", 
  "City", 
  "Farm", 
  "Festival", 
  "Concert", 
  "Museum", 
  "Vineyard", 
  "Boat"];

  function buttonClick(e) {
    e.preventDefault();
    setDateInput(e.target.value);
    setSelectedButton(e.target.value);
  }

  function onChange(e) {
    setDateInput(e.target.value);
    setSelectedButton("");
  }

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/promptGenerator", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ date: dateInput }),
    });
    const data = await response.json();
    setResultList([{prompt: dateInput, response: data.result}, ...resultList]);
    setDateInput("");
    setSelectedButton("");
  }

  return (
    <div>
      <Head>
        <title>AI Date Planner</title>
      </Head>

      <main className={styles.main}>
        <h3>Plan a Romantic Date ❤️</h3>
        <form onSubmit={onSubmit}>
          <div className={styles.buttonContainer}>
            {
              buttonList.map((button, idx) => {
                return <button 
                className={selectedButton === button ? styles.selectedButton : ""} 
                key={idx} 
                value={button}
                onClick={buttonClick}>{button}</button>
              })
            }
          </div>
          <input
            type="text"
            name="date"
            placeholder="Enter a location/environment or select one from above"
            value={dateInput}
            onChange={onChange}
          />
          <input type="submit" value="Generate Date Ideas" />
        </form>

        <div className={styles.responseSection}>
          {
            resultList.length > 0 ? <h2 className={styles.subtitle}>Date Ideas</h2> : null
          }
          
            {
              resultList.map((res, idx) => {
                return <div className={styles.responseContainer} key={idx}>
                  <div className={styles.response}>
                    <p>Input:</p> 
                    <p className={styles.responseText}>Romantic date ideas that take place at the {res.prompt}</p>
                  </div>

                  <div className={styles.response}>
                    <p>Response:</p> 
                    <p className={styles.responseText}>{res.response}</p>
                  </div>
                </div>
              })
            }
        </div>

      </main>
    </div>
  );
}