<h1 align="center">io-site</h1>

io-site is a web-based map viewer designed for accessible downloading of geospatial data. io-site allows for the downloading of small segments of geospatial data so that small and independent customers are able to withstand the size of the incoming data. io-site also facilitates easy viewing of geospatial data by translating complex vectors and properties to a more user-friendly, readable format.

The data accessible through io-site is drawn from the [Overture Maps Foundation](https://overturemaps.org/). This data is collected through open source avenues, and as such io-site provides a free, low barrier to entry to mappers to download global data.

## Participate!

* Read the project [Contributioning Guide](CONTRIBUTIONing.md) to learn about how to contribute.
* See [open issues in the issue tracker](https://github.com/OvertureMaps/io-site/issues?q=is%3Aissue+is%3Aopen+) if you're looking to help on issues.

* Test a prerelease version of io-site:
  * The current build of the `main` branch is publicly available [here](https://explore.overturemaps.org/#16.34/51.049194/3.728993)!

## For developers

Running the io-site requires installation of:
* [Node.js](https://nodejs.org/en/download/package-manager)
* [vite](https://vitejs.dev/guide/)
* [eslint](https://eslint.org/docs/latest/use/getting-started)

Once there prerequisites are installed, execute the `npm run` command to understand the run configurations:
* dev
* build
* lint
* aws_deploy
* preview

Try it out! For example, executing `npm run dev` will allow you to view the io-site in your preferred browser.

## License

See the [LICENSE.md](LICENSE.md) file for more details.