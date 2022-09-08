import React from "react";
import styles from "../styles/Home.module.css";

const Input = () => {
  const [input, setInput] = React.useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setInput(e.currentTarget.zip.value);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.inputContainer}>
          <form onSubmit={handleSubmit}>
            <input
              className={styles.input}
              name="zip"
              type="text"
              pattern="^\d{5}(-\d{4})?$"
              placeholder="Enter Zip Code"
              onInvalid={(e) => {
                e.currentTarget.setCustomValidity(
                  "Please enter a valid US zip code"
                );
              }}
              onInput={(e) => e.currentTarget.setCustomValidity("")}
              required
            />
            <button className={styles.submitButton}>Submit</button>
          </form>
        </div>
        <div className={styles.centered}>
          {input !== "" && `Your zip code: ${input}`}{" "}
        </div>
      </div>
    </>
  );
};
export default Input;
