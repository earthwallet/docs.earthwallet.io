---
sidebar_position: 3
---

# Sign Batch

import CodeBlock from "@theme/CodeBlock";
import SignBatchCode from "!!raw-loader!../../components/SignBatch";
import SignBatch from "../../components/SignBatch";
import BrowserWindow from "../../components/BrowserWindow";

<CodeBlock className="language-jsx">{SignBatchCode}</CodeBlock>

```mdx-code-block
<BrowserWindow>
    <SignBatch />
</BrowserWindow>
```

### Example implementation of EarthSign batch

Step 1: Follow the same steps as Earth Sign with single method i.e check `earth.isConnected` . <br/>
Step 2: Pass an array of sign parameters to  `window.earth.sign` and we can get respective response in the same order.

The above canisterId candids can be found at https://ic.rocks/principal/ury7f-eqaaa-aaaab-qadlq-cai and https://ic.rocks/principal/oeee4-qaaaa-aaaak-qaaeq-cai

:::tip
Go through https://ic.rocks/ and search for `canisterId` in Search field and validate the method and corresponding args 
:::


Anything **unclear** or **issue** in this docs? [Please connect at Discord!](https://discord.gg/B8G75XZ92K)
