import React, { useState } from "react";

function PasswordProtect() {
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [blob, setBlob] = useState(null);

  const handleProtect = async () => {
    if (!file || !password) {
      alert("Please select a file and enter a password.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("password", password);

    try {
      const res = await fetch("http://localhost:5001/encrypt", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error(await res.text());

      const protectedBlob = await res.blob();
      setBlob(protectedBlob);
    } catch (err) {
      alert("❌ Failed: " + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const download = () => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "protected.pdf";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="tool-box">
      <h3>🔐 Password Protect PDF</h3>
      <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files[0])} />
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ marginTop: "10px", padding: "6px", borderRadius: "6px", border: "1px solid #ccc" }}
      />

      <button onClick={handleProtect} disabled={loading} style={{ marginTop: "10px" }}>
        {loading ? "🔐 Encrypting..." : "🔐 Add Password"}
      </button>

      {blob && (
        <button onClick={download} style={{ marginTop: "10px" }}>
          ⬇️ Download Protected PDF
        </button>
      )}
    </div>
  );
}

export default PasswordProtect;
