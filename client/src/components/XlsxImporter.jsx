import axios from "axios";
import { useState } from "react";

const XlsxImporter = ({ updateFiles }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      encType="multipart/form-data"
      method="post"
      onSubmit={handleSubmit}
      className="submit-form"
    >
      <label htmlFor="file">Choose an xlsx file </label>
      <input type="file" name="file" id="file" accept=".xlsx" />
      <button>Submit</button>
      {loading && <p>loading...</p>}
    </form>
  );
};

export default XlsxImporter;
