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

client.query("CREATE TABLE personnage (id VARCHAR(25) UNIQUE PRIMARY KEY, data JSONB NOT NULL);", (err, res) => {
  if (err) console.log('la table existe deja');
});

var test = {};
test.key = "789";
test.other = "hello";

var insertQuery = "INSERT INTO personnage (id, data) VALUES ('123478', '" + JSON.stringify(test) + "');";
client.query(insertQuery, (err, res) => {
  if (err) console.log('insert fail: ' + err);
});

client.query("SELECT data FROM personnage", (err, res) => {
  if (err) { console.log('select fail: ' + err); }
  else { 
    for (let row of res.rows) {
      console.log(JSON.stringify(row));
    }
  }
  client.end();
});