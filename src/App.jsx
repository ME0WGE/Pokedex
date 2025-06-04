import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [name, setName] = useState();

  useEffect(() => {
    axios
      .get("https://pokebuildapi.fr/api/v1/pokemon")
      .then((res) => setName(res.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <></>
    </>
  );
}

export default App;
