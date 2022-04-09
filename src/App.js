import React, { useEffect, useState, useRef } from "react";
import { getList, setItem } from "./services/list";

function App() {
  const [list, setList] = useState([]);
  const [itemInput, setItemInput] = useState("");
  const [alert, setAlert] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  let mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    if (list.length && !alert) {
      return;
    }
    getList().then((data) => {
      if (mounted.current) {
        setList(data);
      }
    });
    return () => (mounted.current = false);
  }, [alert, list]);

  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        if (mounted.current) {
          setAlert(false);
        }
      }, 1000);
    }
  }, [alert]);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setItem(itemInput).then(() => {
      if (mounted.current) {
        setItemInput("");
        setAlert(true);
        setSubmitting(false);
      }
    });
  }

  return (
    <div className="wrapper">
      <h1>My Grocery List</h1>
      <ul>
        {list.map((item) => (
          <li key={item.id}>{item.item}</li>
        ))}
      </ul>
      {alert && <h2>Submit successful</h2>}
      <form action="" onSubmit={handleSubmit}>
        <fieldset disabled={submitting}>
          <label htmlFor="">
            <p>New Item</p>
            <input
              type="text"
              onChange={(event) => setItemInput(event.target.value)}
              value={itemInput}
            />
          </label>
        </fieldset>
        <button disabled={submitting} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
