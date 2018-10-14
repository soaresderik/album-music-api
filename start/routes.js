"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");
const Album = use("App/Models/Album");
const Song = use("App/Models/Song");

Route.get("/", () => {
  return { greeting: "Hello world in JSON" };
});

Route.get("/albums", async () => {
  const albums = await Album.query()
    .orderBy("id", "desc")
    .fetch();

  return albums;
});

Route.get("/albums/:id", async ({ params }) => {
  const album = await Album.query()
    .with("songs")
    .where("id", params.id)
    .first();

  return album;
});

Route.post("/albums", async ({ request }) => {
  const { artist, album } = request.all();

  const newAlbum = new Album();

  newAlbum.name = album;
  newAlbum.artist = artist;

  await newAlbum.save();

  return newAlbum;
});

Route.delete("/albums/:id", async ({ params }) => {
  const album = await Album.find(params.id);

  return album.delete();
});

Route.post("/albums/:id/song/add", async ({ request, params }) => {
  const song = new Song();

  song.album_id = params.id;
  song.name = request.input("song");

  await song.save();

  return song;
});

Route.put("/albums/:id/photo", async ({ request, params }) => {
  const image = request.file("album_image", {
    types: ["image"],
    size: "2mb"
  });

  await image.move("public/uploads", {
    name: `${new Date().getTime()}.jpg`
  });

  const pathImage = `http://localhost:3333/uploads/${image.fileName}`;

  const album = await Album.find(params.id);
  album.imagem = pathImage;

  await album.save();

  return album;
});

Route.delete("/songs/:id", async ({ params }) => {
  const song = await Song.find(params.id);

  await song.delete();
});
