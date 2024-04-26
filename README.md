# Install the dependencies

### `npm install` or `yarn install`

# Start the web server

### `npm run dev` or `yarn dev`

\
Then open localhost to view in the browser. The page will reload if you make edits.

# Deployment

- Obtain the code for the project and push it to your GitHub (or any other Git provider).
- Create a Vercel account linked to your GitHub (or another Git provider), or use an existing Vercel account if you already have one.
- In your Vercel account, click on `Add New`, then select `Project` option. You will see a list of your projects on GitHub.
- Choose the project that includes the `Claim app` and click on `Import`.

## DDOS Protection from Vercel

**!!! Notify, Attack Challange Mode may cause issue on Iphones. Site may not load and stuck on security checkpoint page.**

- Open your deployed project
- Click on settings, then on security
- Turn on/off Attack Challange Mode

### Configure the Project

- In the Environment `Variables section`, set all the required environment variables, adhering to the following naming conventions:

```
NEXT_PUBLIC_DELEGATES_FETCH_URL - URL to fetch a JSON file with delegates
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID - ID of your WalletConnect project
```

- To obtain `NEXT_PUBLIC_DELEGATES_FETCH_URL`, set up a `delegate-exporter` function and use the `R2.dev` URL to access the file containing the delegates.
- To acquire NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID, set up the project on [walletconnect](https://cloud.walletconnect.com/sign-in)
- After configuring the variables, click `Deploy`.
