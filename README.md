<h1 align="center">Welcome to form-app 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/node-12.17.0-brightgreen" />
  <img alt="Version" src="https://img.shields.io/badge/npm-6.14.4-brightgreen" />
  <img alt="Version" src="https://img.shields.io/badge/Angular%20CLI-10.1.3-brightgreen" />
 </p>

> An application to onboard employees at Los Angeles County Public Defender.

## Prerequisites

- `prettier` used for formatting. You can use the Vscode extension.
- `node`
- `npm`
- `angular cli` for more [information](https://cli.angular.io/)

## Installation

Before you get started with the installation, make sure you have node and npm install. You can verify by running `npm --version` and `node --version`. It is preferable if you use node 12.17 and npm 6.14.

1. First you have to clone the repository. You can do this by running `git clone https://github.com/PDSeniorDesign/form-app.git`. Please note that this url can change.
2. Then `cd` into the directory that was just created and run `npm install`. This will take care of installing all the dependencies that are needed.
3. Once the dependencies are installed, you can run `ng serve` and the application should start running. You can also run `npm run start`.

## Usage

```sh
ng serve
```

## Run tests

```sh
ng test
```

## Development

### Folder Structure

- `core` contains core functionality such as services, models, etc.
  - `models`
  - `services`
  - `types`
- `form` contains the logic for the forms. Employee form and Contractor form are included here.
  - `contractor-form` where all the logic for the contractor form will live.
  - `employee-form` where all the logic for the employee form will live.
- `homepage` contains the logic and markup for the homepage.
- `request-status` a page to view the status on a specific form
- `shared` includes components that can be used throughout the app.

### Committing/Pushing

If you would like to contribute, please follow the following guidelines:

#### Work on new branch

Before you start coding, make sure you are not working on the master branch. Create a separate branch by using the command `git checkout -b <NAME OF BRANCH>`. For example, if I was going to make a commit to fix a typo, I would use `git checkout -b fix-typo`.

#### Branch naming conventions

That brings us to another point, if you are implementing something new make sure the branch starts with the prefix `feature-`. If you are implementing a fix, make sure the branch starts with the prefix `fix-`. This is just to keep things organized and well-named.

#### Formatting

Before commiting please format your code with `prettier`. This is a tool that formats the code for you. Since this is what is currently being used, this is the recommended formmater. If you use [Visual Studio Code](https://code.visualstudio.com/Download), there is a [plugin](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) for the formatter that you can install. There are some [shortcuts](https://stackoverflow.com/questions/29973357/how-do-you-format-code-in-visual-studio-code-vscode) you can use.

#### Test Server
When a pull request or commit gets pushed to the master branch, it will automatically trigger the test server to update. The test server is [here](https://pacific-waters-97783.herokuapp.com/). It should mirror what is on the `master` branch.

## Authors

👤 **Adrian Palomares**

- Github: [@adrianpalomares](https://github.com/adrianpalomares)

👤 **Tabassuma Torosa**

- Github: [@rtiare](https://github.com/rtiare)

👤 **Paul Clef Ube**

- Github: [@PaulClefUbeCoding](https://github.com/PaulClefUbeCoding)

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
