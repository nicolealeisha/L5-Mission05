// import Customer from './models/customer.js';
// import AuctionItem from './models/auction-item.js';
// import productSchema from './models/product.js';
import Product from './models/product.js';
import mongoose from 'mongoose';
import process from 'node:process';
const args = process.argv;
const AuctionItem = Product;
const dbstring = 'mongodb://127.0.0.1:27017/mission-05'
mongoose.Promise = global.Promise;

process.stdout.write(`Connecting to MongoDB...   ${dbstring} (check db connection)`);  // clear current text
await mongoose.connect(dbstring, {});
const { isTTY } = process.stdout;
if (isTTY) {
  process.stdout.cursorTo(0);  // move cursor to beginning of line
  process.stdout.clearLine();  // clear current text  
  // process.stdout.write('-'.repeat(100));
}

let itemCount = await AuctionItem.countDocuments({});

console.log(itemCount);

const addAuctionItem = (auctionItem) => {

  if (auctionItem.start_price > auctionItem.reserve_price) {
    console.log(`Start price must be less than reserve price`);
    mongoose.connection.close();
    return;
  } else {
    console.info(`Auction Item ${itemCount} ${auctionItem.title} with reserve of $${auctionItem.reserve_price}, start bid $${auctionItem.start_price} created`);
  }
  AuctionItem
    .create(auctionItem)
    .then((auctionItem) => {
      itemCount++;
    })
    .finally(() => {
      console.info(`Auction Item ${itemCount} ${auctionItem.title} with reserve of $${auctionItem.reserve_price}, start bid $${auctionItem.start_price} created`);

      mongoose.connection.close();
    });
}

const addCustomer = (customer) => {
  Customer
    .create(customer)
    .then((customer) => {
      console.info(`Customer ${customer.firstname} ${customer.lastname} created`);
    })
    .finally(() => {
      mongoose.connection.close();
    });

}
// const findAuctionById = (keyword) => {
// if (keyword.length  == 24) {
//   console.error(`Search by _id ${keyword}`);
//   AuctionItem.find({  _id: keyword  })
//     .then((items) => {
//       console.log(items);
//       console.info(`${items.length} matches found`);
//     })
//     .finally(() => {
//       mongoose.connection.close(); 
//     }); 
//   return;
// }

const findAuctionItems = async (keyword) => {

  const search = new RegExp(keyword, 'i');
  AuctionItem.find({ $or: [{ title: search }, { description: search }] })
    // AuctionItem.find({ $or: [{ title: /keyword/ }, { description: /keyword/ }] })
    .then((items) => {
      console.info(items);
      console.info(`${items.length} matches found`);
    })
    .finally(() => {
      mongoose.connection.close();
    });
}

const findIdFirstMatchingItem = async (keyword) => {

  const search = new RegExp(keyword, 'i');
  AuctionItem.findOne({ $or: [{ title: search }, { description: search }] })
    .then((item) => {
      if (item) {
        console.info(item);
        console.log();
        console.log(item._id.toString());
        return item._id.toString();
      }
    })
    .finally(() => {
      mongoose.connection.close();
    });
}

const findCustomers = async (name) => {
  const search = new RegExp(name, 'i');
  await Customer.find({ $or: [{ firstname: search }, { lastname: search }] })
    .then((customers) => {
      console.info(customers);
      console.info(`${customers.length} matches found`);
    })
    .finally(() => {
      mongoose.connection.close();
    });
}


const updateAuctionItem = async (_id, item) => {
  await AuctionItem.findByIdAndUpdate(_id, item, { upsert: true })
    .then((item) => {
      console.log('Succesfully saved.');
    })
    .finally(() => {
      mongoose.connection.close();
    });
}

const deleteAuctionItemById = async (_id) => {

  await AuctionItem
    .deleteOne({ _id })  // Deletes the document, returns a promise
    .exec()
    .then((_id) => {
      itemCount--;
      console.info(`🔥 Item ${_id} deleted.`);
    })
    .finally(() => {
      mongoose.connection.close();
    });
}


const deleteAuctionItemByKeyword = async (keyword) => {
  const the_id = await findIdFirstMatchingItem(keyword);
  await AuctionItem
    .deleteOne({ the_id })  // Deletes the document, returns a promise
    .exec()
    .then((the_id) => {
      itemCount--;
      console.info(`🔥 Item ${the_id} deleted, ${itemCount} remain.`);
    })
    .finally(() => {
      mongoose.connection.close();
    });
}
const deleteAllAuctionItems = async () => {
  await AuctionItem.deleteMany({})
    .then(() => {
      console.info(`🔥 All items deleted! use ./cli import to recover`);
      itemCount = 0;
    })
    .finally(() => {
      mongoose.connection.close();
    });
}

const listAuctionItems = async () => {
  await AuctionItem.find()
    .then((items) => {
      console.info(`Item ID:                  Title:              Description:     Reserve:  Start:`);
      items.forEach((item) => {
        console.info(`Item ${item._id} ${item.title.substring(0, 20)} | ${item.description.substring(0, 20)} | reserve  $${item.reserve_price} | start $${item.start_price}`);
      });
      console.log(`${items.length} matches found`);
    })
    .finally(() => {
      mongoose.connection.close();
    });
}
const exportAuctionItems = async () => {
  let exported;
  await AuctionItem.find()
    .then((items) => {
      exported = items;
      console.log(`${items.length} matches found`);
    })
    .finally(() => {
      mongoose.connection.close();
    });
  return exported;
}

const importAuctionItems = async (jsonfile) => {
  console.log(`jsonfile.length ${jsonfile.length}`);
  await AuctionItem.insertMany(jsonfile)
    .then(function (jsonfile) {
      console.log(`💾 Success adding ${jsonfile.length} documents in bulk`);
    })
    .finally(() => {
      mongoose.connection.close();
    });
}

const adminListAllDB = async () => {
  const adminConnection = `mongodb://127.0.0.1:27017/admin`
  mongoose.connect(adminConnection, { useNewUrlParser: true, useUnifiedTopology: true }).then((MongooseNode) => {
    /* I use the default nativeConnection object since my connection object uses a single hostname and port. Iterate here if you work with multiple hostnames in the connection object */

    const nativeConnetion = MongooseNode.connections[0]
    //now call the list databases function
    new Admin(nativeConnetion.db).listDatabases(function (err, results) {
      console.log(results)  //store results and use
    });
  })
}

export { addCustomer, findCustomers, addAuctionItem, findAuctionItems, dbstring, itemCount, updateAuctionItem, deleteAuctionItemById, deleteAuctionItemByKeyword, listAuctionItems, deleteAllAuctionItems, exportAuctionItems, importAuctionItems, adminListAllDB, findIdFirstMatchingItem }