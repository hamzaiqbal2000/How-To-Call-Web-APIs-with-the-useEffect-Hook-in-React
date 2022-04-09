import React, { useEffect, useState } from "react";
import { getList } from "./services/list";

function App() {
  const [list, setList] = useState([]);

  useEffect(() => {
    const mounted = true;
    getList().then((data) => {
      if (mounted) {
        setList(data);
      }
    });
    return () => (mounted = false);
  }, []);
  return (
    <div className="wrapper">
      <h1>My Grocery List</h1>
      <ul>
        {list.map((item) => (
          <li key={item.item}>{item.item}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
