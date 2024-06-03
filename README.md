# Caffeine

Simple JavaScript backend with Deno and Oak.

## Deno

[Deno](https://www.deno.com)
([/ˈdiːnoʊ/](http://ipa-reader.xyz/?text=%CB%88di%CB%90no%CA%8A), pronounced
`dee-no`) is a JavaScript, TypeScript, and WebAssembly runtime with secure
defaults and a great developer experience. It's built on [V8](https://v8.dev/),
[Rust](https://www.rust-lang.org/), and [Tokio](https://tokio.rs/).

Learn more about the Deno runtime
[in the documentation](https://docs.deno.com/runtime/manual).

## oak

A middleware framework for Deno's native HTTP server,
[Deno Deploy](https://deno.com/deploy), Node.js 16.5 and later,
[Cloudflare Workers](https://workers.cloudflare.com/) and
[Bun](https://bun.sh/). It also includes a middleware router.

This middleware framework is inspired by [Koa](https://github.com/koajs/koa/)
and middleware router inspired by
[@koa/router](https://github.com/koajs/router/).

This README focuses on the mechanics of the oak APIs and is intended for those
who are familiar with JavaScript middleware frameworks like Express and Koa as
well as a decent understanding of Deno. If you aren't familiar with these,
please check out documentation on
[oakserver.github.io/oak](https://oakserver.github.io/oak/).
