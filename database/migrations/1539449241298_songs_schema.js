"use strict";

const Schema = use("Schema");

class SongsSchema extends Schema {
  up() {
    this.create("songs", table => {
      table.increments();
      table.string("name");
      table
        .integer("album_id")
        .references("id")
        .inTable("albums")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.timestamps();
    });
  }

  down() {
    this.drop("songs");
  }
}

module.exports = SongsSchema;
