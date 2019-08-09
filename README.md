# Conv-Oracle

Conv-Oracle is an example on how to handle oracles within Hyperledger Fabric with Convector.

First meet [Hyperledger Fabric pre-requisites](https://docs.worldsibu.com/convector#prerequisites).

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
