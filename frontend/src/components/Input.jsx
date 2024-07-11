import React, { forwardRef, useState } from "react";
import { fetchHandler, getPostOptions } from "../utils.js";

const Input = forwardRef(({ set }, ref) => {
  const [input, setInput] = useState("");
  const [errorText, setErrorText] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.length > 255) {
      setErrorText("Text must be under 255 characters.");
      return;
    }
    const data = { body: input, userData: navigator.platform };
    console.log(await fetchHandler("/api/logs", getPostOptions(data)));
    set((await fetchHandler("/api/logs"))[0]);
    setInput("");
    setErrorText("");
  };

  return (
    <div id="form-wrapper" ref={ref}>
      <form onSubmit={handleSubmit} className="scrolling" autoComplete="off">
        <label htmlFor="form-input">Log Message</label>
        <input
          type="text"
          id="form-input"
          name="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type message here..."
          required
        />
        <button>Send</button>
        <p>{errorText}</p>
      </form>
    </div>
  );
});

export default Input;
