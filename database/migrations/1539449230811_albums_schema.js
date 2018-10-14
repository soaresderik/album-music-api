"use strict";

const Schema = use("Schema");

class AlbumsSchema extends Schema {
  up() {
    this.create("albums", table => {
      table.increments();
      table.string("name");
      table.string("artist");
      table.string("imagem");
      table.timestamps();
    });
  }

  down() {
    this.drop("albums");
  }
}

module.exports = AlbumsSchema;
