const { Client } = require('pg');

async function getConnetction(){
   const client = new Client({
     host:'localhost',
     port: 5432,
     user: 'sebas',
     password: 'admin123',
     database: 'my_store'
  });
 await client.connect();
 return client;
}

module.exports = getConnetction;
