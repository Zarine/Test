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
var id = "1234";

var insertQuery = "INSERT INTO personnage (id, data) VALUES ('" + id + "', '" + JSON.stringify(test) + "');";
client.query(insertQuery, (err, res) => {
  if (err) console.log('insert fail: ' + err);
});

client.query("SELECT id, data FROM personnage", (err, res) => {
  if (err) { console.log('select fail: ' + err); }
  else { 
    for (let row of res.rows) {
      console.log(JSON.stringify(row));
      console.log(JSON.stringify(row.id));
      console.log(JSON.stringify(row.data));
    }
  }
});

test.key = "123456789"

var updateQuery = "UPDATE personnage SET data = '" + test + "' WHERE id = '" + id + "';);";
client.query(updateQuery, (err, res) => {
  if (err) console.log('insert fail: ' + err);
});