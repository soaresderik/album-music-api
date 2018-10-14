"use strict";

const Model = use("Model");

class Album extends Model {
  songs() {
    return this.hasMany("App/Models/Song");
  }

  static get hidden() {
    return ["updated_at", "created_at"];
  }
}

module.exports = Album;
