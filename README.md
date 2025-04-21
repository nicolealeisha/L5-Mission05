# Mission-05

* The purpose of this project was to work in a small team to recreate Trade Me with a more thoughtful user flow, following wireframes provided by UX designers.
* Wireframe source: <https://www.figma.com/design/TRIX4MzmdJZcQ0TmvK37bH/Mission-5-TradeMe-Group-3?node-id=0-1&p=f>
* Tom was responsible for the search page, and Nicole was responsible for the product page.
* Github repo: <https://github.com/nicolealeisha/L5-Mission05

### Prerequisites

**The project utilises the following:**

* NPM must be initilised by running the following command: 
```sh
npm install
```

## Back End Initalisation

**Upon downloading the files, and creation of a mongoDB titled 'mission-05' on
server http://127.0.0.1:27017, the user will need to run**

### Method 1 (Nicole)

```sh
node createProducts.js
```
**This will initialise the database with dummy products.**

### Method 2 (Tom)

```sh
cli/cli import
```
***As above but also import 5 sample db entries from [database-export.json](cli/downloaded/database-export.json)

**The user can then run**

```sh
node server.js

npm run start

npm run test
```
**to start and test the server.**

