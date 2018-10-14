"use strict";

/*
|--------------------------------------------------------------------------
| AlbumSongSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use("Factory");

class AlbumSongSeeder {
  async run() {
    await Factory.model("App/Models/Album").createMany(10);
    await Factory.model("App/Models/Song").createMany(100);
  }
}

module.exports = AlbumSongSeeder;
