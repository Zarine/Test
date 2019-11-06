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

async function get(id) {
  const [row] = await client.query(
    sql`
      SELECT data
      FROM personnage
      WHERE id=${id}
    `
  );
  return row ? row.data : null;
}
async function set(id, value) {
  await client.query(sql`
    INSERT INTO personnage (id, data)
    VALUES (${id}, ${value})
    ON CONFLICT id
    DO UPDATE SET data = EXCLUDED.data;
  `);
}

var data = {};
data.key = "123";
data.other = "bonjour";

set('12347', data);

//var insertQuery = "INSERT INTO table_name (id, data) VALUES ('12347', " + JSON.stringify(data) + ");";
//client.query(insertQuery, (err, res) => {
//  if (err) console.log('insert fail: ' + err);
//});

client.query("SELECT data FROM table_name WHERE id = '12347';", (err, res) => {
  if (err) { console.log('select fail: ' + err); }
  else { 
    for (let row of res.rows) {
      console.log(JSON.stringify(row));
      console.log(JSON.stringify(row.data));
    }
  }
  client.end();
});