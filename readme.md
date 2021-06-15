# ![Mayiko][logo]

"Mayiko" is chichewan for "countries". This application is a demo of how to use
the [Coindirect] `country` API with [Deno] and [React].

## Usage

To use the application, install Deno and then run the following in a command
line terminal:

```shell
deno run --allow-net --allow-read server.ts
```

## Contribute

As this is only a demo for me to learn Deno and React, I don't expect anyone
to contribute, so the below is more for future reference to myself:

### Run Application

To run Mayiko with Deno in "watching" mode, first make sure you're in the `src`
directory:

```shell
cd src
```

Then execute the following to start the application:

```shell
deno run --allow-net --allow-read --watch=./**/*.ts,./**/*.tsx,./**/*.css server.ts
```

After a short while, `Mayiko is now listening on: http://localhost:5000` should
be printed in your terminal. You can then visit `http://localhost:5000` to view
try the Mayiko application.

### Run Tests

To run tests, first make sure you're in the `src` directory:

```shell
cd src
```

Then type the following into the terminal to run the test suite:

```shell
deno test --allow-net --location 'http://localhost'
```

[coindirect]: https://www.coindirect.com/
[deno]: https://deno.land/
[react]: https://reactjs.org/
[logo]: https://github.com/asbjornu/mayiko/raw/main/src/public/img/icon.png
