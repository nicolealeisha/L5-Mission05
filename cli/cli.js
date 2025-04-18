#!/usr/bin/env node

import { addAuctionItem, findAuctionItems, dbstring, itemCount, updateAuctionItem, deleteAuctionItemByKeyword, deleteAuctionItemById, listAuctionItems, exportAuctionItems, importAuctionItems, deleteAllAuctionItems, findIdFirstMatchingItem } from './database.js';
import { Command } from 'commander';
import fs, { writeFileSync} from 'node:fs';
import path from 'node:path';
import argv from 'node:process';

const program = new Command();

function isText(t) {
    if (t.length > 4 && isNaN(t)) { return true; }; return false;
}

function isNumber(n) {
    if (n.length > 0 && n > 0 && !isNaN(n)) { return true; }; return false;
}

function printDebug(options, command) {
    if (options && options.debug) {
        console.error('Called %s with options ', command.name(), options, command.args);
    } 
}

program
    .version('version')
    .description('productName')

program
    .command('add') // <title> <description> <reserve-price> <start-price>
    .alias('a')
    .description('Add an Auction Item')
    .argument('<title>', 'Title of the auction item')
    .argument('<description>', 'Description of the auction item')
    .argument('<reserve_price>', 'Reserve price of the auction item')
    .argument('<start_price>', 'Start price of the auction item')
    .option('--debug', 'output extra debugging')
    .action((title, description, reserve_price, start_price, options, command) => {
        printDebug(options, command);
        let errors ="💩";
        
        if (!isText(title))  errors+= `Please enter a title ${title}`; 
        if (!isText(description))  errors+= `Please enter a title ${description}`; 
        if (!isNumber(reserve_price)) errors+= `Please enter a title ${reserve_price}`; 
        if (!isNumber(start_price)) errors+= `Please enter a title ${start_price}`; 
        if (reserve_price < start_price) errors+= `Reserve price must be greater than start price ${reserve_price} > ${start_price}`; 

        if (errors.length > 2) {
            console.error( `ERROR: ${errors}`);
            return;
        }
        addAuctionItem({title, description, reserve_price, start_price});
    });
        
program
    .command('find')
    .alias('f')
    .description('Find auction by keyword or _id search')
    .argument('<keyword or _id>', 'keyword or _idm')
    .action((keyword, options, command) => findAuctionItems(keyword));
 

program
    .command('id')
    .description('Find just the auction ID by keyword')
    .argument('<keyword>', 'keyword')
    .action((keyword, options, command) => findIdFirstMatchingItem(keyword));

program
    .command('update')
    .description('Update an auction item by id')
    .argument('<_id>', '_id of the auction item')
    .argument('<title>', 'Title of the auction item')
    .argument('<description>', 'Description of the auction item')
    .argument('<reserve_price>', 'Reserve price of the auction item')
    .argument('<start_price>', 'Start price of the auction item')
    .option('-v, --debug', 'output extra debugging')
    .action((_id, title, description, reserve_price, start_price, options, command) => {
        printDebug(options, command);
        const errors = () => {
            if (!isText(title)) { return `Please enter a title ${title}`; }
            if (!isText(description)) { return `Please enter a title ${description}`; }
            if (!isNumber(reserve_price)) { return `Please enter a title ${reserve_price}`; }
            if (!isNumber(start_price)) { return `Please enter a title ${start_price}`; }
            if (reserve_price > start_price) { return `Reserve price must be greater than start price ${reserve_price} > ${start_price}`; }
        }
        if (errors.length > 0 ) {
            console.error("💩", errors);
            return;
        }

        updateAuctionItem(_id, { title, description, reserve_price, start_price});
    });

program
    .command('del')
    .description('Delete an auction item BY ID')
    .argument('<_id>', 'requires _id of the auction item, delete for keyword')
    .option('-v, --debug', 'output extra debugging')
    .option('--all', 'DANGER: delete entire collection immediately!')
    .action((_id, options) => {
        if (options.all) {
            deleteAllAuctionItems();
        } else {
            deleteAuctionItemById(_id);
        }
    })

program
    .command('delete')
    .description('Delete an auction item by keyword')
    .argument('<keyword>', 'keyword to search and find 1 to delete ASAP')
    .option('-v, --debug', 'output extra debugging')
    .option('--all', 'DANGER: delete entire collection immediately!')
    .action((keyword, options) => {
        if (options.debug) {
            console.info(keyword)
        } 
        if (options.all) {
            deleteAllAuctionItems();
            return;
        }
        deleteAuctionItemByKeyword(keyword);
    })

program
    .command('list')
    .alias('l')
    .description('list all auction items')
    .action(async () => {
        await listAuctionItems();
        // await listDB();
    });

program
    .command('export')
    .alias('e')
    .description(`export file downloaded/database-export.json with all ${itemCount} auction items in collection`)
    .action(async () => {
        const filename = "database-export.json";
        let __dirname = path.resolve();
        let fullpath = path.resolve(path.join(__dirname,"downloaded", filename));
        let data = await exportAuctionItems();

        try { fs.mkdirSync(path.join(__dirname, "downloaded"));   } catch (e) {
            if (e.toString().indexOf('EEXIST') === -1) {
                    console.log(`Error creating directory 💩${e.toString().substring(0, 30)}`);
                }
            }
        writeFileSync(fullpath, JSON.stringify(data), 'utf8');
        console.log("Database export written to file: 💾", fullpath);
    });
        
program
    .command('import')
    .alias('i')
    .description('Import auction items from: downloaded/database-export.json')
    .option('--debug', 'output extra debugging')
    .action((options, command) => {
        printDebug(options, command);
        const __dirname = path.resolve();
        const jsonfile = path.resolve(path.join(__dirname,"downloaded", "database-export.json"));
        console.log("💾 Database import: ", path.basename(jsonfile));
        if (fs.existsSync(jsonfile)) {
            const data = JSON.parse(fs.readFileSync(jsonfile, 'utf8'));
            console.log(`Imported data: ${ data.length}`);
            importAuctionItems(data);
        } else {
            console.error(`File ${jsonfile} does not exist`);
        }
    });

    program
    .command('importfile')
    .description('Import auction items from JSON file. default: downloaded/database-export.json')
    .argument('<filename>', 'specify path to JSON file to import')
    .action((filename, options, command) => {
        const __dirname = path.resolve();
        let jsonfile;
        jsonfile = path.resolve(filename);
        console.log("💾 Database import: ", path.basename(jsonfile));
        if (fs.existsSync(jsonfile)) {
            const data = JSON.parse(fs.readFileSync(jsonfile, 'utf8'));
            console.log(`Imported data: ${ data.length}`);
            importAuctionItems(data);
        } else {
            console.error(`File ${jsonfile} does not exist`);
        }
    });

const  firstArg = argv[1];

const cli = (firstArg) => {
    if (process.env.RUNNINGTEST === 'true') {
        console.log(`exitOverride ${process.env.RUNNINGTEST}`)
        program.exitOverride(argv);
        return;
    } 
    if (firstArg !== "id")  {

        console.log(`Connected to ${dbstring} with ${itemCount} auction items`);
    }
    program.parse(process.argv);
}
cli()
export default { cli,program } 



// "jest": {
//     "testEnvironment": "node",
//     "transform": {
//       "^.+\\.js$": "babel-jest"
//     },
//     "testPathIgnorePatterns": [
//       "/node_modules/"
//     ],
//     "collectCoverage": true,
//     "coverageDirectory": "./coverage",
//     "coverageReporters": [
//       "text",
//       "html"
//     ]
//   },