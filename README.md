# Exchangerate

Assignment
The idea is to create an interactive web application that allows users to display exchange rates over
time, using https://exchangeratesapi.io/ (Free 250 Monthly Requests).

Inputs of the app should be a base currency, a target currency, and an amount for the base currency.
Try to implement these features keeping the following requirements in mind:
- It should be built using TypeScript and VueJS (Composition API).
- It should have a good looking, easy to understand interface. Show off some of your amazing skills
- It should minimize the number of API requests to make the app as efficient as possible
- It should be built with flexibility in mind, for example being able to switch data provider easily

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
