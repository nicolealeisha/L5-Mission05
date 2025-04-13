// import { render, screen, expect } from '@testing-library/react'
// import server from './server';

test('HeartBeat', async () => {
    expect(true).toBeTruthy();

    // expect(!!process.env.SERVER_URL).toBeTruthy();
    // expect(!!process.env.PORT).toBeTruthy();
    // expect(!!process.env.PORT_ALT).toBeTruthy();
    // expect(!!process.env.ENVIRONMENT).toBeTruthy();

});


test('Component | Database *MongoDB', async () => {
  const Dependencies = require('../server.js');
  // const { mongo } = await Dependencies.initialize({ mongo: true });

  // const { User } = require('../routes/productListing.js');
  // const nUsers = await User.countDocuments({});

  await Dependencies.testShutdown();
  await fetch("http://localhost:3000/shutdown", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  expect(nUsers).toBeGreaterThanOrEqual(1);
});