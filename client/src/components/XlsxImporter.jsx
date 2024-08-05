import axios from "axios";
import { useState } from "react";

const XlsxImporter = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    try {
      const response = await axios.post(
        "http://localhost:3001/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form encType="multipart/form-data" method="post" onSubmit={handleSubmit}>
      <label htmlFor="file">Choose an xlsx file</label>
      <input type="file" name="file" id="file" />
      <button>Les go!</button>
      {loading && <p>loading...</p>}
    </form>
  );
};

export default XlsxImporter;
