const db = require("knex")(require("../knexfile"));
const { hashPassword } = require("./utils/hash");

// Recreate and seed the demo database on every start.
async function seed() {
  await db.schema.dropTableIfExists("notes");
  await db.schema.dropTableIfExists("users");
  await db.schema.createTable("users", (t) => {
    t.increments("id");
    t.string("username").unique().notNullable();
    t.string("email").notNullable();
    t.string("password_hash").notNullable();
    t.string("role").notNullable().defaultTo("user");
  });
  await db.schema.createTable("notes", (t) => {
    t.increments("id");
    t.integer("owner_id").notNullable();
    t.string("title").notNullable();
    t.text("body").notNullable();
  });

  await db("users").insert([
    { username: "admin", email: "admin@acme.test", password_hash: hashPassword("admin123"), role: "admin" },
    { username: "alice", email: "alice@acme.test", password_hash: hashPassword("wonderland"), role: "user" },
    { username: "bob", email: "bob@acme.test", password_hash: hashPassword("builder"), role: "user" },
  ]);
  await db("notes").insert([
    { owner_id: 2, title: "Groceries", body: "milk, eggs, coffee" },
    { owner_id: 3, title: "Ideas", body: "build a better birdhouse" },
  ]);
}

const ready = seed();

module.exports = { db, ready };
