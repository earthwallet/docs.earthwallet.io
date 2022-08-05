---
sidebar_position: 1
---

# Getting Started

Get started by **checking if earth wallet is installed**.

```js
if (window.earth !== undefined) {
    console.log('Earth Wallet Exists');
    //Do something
}
else {
    console.log('Dear User, please install Earth Wallet at https://www.earthwallet.io/');
}
```

**Earth Wallet** can be installed **[here](https://earthwallet.io)**.

## Connect user address to Dapp ⛓️

Get the user address

```js
 const account = await window.earth.connect();
 console.log('ICP account: ' + account);
 //account: xyzzzz
```

Getting user address is very simple and by calling `earth.connect()`

Once connected, calling `earth.connect()` will give same connected address e.g xyzzz.

## Check if Earth Wallet is connected

```js
const isConnected = await window.earth.isConnected()
//{connected: false} or {connected: true}
```

## Get address meta

```js
const addressMeta = await window.earth.getAddressMeta();
/*
    {
        name: 'xyz',
        createdAt: 1635962486,
        principalId: 'o7nwu-xxx',
        publicKey: 'asddd',
        type: 'ecdsa'
        }
/*
```


Anything **unclear** or **issue** in this docs? [Please connect at Discord!](https://discord.gg/bPBN9qShUr)
