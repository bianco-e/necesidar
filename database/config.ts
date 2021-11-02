const create_users_table = `CREATE TABLE Users(
  user_id SERIAL NOT NULL,
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL,
  phone varchar(255),
  email varchar(255) NOT NULL,
  province varchar(255),
  city varchar(255),
  neighborhood varchar(255),
  avatar varchar(255),
  google_id varchar(255),
  created_at timestamp,
  deleted_at timestamp,
  PRIMARY KEY(user_id))`;

const create_publications_table = `CREATE TABLE Publications(
  id SERIAL NOT NULL,
  user_id int NOT NULL,
  title varchar(255) NOT NULL,
  description varchar(255) NOT NULL,
  images varchar(255)[],
  province varchar(255) NOT NULL,
  city varchar(255) NOT NULL,
  neighborhood varchar(255) NOT NULL,
  is_urgent boolean,
  can_move boolean NOT NULL,
  requests_number int,
  created_at timestamp,
  deleted_at timestamp,
  updated_at timestamp,
  PRIMARY KEY(id),
  CONSTRAINT fk_user
  FOREIGN KEY(user_id)
  REFERENCES Users(user_id))`;

const create_favorites_table = `CREATE TABLE Favorite_publications(
  user_id int NOT NULL,
  publication_id int NOT NULL,
  PRIMARY KEY(user_id, publication_id),
  CONSTRAINT fk_user
  FOREIGN KEY(user_id)
  REFERENCES Users(user_id),
  CONSTRAINT fk_publication
  FOREIGN KEY(publication_id)
  REFERENCES Publications(id))`;

const create_contacted_table = `CREATE TABLE Contacted_publications(
  user_id int NOT NULL,
  publication_id int NOT NULL,
  PRIMARY KEY(user_id, publication_id),
  CONSTRAINT fk_user
  FOREIGN KEY(user_id)
  REFERENCES Users(user_id),
  CONSTRAINT fk_publication
  FOREIGN KEY(publication_id)
  REFERENCES Publications(id))`;

export {};

/* pool.query("SELECT * FROM Publications LIMIT 10", (err, res) => {
  if (err) return console.error(err);
  console.log("rows", res.rows);
  pool.end();
}); */

/* const client = new Client({
  connectionString: PG_URI,
  ssl: { rejectUnauthorized: false },
});

client.connect();

client.query("SELECT NOW()", (err, res) => {
  console.log(err, res);
  client.end();
});
client.end(); */
