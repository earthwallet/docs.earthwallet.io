import React, { useEffect, useState } from "react";

const Sign = () => {
  const [response, setSelectedResponse] = useState({});

  const signClick = async () => {
    const status = await window.earth.isConnected();

    if (!status.connected) {
      const account = await window.earth.connect();
    }
    try {
      let response = await window.earth.sign({
        canisterId: "ury7f-eqaaa-aaaab-qadlq-cai",
        method: "say",
        args: "hello",
      });
      setSelectedResponse(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button onClick={() => signClick()}>{"Sign 🌎"}</button>
      {response && (
        <div style={{ border: "2px dashed #92f092", marginTop: 12 }}>
          Response - {JSON.stringify(response)}
        </div>
      )}
    </div>
  );
};

export default Sign;
