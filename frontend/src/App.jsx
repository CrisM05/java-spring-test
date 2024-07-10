import Input from "./components/Input";
import { useState, useEffect, useRef } from "react";
import { fetchHandler } from "./utils";
import "./styles/App.scss";
import Log from "./components/Log";

const App = () => {
  const [allLogs, setAllLogs] = useState([]);
  const firstLogRef = useRef(null);
  const inputRef = useRef(null);
  const getLogs = async (bool) => {
    const [data, error] = await fetchHandler("/api/logs");
    if (!error) {
      setAllLogs(data);
      if (!bool) {
        if (firstLogRef.current) {
          firstLogRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      } else {
        if (inputRef.current) {
          inputRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    }
  };
  useEffect(() => {
    getLogs();
  }, []);
  return (
    <>
      <article>
        <Input set={setAllLogs} ref={inputRef} />
        {allLogs?.map((el, i) => (
          <Log
            key={i}
            obj={el}
            refresh={getLogs}
            ref={i === 0 ? firstLogRef : null}
          />
        ))}
      </article>
    </>
  );
};

export default App;
