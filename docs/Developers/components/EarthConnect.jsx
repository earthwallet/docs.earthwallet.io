import React, { useEffect, useState } from "react";

const EarthConnect = () => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  
  const earthConnect = async () => {
    try {
      if (window.earth === undefined) {
        console.log("Install Earth Wallet at https://www.earthwallet.io/");
        return;
      }
      const account = await window.earth.connect();
      setSelectedAddress(account);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button onClick={() => earthConnect()}>
      {selectedAddress ? selectedAddress : "🌎 Earth Connect"}
    </button>
  );
};

export default EarthConnect;
