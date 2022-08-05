---
sidebar_position: 1
---

# Building an ICP Dapp

**This is a step-by-step tutorial on how to build an ICP dapp and connect with Earth Wallet**

We are going to create a very simple dapp where users can come and store a value on-chain and get that value by clicking a button. Before starting you can go to [https://jlbak-jiaaa-aaaak-aclsa-cai.ic0.app/](https://jlbak-jiaaa-aaaak-aclsa-cai.ic0.app/) to see the live version of the dapp that we are going to create.
  <img src="https://cdn.discordapp.com/attachments/947480890181812294/1004493213329006714/unknown.png" width="800" />

## Prerequisites

1. You should have earth wallet installed, if not, download from [here](https://chrome.google.com/webstore/detail/earth-wallet/agkfnefiabmfpanochlcakggnkdfmmjd)

2. You should have DFX SDK installed on your machine, if not, run this command to install it: 

```js
sh -ci "$(curl -fsSL https://smartcontracts.org/install.sh)" 
```

Or follow the detailed instructions [here](https://internetcomputer.org/docs/current/developer-docs/build/install-upgrade-remove/)

## Developing the dapp

1. Start by creating a new project called ```hello```, to do this, navigate to the directory in which you want to create the new project and run this command: 

```js
dfx new hello
```
  <img src="https://cdn.discordapp.com/attachments/947480890181812294/1004169591074869289/Screen_Shot_2022-08-02_at_6.52.05_PM.png" width="800" />

2. This will create a new basic project, which is consisted of two cannisters, one for the frontend and one for the backend.
  <img src="https://cdn.discordapp.com/attachments/947480890181812294/1004169591649476668/Screen_Shot_2022-08-02_at_6.53.42_PM.png" width="800" />


3. In your terminal, cd into your project, running: 

```js
cd hello
```

4. Next we are going to run this project, for running it, open 2 terminals and in the first terminal run this command: 

```js
dfx start
```
  <img src="https://cdn.discordapp.com/attachments/947480890181812294/1004169592261857360/Screen_Shot_2022-08-02_at_6.55.51_PM.png" width="800" />

This starts a local version of the ICP blockchain.

5. In your second terminal run this command: 

```js
dfx deploy
```
  <img src="https://cdn.discordapp.com/attachments/947480890181812294/1004169592953905222/Screen_Shot_2022-08-02_at_6.57.10_PM.png" width="800" />

6. Copy the link of the local website printed on the terminal and open that link in your browser to see your site running.
  <img src="https://cdn.discordapp.com/attachments/947480890181812294/1004494555200098314/unknown.png" width="800" />


7. Now let's make some changes to the code in order to make it compatible with Earth Wallet and also change the code to store a value in the backend cannister.

8. Replace the code in ```src/hello_backend/main.mo``` with: 

```js
actor {
  stable var value = "";

  public func getVal() : async Text {
    return value;
  };

  public func setVal(val : Text) : async Text {
    value := val;
    return value;
  };
};
```

Here we are writing the motoko code to write a backend cannister where we are making a state variable to store a value on-chain and there are two functions called ```getVal()``` and ```setVal()``` which can be used to get and set the value of that state variable.

9. Replace the code in your ```src/frontend/src/index.html``` with this code: 

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <title>hello</title>
    <base href="/" />
    <link rel="icon" href="favicon.ico" />
    <link type="text/css" rel="stylesheet" href="main.css" />
  </head>
  <body>
    <main>
      <img src="logo2.svg" alt="DFINITY logo" />
      <br />
      <br />
      <section id="form">
        <label for="name">Enter some value to store on-chain: &nbsp;</label>
        <input id="name" alt="Name" type="text" />
        <div>
          <button id="setVal">Set Value</button>
          <button id="getVal">Get Value</button>
        </div>
      </section>
      <section id="greeting"></section>
    </main>
  </body>
</html>
```

10. Replace the code in your ```src/hello_frontend/src/index.js``` with this code: 

```js
import { hello_backend } from "../../declarations/hello_backend";

const setButton = document.getElementById("setVal");
const getButton = document.getElementById("getVal");

setButton.addEventListener("click", async (e) => {
  const name = document.getElementById("name").value.toString();

  setButton.setAttribute("disabled", true);

  // To connect with Earth Wallet if not connected already
  await window.earth.connect();

  // To call the setVal function of our backend cannister
  const response = await window.earth.sign({
    canisterId: 'j6grh-iaaaa-aaaak-aclrq-cai',
    method: 'setVal',
    args: name
  });
  console.log(response);

  setButton.removeAttribute("disabled");

  window.alert("Value set ✅")
});

getButton.addEventListener("click", async () => {
  getButton.setAttribute("disabled", true);

  const greeting = await hello_backend.getVal();
  document.getElementById("greeting").innerText = greeting;

  getButton.removeAttribute("disabled");
});
```

The main piece of code here is:

```js
// To connect with Earth Wallet if not connected already
  await window.earth.connect();

  // To call the setVal function of our backend cannister
  const response = await window.earth.sign({
    canisterId: 'j6grh-iaaaa-aaaak-aclrq-cai',
    method: 'setVal',
    args: name
  });
  ```

  So let's break it down: 

```js
await window.earth.connect();
```

Here we are calling the ```window.earth.connect()``` method to connect the user's Earth Wallet with the dapp if it's not already connected. 


```js
const response = await window.earth.sign({
  canisterId: 'j6grh-iaaaa-aaaak-aclrq-cai',
    method: 'setVal',
    args: name
  });
  ```

  Here we are calling the ```window.earth.sign``` method to call the ```setVal``` function of our backend cannister, for this we are specifying the function name in ```method``` and giving the arguments to the function in ```args``` field, we also have to provide a ```cannisterId``` for our backend cannister, but since our backend cannister isn't deployed yet, we can put any random id here for now, we will replace it later.


11. Replace the code in your ```src/hello_frontend/assets/main.css``` with this code: 

```css
body {
  font-family: sans-serif;
    font-size: 1.5rem;
}

img {
  max-width: 50vw;
    max-height: 25vw;
    display: block;
    margin: auto;
}

#form {
  display: flex;
    justify-content: center;
    gap: 0.5em;
    flex-flow: row wrap;
    max-width: 40vw;
    margin: auto;
    align-items: baseline;
}

button {
  padding: 5px 20px;
    margin: 10px auto;
    float: right;
    margin: 2rem;
}

#greeting {
  margin: 10px auto;
    padding: 10px 60px;
    border: 1px solid #222;
}

#greeting:empty {
  display: none;
}
```

Here we are just adding some styles to make our components not look ugly.


12. At this point we are ready to deploy the dapp, so let's go ahead and do that.


## Deploying the dapp

1. Open up a new terminal in your ```hello``` directory and run this command: 

```js
dfx ledger account-id
```

2. This will print your account id, transfer some ICP tokens to this account id ($3-$5 worth should be enough), which we will use to convert to cycles, in order to deploy our dapp.

:::tip
ICP tokens can be used to convert into cycles, cycles can be used to deploy and keep running the cannisters on chain.
:::

3. After that, run this command: 

```js
dfx identity get-principal
```

This will give you your principal id, which we will use to create a cycles wallet.

4. Now run this command:

```js
dfx ledger --network ic create-canister <your-principal-identifier> --amount <icp-tokens>
```

Replace the ```<your-principal-identifier>``` with your principal id and ```<icp-tokens>``` with the amount of tokens that you want to use in order to convert to cycles and deploy the dapp. For example I ran: 

```js
dfx ledger --network ic create-canister kuhyk-5lsc5-pfyme-zum5h-ltkn3-bnnqg-vk61x-acvt3-mvetn-h274t-ug --amount 0.5
```

This command will take some time and output the cannister id of the newly created cannister. 

5. Now that the canister is created, you can install the wallet code using this command:

```js
dfx identity --network ic deploy-wallet <canister-identifer>
```

Here, you have to substitute the canister identifier using the id you received in the output of the previous command. So, in the example this would look like this:

```js
dfx identity --network ic deploy-wallet jzhxt-fyaaa-aaaak-aclra-cai
```

6. To see the cycles balance of your wallet run this command: 

```js
dfx wallet --network ic balance
```

This will print the number of cycles your wallet has, which were converted from the ICP tokens.

7. Now let's deploy the cannisters by running this command: 

```js
dfx deploy --network ic --with-cycles 1000000000000
```

Here we are deploying our cannisters using ```1000000000000``` cycles, you can change this number if you want.

8. This will deploy both the cannisters and print your dapp's live url on the terminal which you can open in the browser to see your app running live. 

  <img src="https://cdn.discordapp.com/attachments/947480890181812294/1004169612608413716/terminal-snapshot-wallet-creation.png" width="800" />

9. The deployment command creates a new file called ```cannister_ids.json``` in the root of your project, copy the id of ```hello_backend``` from there and replace with ```cannisterId``` in the ```src/hello_frontend/src/index.js``` file, this ensures that your frontend cannister is only calling your backend cannister.

  <img src="https://cdn.discordapp.com/attachments/947480890181812294/1004499435419611146/unknown.png" width="800" />

10. Now, since we have made the changes, we have to update our dapp as well by running this command: 

```js
dfx deploy --network ic
```

This will update our dapp and it's live to share with the world. 

Our version of the live dapp is here: [https://jlbak-jiaaa-aaaak-aclsa-cai.ic0.app/](https://jlbak-jiaaa-aaaak-aclsa-cai.ic0.app/)
  <img src="https://cdn.discordapp.com/attachments/947480890181812294/1004493213329006714/unknown.png" width="800" />
  <img src="https://cdn.discordapp.com/attachments/947480890181812294/1004496631435116574/unknown.png" width="800" />
  <img src="https://cdn.discordapp.com/attachments/947480890181812294/1004496718139768993/unknown.png" width="800" />


This is a very simple dapp where anyone in the world can set the value of a variable stored in the smart contract using Earth Wallet to anything and anyone in the world can also get that value at any time.

Anything **unclear** or **issue** in this docs? [Please connect at Discord!](https://discord.gg/bPBN9qShUr)
