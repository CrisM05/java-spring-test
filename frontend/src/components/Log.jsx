import React, { forwardRef } from "react";
import {
  deleteOptions,
  fetchHandler,
  formatDateTime,
  getPatchOptions,
  shouldUseWhiteText,
  stringToColor,
} from "../utils";

const Log = forwardRef(({ obj, refresh }, ref) => {
  const hex = stringToColor(obj.body);
  const style = {
    backgroundColor: hex,
    color: shouldUseWhiteText(hex) ? "white" : "black",
  };

  const editText = async (e) => {
    if (e.key !== "Enter") {
      return;
    }
    e.preventDefault();
    const newBody = e.target.innerText.trim();
    if (newBody.length === 0) {
      console.log(
        (await fetchHandler(`/api/logs/${obj.id}`, deleteOptions))[0]
      );
      refresh(true);
    } else {
      console.log(
        (
          await fetchHandler(
            `/api/logs/${obj.id}`,
            getPatchOptions({body:e.target.innerText, userData: navigator.platform})
          )
        )[0]
      );
      refresh(false);
    }
  };

  return (
    <div className={`logs ${style.color}`} style={style} ref={ref}>
      <h2
        onKeyDown={editText}
        contentEditable="true"
        spellCheck="false"
      >
        {obj.body}
      </h2>
      <p>{formatDateTime(obj.time)}</p>
      {obj.edited && <p className="edited">Edited</p>}
      <p>{obj.userData}</p>
    </div>
  );
});

export default Log;
