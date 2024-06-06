# Governance Launcher Template
This repo provides a scaffold for launching governance. This app covers two key user flows: 
1) let users claim airdropped tokens
2) let users delegate the voting power of those tokens to delegates.

After users go through this flow, the DAO will have tokens distributed to stakeholders and voting power distributed to delegates.

This app is set up as a scaffold or template. Customize this app any way you want. Add your copy, your branding, and any special requirements.

This site is set up for scalability! Airdrop sites experience heavy traffic at launch or even denial-of-service attacks. To keep the site and its dependencies from going down, this template doesn't make API calls. Instead, [a background job](https://github.com/withtally/delegate-exporter) make API calls and saves the responses to a CDN.

Made by [Tally](https://tally.xyz/), [Hedgey](https://hedgey.finance/), and [Codegeeks](https://codegeeks.solutions/)

### What you'll need before using this repo
- An `ERC20` token contract with the `ERC20Votes` extension.
- A deployed [Hedgey claim contract](https://github.com/hedgey-finance/DelegatedTokenClaims)
- A [Governor contract](https://docs.tally.xyz/knowledge-base/tally/governor-framework). Optionally, do the airdrop first and deploy the Governor later.
- The airdrop details (the merkle proofs) from Hedgey claims
- Delegate profiles created on Tally with our "Delegate Registration" flow
  

# Setup

### Install dependencies

`npm install` or `yarn install`

### Start the web server

`npm run dev` or `yarn dev`

Then open localhost to view in the browser. The page will reload if you make edits.

# Configuration

### Configure the UI
[UIconfig_documentation.md](./UIconfig_documentation.md) describes how to [use ui-config.json](./config/ui-config.json) to customize some of the UI elements.

### Dictionary config documentation
The [README for dictionary config](./dictionary-config-README.md) describes how to edit the copy in [dictionaryConfig.json](./config/dictionaryConfig.json).

# Deployment

- Obtain the code for the project and push it to your GitHub (or any other Git provider).
- Create a Vercel account linked to your GitHub (or another Git provider), or use an existing Vercel account if you already have one.
- In your Vercel account, click on `Add New`, then select `Project` option. You will see a list of your projects on GitHub.
- Choose the project that includes the `Claim app` and click on `Import`.

### Configure the Vercel project

- In the Environment `Variables section`, set all the required environment variables, adhering to the following naming conventions:

```
NEXT_PUBLIC_DELEGATES_FETCH_URL - URL to fetch a JSON file with delegates
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID - ID of your WalletConnect project
NEXT_PUBLIC_PROOFS_FETCH_URL - URL to fetch a JSON file with delegates
NEXT_PUBLIC_TOKEN - address of token that will be claimed and delegated
NEXT_PUBLIC_CONTRACT_ADDRESS - contract address of token claim campaign
NEXT_PUBLIC_CAMPAIGN_UUID - UUID if token claim campaign
NEXT_PUBLIC_CHAIN - chain of token(ex. sepolia)
```

- To obtain `NEXT_PUBLIC_DELEGATES_FETCH_URL`, set up a `delegate-exporter` function and use the `R2.dev` URL to access the file containing the delegates.
- To acquire NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID, set up the project on [walletconnect](https://cloud.walletconnect.com/sign-in)
- After configuring the variables, click `Deploy`.

### Available chains
We are supporting only this list of chains:
- avalanche 
- bsc
- arbitrum
- gnosis
- arbitrumNova
- zkSync
- moonbeam
- bscTestnet
- polygonMumbai
- avalancheFuji

You can add another chain as well. Visit [wagmi chains docs](https://wagmi.sh/react/api/chains). Find chain that you need. For example, Ethereum. Under name of chain there is name of import.

Go to file [getChain.ts](./config/wagmi/getChain.ts). Add name of import(for Ethereum it's "mainnet") to import object and to availableChains object. Here you go, now you can use new chain on website.


### Set up DDoS Protection from Vercel

**!!! Notify, Attack Challange Mode may cause issue on Iphones. Site may not load and stuck on security checkpoint page.**

- Open your deployed project
- Click on settings, then on security
- Turn on/off Attack Challange Mode

# HOOKS
### ClaimHooks
**useCheckEligibility** - checks if a user is eligible for a claim.

**useClaimAndDelegate** - claims tokens and delegates them to a selected delegate.

**useGetProofs** - get proofs from a CDN.

### DelegateStep

**useDelegateSelection** - the logic for selecting a delegate.

**useGetDelegates** - Fetches the delegates from the CDN.

**useSortAndFilterDelegates** - Logic for sorting and filtering the delegates.

### useChainMismatch
**useChainMismatch** - Checks if the chain is the same on your wallet and the app.

### useCheckAnotherWalletLogic
**useCheckAnotherWalletLogic** - check eligibility of another wallet by address.

### useClaimSuccessLogic

**useClaimSuccessLogic** - the logic for the Success page.

### useHash
**useHash** - Saves the hash of the transaction.

### useHomePageLogic
**Safes the hash of the transaction** - Logic for home page.

### useToasters
**useCustomToasters** - custom toaster (errorToast, successToast, warningToast, infoToast, loadingToast)

### useWalletConnect

**useWalletConnect** - Logic for connecting wallets.
