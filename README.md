# Genesys Emporium

## Current Production Build

[The Genesys Emporium](https://genesysemporium.com)

## Community

[Support/Unbound Legends Discord](https://discord.gg/wc7BGW5)  
[Genesys Community Discord](https://discord.gg/XphjJxM)

## Misc

Genesys was created by [Fantasy Flight Games, Genesys](https://www.fantasyflightgames.com/en/products/genesys).

Genesys Emporium was originally created by [SkyJedi](https://twitter.com/SkyJedi).
Go check him out, he's an awesome guy who has made many major contributions to the Genesys community.

## Building & Running
- create a firebase project with authentication (google) and firestore, configure firestore permissions with rules from firestore.rules

- create packages/emporium/.env
```
NX_apiKey=<API_KEY>>
NX_authDomain=<PROJECT_ID>.firebaseapp.com
NX_databaseURL=https://<PROJECT_ID>.firebaseio.com
NX_projectId=<PROJECT_ID>
NX_storageBucket=<PROJECT_ID>.appspot.com
NX_messagingSenderId=SENDER_ID
```

install and run
```
npm install
npm run start
```
If you get an error message like
`Error: Cannot find module '@nrwl/workspace/src/utilities/output'`
go to `node_modules/@nrwl/workspace/src` and create a symlink utilities->utils

