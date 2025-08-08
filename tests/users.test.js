const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Post = require("../models/Post");

describe("POST routes", () => {

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  afterEach(async () => {
    // Solo borrar posts marcados como de test
    await Post.deleteMany({ isTest: true });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe("POST /post/create", () => {
    it("debería crear un post con datos válidos", async () => {
      const res = await request(app)
        .post("/post/create")
        .send({
          title: "Mi primer post",
          body: "Contenido del primer post",
          isTest: true // <== agrego isTest aquí
        });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("_id");
      expect(res.body.title).toBe("Mi primer post");
    });

    it("debería devolver 400 si faltan campos", async () => {
      const res = await request(app)
        .post("/post/create")
        .send({ title: "", isTest: true });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("message");
    });
  });

  describe("GET /post", () => {
    it("debería devolver todos los posts", async () => {
      await Post.create({ title: "Test 1", body: "Body 1", isTest: true });
      await Post.create({ title: "Test 2", body: "Body 2", isTest: true });

      const res = await request(app).get("/post");
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe("GET /post/id/:_id", () => {
    it("debería devolver un post por ID", async () => {
      const post = await Post.create({ title: "Test", body: "Body", isTest: true });
      const res = await request(app).get(`/post/id/${post._id}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.title).toBe("Test");
    });

    it("debería devolver 404 si el post no existe", async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app).get(`/post/id/${fakeId}`);
      expect(res.statusCode).toBe(404);
    });
  });

  describe("GET /post/title/:title", () => {
    it("debería devolver un post por título", async () => {
      await Post.create({ title: "BuscarTitulo", body: "Body", isTest: true });
      const res = await request(app).get("/post/title/BuscarTitulo");
      expect(res.statusCode).toBe(200);
      expect(res.body.title).toBe("BuscarTitulo");
    });

    it("debería devolver 404 si no se encuentra el título", async () => {
      const res = await request(app).get("/post/title/NoExiste");
      expect(res.statusCode).toBe(404);
    });
  });

  describe("PUT /post/id/:_id", () => {
    it("debería actualizar un post existente", async () => {
      const post = await Post.create({ title: "Original", body: "Body", isTest: true });
      const res = await request(app)
        .put(`/post/id/${post._id}`)
        .send({ title: "Actualizado", body: "Nuevo body", isTest: true});

      expect(res.statusCode).toBe(200);
      expect(res.body.title).toBe("Actualizado");
    });

    it("debería devolver 404 si el post no existe", async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app)
        .put(`/post/id/${fakeId}`)
        .send({ title: "Nuevo", body: "Body" });
      expect(res.statusCode).toBe(404);
    });
  });

  describe("DELETE /post/id/:_id", () => {
    it("debería eliminar un post existente", async () => {
      const post = await Post.create({ title: "Eliminar", body: "Body", isTest: true });
      const res = await request(app).delete(`/post/id/${post._id}`);
      expect(res.statusCode).toBe(200);

      const found = await Post.findById(post._id);
      expect(found).toBeNull();
    });

    it("debería devolver 404 si el post no existe", async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app).delete(`/post/id/${fakeId}`);
      expect(res.statusCode).toBe(404);
    });
  });

  describe("GET /post/postsWithPagination", () => {
    it("debería devolver posts paginados", async () => {
      for (let i = 1; i <= 15; i++) {
        await Post.create({ title: `Post ${i}`, body: `Body ${i}`, isTest: true });
      }

      const res = await request(app).get("/post/postsWithPagination?page=1&limit=10");
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBeLessThanOrEqual(10);
    });
  });

});
