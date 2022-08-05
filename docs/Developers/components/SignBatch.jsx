import React, { useEffect, useState } from "react";

const SignBatch = () => {
  const [response, setSelectedResponse] = useState({});

  const signClick = async () => {
    const status = await window.earth.isConnected();

    if (!status.connected) {
      const account = await window.earth.connect();
    }
    try {
      let response = await window.earth.sign([
        {
          canisterId: "ury7f-eqaaa-aaaab-qadlq-cai",
          method: "say",
          args: "hello",
        },
        {
          canisterId: "oeee4-qaaaa-aaaak-qaaeq-cai",
          method: "tokens",
          args: "0ba1b7b1643929210dc41a8afbe031bd1b5e81dbc8e3b3b64978f5f743f058c3",
        },
      ]);
      setSelectedResponse(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button onClick={() => signClick()}>{"Sign Batch 🌎"}</button>
      {response && (
        <div style={{ border: "2px dashed #92f092", marginTop: 12 }}>
          Response - {JSON.stringify(response)}
        </div>
      )}
    </div>
  );
};

export default SignBatch;
