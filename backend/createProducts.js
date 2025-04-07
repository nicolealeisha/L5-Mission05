const mongoose = require('mongoose');
const Product = require('./models/product');  // Assuming product schema is in 'models/product'

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/mission-05', {
})
  .then(() => {
    console.log("Connected to MongoDB!");

    // Sample products
    const products = [
      {
        title: 'Ergonomic Office Chair',
        description: 'Comfortable ergonomic chair with adjustable armrests and lumbar support.',
        start_price: 120,
        reserve_price: 180,
        image: 'https://www.smartofficefurniture.co.nz/cdn/shop/files/mondo-brook-mesh-mid-back-chair-smart-office-furniture.webp?v=1733892315&width=533',
        category: 'Furniture',
        subcategory: 'Office Chairs',
        location: 'Auckland, NZ',
        condition: 'New',
        auction_start_date: new Date('2025-04-10'),
        auction_start_time: '10:00 AM',
        auction_end_date: new Date('2025-04-15'),
        auction_end_time: '5:00 PM',
      },
      {
        title: 'Standing Desk',
        description: 'Adjustable standing desk with electric height adjustment.',
        start_price: 350,
        reserve_price: 500,
        image: 'https://standdesk.nz/wp-content/uploads/2023/07/1500-walnut-black.jpg',
        category: 'Furniture',
        subcategory: 'Desks',
        location: 'Wellington, NZ',
        condition: 'New',
        auction_start_date: new Date('2025-04-12'),
        auction_start_time: '9:00 AM',
        auction_end_date: new Date('2025-04-20'),
        auction_end_time: '6:00 PM',
      },
      {
        title: 'Gaming Laptop',
        description: 'High-performance laptop with RTX graphics card and 16GB RAM for gaming.',
        start_price: 1500,
        reserve_price: 2000,
        image: 'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/g-series/g16-7630/media-gallery/black/notebook-g16-7630-nt-black-gallery-1.psd?fmt=pjpg&pscan=auto&scl=1&wid=3510&hei=2635&qlt=100,1&resMode=sharp2&size=3510,2635&chrss=full&imwidth=5000',
        category: 'Electronics',
        subcategory: 'Laptops',
        location: 'Auckland, NZ',
        condition: 'Used',
        auction_start_date: new Date('2025-04-10'),
        auction_start_time: '12:00 PM',
        auction_end_date: new Date('2025-04-14'),
        auction_end_time: '7:00 PM',
      },
      {
        title: 'LED Monitor 24" Full HD',
        description: 'Full HD LED monitor with 144Hz refresh rate, perfect for gaming.',
        start_price: 250,
        reserve_price: 350,
        image: 'https://i.dell.com/is/image/DellContent//content/dam/images/products/electronics-and-accessories/dell/monitors/s-series/s2421hn/s2421hn-cfp-00025lf095-gy.psd?fmt=pjpg&pscan=auto&scl=1&wid=3488&hei=2974&qlt=100,1&resMode=sharp2&size=3488,2974&chrss=full&imwidth=5000',
        category: 'Electronics',
        subcategory: 'Monitors',
        location: 'Christchurch, NZ',
        condition: 'New',
        auction_start_date: new Date('2025-04-15'),
        auction_start_time: '2:00 PM',
        auction_end_date: new Date('2025-04-22'),
        auction_end_time: '4:00 PM',
      },
      {
        title: 'Wireless Mouse',
        description: 'Ergonomic wireless mouse with long battery life and fast response.',
        start_price: 30,
        reserve_price: 50,
        image: 'https://assets.kogan.com/images/mightyape/MPE-30820052/1-2fbbd54b15-218216385.jpeg?auto=webp&bg-color=fff&canvas=1200%2C800&dpr=1&enable=upscale&fit=bounds&height=800&quality=90&width=1200',
        category: 'Accessories',
        subcategory: 'Mice',
        location: 'Hamilton, NZ',
        condition: 'New',
        auction_start_date: new Date('2025-04-18'),
        auction_start_time: '8:00 AM',
        auction_end_date: new Date('2025-04-25'),
        auction_end_time: '3:00 PM',
      },
    ];

    // Insert the sample products into MongoDB
    Product.insertMany(products)
      .then((docs) => {
        console.log(`${docs.length} products added successfully!`);
        mongoose.connection.close(); // Close the connection after inserting
      })
      .catch((err) => {
        console.error('Error inserting products:', err);
        mongoose.connection.close(); // Close the connection on error as well
      });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
