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

client.query("CREATE TABLE table_name (id VARCHAR(25) UNIQUE PRIMARY KEY, data TEXT);", (err, res) => {
  if (err) console.log('la table existe deja');
  client.end();
});

client.query("INSERT INTO table_name (id, data) VALUES ('123', '{}');", (err, res) => {
  if (err) console.log('insert fail: ' + err);
  client.end();
});

client.query("SELECT data FROM table_name WHERE id = '123';", (err, res) => {
  if (err) { console.log('select fail: ' + err); }
  else { console.log('response:' + res); }
  client.end();
});