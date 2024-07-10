export const deleteOptions = {
  method: "DELETE",
};

export const getPostOptions = (body) => ({
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

export const getPatchOptions = (body) => ({
  method: "PATCH",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

export const fetchHandler = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    const { ok, status, headers } = response;
    if (!ok)
      throw new Error(`Fetch failed with status - ${status}`, {
        cause: status,
      });

    const isJson = (headers.get("content-type") || "").includes(
      "application/json"
    );
    const responseData = await (isJson ? response.json() : response.text());

    return [responseData, null];
  } catch (error) {
    console.warn(error);
    return [null, error];
  }
};

export const stringToColor = (str) => {
  let hash = 0;
  str.split("").forEach((char) => {
    hash = char.charCodeAt(0) + ((hash << 5) - hash);
  });
  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 7)) & 0xff;
    color += value.toString(16).padStart(2, "0");
  }
  return color;
};

export const shouldUseWhiteText = (hexColor) => {
  hexColor = hexColor.replace(/^#/, "");
  const r = parseInt(hexColor.substr(0, 2), 16);
  const g = parseInt(hexColor.substr(2, 2), 16);
  const b = parseInt(hexColor.substr(4, 2), 16);
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance < 120; // Adjust threshold as needed
};

export const formatDateTime = (input) => {
  // Parse the input string into a Date object
  const date = new Date(input);

  // Define options for formatting the date
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  // Use Intl.DateTimeFormat to format the date
  return new Intl.DateTimeFormat("en-US", options).format(date);
}