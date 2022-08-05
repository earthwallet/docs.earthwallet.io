---
sidebar_position: 1
---

# sign

### Sign Canister Method

sign is used to sign canister methods like update or query by connected user.

```js
  const response = await window.earth.sign({
    canisterId: 'bzsui-sqaaa-aaaah-qce2a-cai',
    method: 'bearer',
    args: 'lwi75-7akor-uwiaa-aaaaa-b4arg-qaqca-aac6a-q'
  });
  console.log(response);
 /*   
  {
    "ok": "afb264de8057a9ba7f79a51c80f99354004e686bb650172032aada5126e7f014"
  }
*/
```

`canisterId` and `method` are mandatory. `args` can be `undefined` or optional based on corresponding arguments of that canister method.

:::tip
With ICP, sign is best suited for canister update methods like transfer, list, sell, create etc. Usually, canister queries that are repetitive like read, get, fetch etc can be fetched with anonymous/no identity. More info can be found at Dfinity docs [Query and update methods](https://smartcontracts.org/docs/developers-guide/concepts/canisters-code.html#query-update)  
:::



### Error Handling

Incase of an error from sign, an object with  `{type:"error", message:"some info"}` is resolved. For example,

```js
  const response = await window.earth.sign({
    canisterId: 'bzsui-sqaaa-aaaah-qce2a-cai',
    method: 'bearer',
    args: 'lwi75-7akor-uwiaa-aaaaa-b4arg-qaqca-aac6a-xxx'
  });
  console.log(response);
 /*   
  {
    type: "error",
    message: "Call failed:
              "Canister": bzsui-sqaaa-aaaah-qce2a-cai
              "Method": bearer (query)
              "Status": "rejected"
              "Code": "CanisterError"
              "Message": "IC0503: Canister bzsui-sqaaa-aaaah-qce2a-cai trapped explicitly: RTS error: blob_of_principal: invalid principal"
  }
*/
```

### Sign Batch Canister Methods
sign can be used for batch queries or batch calls canister methods by sending array of canister methods.

```js
 const response = await window.earth.sign([{
    canisterId: 'bzsui-sqaaa-aaaah-qce2a-cai',
    method: 'bearer',
    args: {
        "token": "lwi75-7akor-uwiaa-aaaaa-b4arg-qaqca-aac6a-q",
        "user": {
            "address": "afb264de8057a9ba7f79a51c80f99354004e686bb650172032aada5126e7f014"
        }
      }
    },
    {
    canisterId: 'oeee4-qaaaa-aaaak-qaaeq-cai',
    method: 'tokens',
    args: '0ba1b7b1643929210dc41a8afbe031bd1b5e81dbc8e3b3b64978f5f743f058c3',
    }
    ]);
  console.log(response);

  /*
  [{
  "ok": "1"
  },
  {
  "ok": [
    5542
  ]
}]
  */

```
In the above example, batch query is sent to multiple canisters


### Working with BigInt
Here is canister Method for listing an NFT token `xbxdl-yakor-uwiaa-aaaaa-cuaab-eaqca-aacwt-a`. The expected arguments are `token (text)`, `from_subaccount (opt vec nat8)` and `price (opt nat64)`
```js
const response = await window.earth.sign({
      canisterId: 'oeee4-qaaaa-aaaak-qaaeq-cai',
      method: "list"
      args: {
        "price": [BigInt(223412341211000000000)],
        "from_subaccount": [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
        "token": "xbxdl-yakor-uwiaa-aaaaa-cuaab-eaqca-aacwt-a"
    }});
```
 * In case arguments of type `nat64` we can use [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) built-in Object, to represent whole numbers larger than `2^53 - 1` (Number.MAX_SAFE_INTEGER).  


### Working with Principal
For canister methods with `Principal` type of arguments, we can initialize as below.

 ```js
 import { Principal } from '@dfinity/principal';

  const args = {
      "token": "xbxdl-yakor-uwiaa-aaaaa-cuaab-eaqca-aacwt-a",
      "user": {
        "principal": Principal.fromText('o7nwu-n6kuf-4afzp-ybcuf-346pr-odd54-damf5-v4pvc-4sexh-cabph-7qe')
      }
    }

    try {
      const response = await window.earth.sign({
        canisterId: 'oeee4-qaaaa-aaaak-qaaeq-cai',
        method: 'balance',
        args: args
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    // { ok : 1}
 ```


### Example implementation of EarthSign

import CodeBlock from "@theme/CodeBlock";
import SignCode from "!!raw-loader!../../components/Sign";
import Sign from "../../components/Sign";
import BrowserWindow from "../../components/BrowserWindow";

<CodeBlock className="language-jsx">{SignCode}</CodeBlock>

```mdx-code-block
<BrowserWindow>
    <Sign />
</BrowserWindow>
```


Step 1: First check if `window.isConnected` is `{connected: true}`, if not, ask the user to connect using `window.earth.connect` <br/>
Step 2: Using `window.earth.sign` we can sign a canister method with parameters `canisterId`, `method` and `args`

The above canisterId candid can be found at https://ic.rocks/principal/ury7f-eqaaa-aaaab-qadlq-cai

:::tip
Go through https://ic.rocks/ and search for `canisterId` in Search field and validate the method and corresponding args
:::


Anything **unclear** or **issue** in this docs? [Please connect at Discord!](https://discord.gg/bPBN9qShUr)
