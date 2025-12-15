# OnCheckIn

Membership and event management software for [Blooming Fools Hash House Harriers](http://www.bfh3.com/).

## Dependencies

- [Earthstar](https://earthstar-docs.netlify.app/) for managing the distributed data storage.
- [Svelte](https://svelte.dev/) for building the user interface.
- [Snowpack](https://www.snowpack.dev/) for running the development environment.

## Data

Data is automatically synced with the [OnCheckIn Earthstar Pub](https://oncheckin-pub.glitch.me/) (see [code on Glitch](https://glitch.com/edit/#!/oncheckin-pub)). Each instance of OnCheckIn is partitioned into its own [Earthstar Workspace](https://earthstar-docs.netlify.app/docs/intro/concepts-and-vocabulary#workspace), which results in its own SQLite database hosted on the [Earthstar Pub](https://github.com/earthstar-project/earthstar-pub). Users of the same workspace share data updates through the pub.

## Install

Install dependencies.

```
npm install
```

## Scripts

Start the development environment.

```
npm run start
```

Build for production. Files export to the `./build` folder.

```
npm run build
```
