# Contributing to io-site

## Pull Requests
We actively welcome your pull requests.

1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code lints.
6. If you haven't already, complete the Contributor License Agreement ("CLA").

## Forking, cloning, and running io-site
This section suggests a toolset and method to start contributing to io-site. However, you are welcome to use your own tools for the job. Here's what you could use:

| Tool | Suggestion | Alternatives |
|---|---|---|
| 🟩 Node version manager | [nvm](https://github.com/nvm-sh/nvm) | [fish](https://github.com/jorgebucaran/nvm.fish), [n](https://github.com/tj/n), [volta](https://github.com/volta-cli/volta) |
| 📝 Text editor | [VSCode](https://code.visualstudio.com/) | [Sublime](https://www.sublimetext.com/), [Vim](https://www.vim.org/), [Emacs](https://www.gnu.org/software/emacs/) |
| 🧑‍💻 POSIX-compliant CLI | [Bash for Linux](https://www.gnu.org/software/bash/) | [WSL for Windows](https://learn.microsoft.com/en-us/windows/wsl/install), [Zsh the OSX default](https://www.zsh.org/) |
| 🌐 Web browser | [Chrome](https://www.google.com/chrome/) | [Safari](https://www.apple.com/safari/), [Firefox](https://www.mozilla.org/en-US/firefox/new/), [Opera](https://www.opera.com/) |

### Setting up io-site locally
1. [Fork](https://docs.github.com/en/get-started/quickstart/fork-a-repo) the repository from [OvertureMaps/io-site](https://github.com/OvertureMaps/io-site) to your own GitHub account.
2. [Clone the repo](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) with `git clone https://github.com/OvertureMaps/io-site.git`.
3. From the CLI, open your freshly cloned io-site directory by running the command `code io-site`
4. Once in VSCode, type **Ctrl+Shift+`** to open a terminal. Alternatively, use the **Terminal>New Terminal** menu option.
5. Make sure you are using [the latest `node`](https://nodejs.org/en/download) by running `node --version`. If not, then running `nvm install node` will set it up for you.
6. Install all required dependencies with `npm install`
7. Then run `npm run all` to set up io-site.
8. Finally, run `npm run dev` to start the server on port 5173.

Congrats! 🎉 You should now be able to use io-site by navigating to [http://127.0.0.1:5173/](http://localhost:5173/) on Chrome. It is also possible to open a new window with `o + enter` via the terminal the io-site is running in.

### Setting up the VSCode debugger
VSCode provides a debugging mode using Chrome. To use it, follow these steps:

1. Go to **Run>Add Configuration** and select `{} Chrome: Launch`
2. This will create `launch.json`.
3. Make sure to add the `/site/` path to `webRoot` and change `localhost` to `127.0.0.1` on `url`, so that the file looks like this:
```json
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "type": "chrome",
            "request": "launch",
            "name": "Launch Chrome against localhost",
            "url": "http://127.0.0.1:5173",
            "webRoot": "${workspaceFolder}/site/"
        }
    ]
}
```

Great! You should now be able to run the io-site server with `npm run dev` and then the debugger by either pressing **F5** on your keyboard, or clicking on **Run>Start Debugging**.

This will launch Chrome on whatever address you provided to `url` on `launch.json`, allowing you to use io-site as well as entering debugging mode on VSCode.

> **Note:** Again, you are welcome to try your own debugging method, such as [Chrome DevTools](https://developer.chrome.com/docs/devtools/javascript/breakpoints/).


## Directory structure

Now that you know how to set up, run and debug io-site, you will probably want a tour of the directory structure. This should help you know where to add any new features, or where to spot a particular bug in need of fixing.

Here are the relevant parts of the directory tree along with short descriptions of each directory:

- `.github/workflows`: Contains the build and deploy workflows for the project.
- `site`: The 'site' directory is the heart of the codebase, housing the majority of substantial code. Subdirectories include:
    - `public`: This contains shared images and vector files that are shared sitewide.
    - `scripts`: The home for general purpose scripts, such as 'deploy'.
    - `src`: Webpage code is stored here. Currently, styling and functional code are stored in the same directory, using the practice of `FILENAME.jsx` and `FILENAME.css`. Subdirectories include:
        - `nav`: Contains the navigational components of the io-site which can be seen at the top of the web page. Similarly, styling and functionality files are kept in the same location, with only file endings differing in naming.

## Submit a Pull Request

To push your changes you will have to [submit a PR from your Fork](https://docs.github.com/en/github-ae@latest/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork).

> **⚠️ A Note of Caution**: io-site is a live code base! Please remember to continuously [sync your fork](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork) and [synchronize those changes from VSCode](https://code.visualstudio.com/docs/sourcecontrol/overview#:~:text=There%20is%20a%20Synchronize%20Changes,commits%20to%20the%20upstream%20branch.) as you work in your local environment. You may also [rebase your main branch](https://github.blog/changelog/2022-02-03-more-ways-to-keep-your-pull-request-branch-up-to-date/) as you push commits to your PR.

## Issues
We use GitHub issues to track bugs and feature requests. In case of bug reports, please ensure your description is clear and has sufficient instructions for reproducing the bugs.

## License
By contributing to io-site, you agree that your contributions will be licensed under the [LICENSE file](LICENSE.md).