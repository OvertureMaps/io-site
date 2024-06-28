# Explore Site (io-site)

## Description

io-site is a web-based map viewer designed for accessible downloading of geospatial data. io-site allows for the downloading of small segments of geospatial data so that small and independent customers are able to withstand the size of the incoming data. io-site also facilitates easy viewing of geospatial data by translating complex vectors and properties to a more user-friendly, readable format.

The data accessible through io-site is drawn from the [Overture Maps Foundation](https://overturemaps.org/). This data is collected through open source avenues, and as such io-site provides a free, low barrier to entry to mappers to download global data.

## Getting Started

### Dependencies

- [Node.js](https://nodejs.org/en/download/package-manager)
- [vite](https://vitejs.dev/guide/)
- [eslint](https://eslint.org/docs/latest/use/getting-started)

### Installing

Download the repository anywhere on your local machine. Once installed, navigate to the `site` directory and run the command `npm install`. This will install any missing dependencies for the project.

### Executing program

Once there prerequisites are installed, execute the `npm run` command to understand the run configurations:

- dev
- build
- lint
- aws_deploy
- preview

Try it out! For example, executing `npm run dev` will allow you to view the io-site in your preferred browser.

If a browser window does not automatically open, enter `o` into the terminal to do so.

## Help

Different branches may require different dependecies. Whenever switching branches, it is recommended to perform `npm install` and `npm run build` to ensure that there are no missing dependencies.

While the overall project directory is located at `~/io-site`, the actual executable code must be run from the `~/io-site/site` directory.

## Authors

Contributors names and contact info can be found at our github contributors page [https://github.com/OvertureMaps/io-site/graphs/contributors](#https://github.com/OvertureMaps/io-site/graphs/contributors).

## Version History

Work in Progress

- 0.2
  - Various bug fixes and optimizations
  - See [commit change]() or See [release history]()
- 0.1
  - Initial Release

## License

See the [LICENSE.md](LICENSE.md) file for more details.
