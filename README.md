# RAGE:MP Angular
This repository is a basic boilerplate for getting started with **Angular v17** in [RAGE Multiplayer](https://rage.mp/). It contains several helpful features and was generated with the Angular CLI. The project was setup using SCSS as stylesheet format, it is for both browser and in-game based development workflow.


![RAGEMP Angular](https://i.imgur.com/YeidalT.png "RAGEMP Angular")

## Getting started
Clone the repository and use `npm install`, after installing the packages use:

- `ng serve` for development mode, it's going to watch the files and build the application upon changes. You can create the browser on the generated address.
- `ng build` to build the application.

### Installation
1. Put this event in client-side, this is a middleman event for making the connection between UI - Server side.

```js
mp.events.add('CALL_SERVER', (eventName, ...args) => {
    mp.events.callRemote(eventName, ...args)
});
```

2. You're all done! If you did everything mentioned up correctly, you should have an RAGE:MP + Angular v17 project running with no problem.