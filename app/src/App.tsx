import React, { useState } from "react";
import { Preview } from "./Preview";

export default function App() {

  const [file, setFile] = useState<File | null>(null)

	const handleFileChange = async ( event: React.ChangeEvent<HTMLInputElement> ) => {
		const file = event.target.files?.[0];

    if(file === undefined) {
      return
    }
    setFile(file)
	};

  return (
    <>
    <input type="file" onChange={handleFileChange} />
    <div style={{ width: "100vw", height: "100vh" }}>
      {file && <Preview src={file} />}
    </div>
    </>
  );
}
