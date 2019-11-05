//Initialisation

const Discord = require('discord.js');
const discordClient = new Discord.Client();
const PREFIX = "!";

console.log(`hello`);

const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect();

client.query('CREATE TABLE table_name (id VARCHAR(25) UNIQUE PRIMARY KEY, data TEXT);', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});