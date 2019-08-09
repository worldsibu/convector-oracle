# Conv-Oracle

Conv-Oracle is an example on how to handle oracles within Hyperledger Fabric with Convector.

## Pre requisites

* First meet [Hyperledger Fabric pre-requisites](https://docs.worldsibu.com/convector#prerequisites).
* Configure a mock API in [https://www.mockable.io](https://www.mockable.io).
  * Make sure it is of type `POST` and the path is `bankapi`. 
  * Copy the whole url in the field `path` of mockable.io and add it in a `.env` file in `./packages/conv-oracle/src/.env` with the content `EXTERNAL_URL=<full-url>`.

## Start the project

```bash
npm install

# Start a blockchain network locally
npm run env:restart

# Install the smart contract
npm run cc:start

# Start the oracle daemon [ignore npx if you don't use it]
npx lerna run start --scope conv-oracle --stream
```

### See it in action!

```bash
# If you don't have hurley go and get it! npm i -g @worldsibu/hurley
hurl invoke carinsurance carinsurance_create "1" "volk" "1199"
```

This will trigger the transaction in the blockchain - send an event to the oracle daemon - fetch the API - call the `__callback()` and finish the transaction with external data.

### Want to see the logs of everything happening?

```bash
# Hook to the container running the smart contract
docker logs -f dev-peer0.org1.hurley.lab-carinsurance-2
```

## How does it work?

![Diagram](/images/diagram.png)

## What do to next?

- Read [this blog post](https://medium.com/worldsibu/oracles-for-hyperledger-fabric-with-convector-suite-70a67409409b) for more details.
- [Join the growing community on Discord](https://worldsibu.tech/convector-community?ref=convoracle).
- Get to know about [WorldSibu](https://worldsibu.tech/?ref=convoracle)'s work in making blockchain easy for enterprises.
- Subscribe to the monthly newsletter.
