<h1 align="center">
  The Trippy Motherfuckers
</h1>

This is the codebase of The Trippy Motherfuckers' website.
The application is using Gatsby.js and styled-components, and is intended to be as trippy as possible. Happy coding!

## 🚀 Quick start

1. **Clone this repository**

   Clone this repository
   `git clone https://github.com/atmasark/the-trippy-motherfuckers`

2. **Install dependencies**

   Navigate into the main directory and run the following command to install all dependencies.

   ```shell
   cd the-trippy-motherfuckers/
   npm install
   ```

3. **Start developing.**

   Start up the application.

   ```shell
   gatsby develop
   ```

   Psst. To get the application running on your LAN (and be able to run the site on other devices in the same network), run the following command instead

   ```shell
   gatsby develop -H 0.0.0.0
   ```

   The address to access the site on your network will be shown in the console.

4. **Open the source code and start editing!**

   Your site is now running at `http://localhost:8000`!

   _Note: You'll also see a second link: _`http://localhost:8000/___graphql`_. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.org/tutorial/part-five/#introducing-graphiql)._

   Open the `the-trippy-motherfuckers` directory in your code editor of choice and edit `src/components/Home.jsx`. Save your changes and the browser will update in real time!

## 🧐 What's inside?

A quick look at the top-level files and directories you'll see in a Gatsby project.

    .
    ├── node_modules
    ├── src
      ├── components
      ├── images
      ├── layout
      ├── pages
      ├── styles
    ├── .gitignore
    ├── .prettierrc
    ├── gatsby-browser.js
    ├── gatsby-config.js
    ├── gatsby-node.js
    ├── gatsby-ssr.js
    ├── LICENSE
    ├── package-lock.json
    ├── package.json
    └── README.md

1.  **`/node_modules`**: This directory contains all of the modules of code that your project depends on (npm packages) are automatically installed.

2.  **`/src`**: This directory will contain all of the code related to what you will see on the front-end of your site (what you see in the browser) such as your site header or a page template. `src` is a convention for “source code”.

- **`/src/components`**: This is the directory most of the contributions should be located in.

- **`/src/images`**: All the images used on the website belong here.

- **`/src/layout`**: This is a higher level layout file, which connects global styles and style related files on the application.

- **`/src/pages`**: The pages are set here. To add a new page, just add a new .jsx file here.

- **`/src/styles`**: Global styles should be set here, more precisely in `/src/styles/styles.css`.

3.  **`.gitignore`**: This file tells git which files it should not track / not maintain a version history for.

4.  **`.prettierrc`**: This is a configuration file for [Prettier](https://prettier.io/). Prettier is a tool to help keep the formatting of your code consistent.

5.  **`gatsby-config.js`**: This is the main configuration file for a Gatsby site. This is where you can specify information about your site (metadata) like the site title and description, which Gatsby plugins you’d like to include, etc. (Check out the [config docs](https://www.gatsbyjs.org/docs/gatsby-config/) for more detail).

6.  **`gatsby-node.js`**: This file is where Gatsby expects to find any usage of the [Gatsby Node APIs](https://www.gatsbyjs.org/docs/node-apis/) (if any). These allow customization/extension of default Gatsby settings affecting pieces of the site build process.

7.  **`LICENSE`**: Gatsby is licensed under the MIT license.

8.  **`package-lock.json`** (See `package.json` below, first). This is an automatically generated file based on the exact versions of your npm dependencies that were installed for your project. **(You won’t change this file directly).**

9.  **`package.json`**: A manifest file for Node.js projects, which includes things like metadata (the project’s name, author, etc). This manifest is how npm knows which packages to install for your project.

10. **`README.md`**: A text file containing useful reference information about your project.
