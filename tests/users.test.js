const request = require("supertest");
const app = require("../index.js");
const mongoose = require('mongoose');
const POST = require('../models/Post');

beforeAll(async () => {
  await mongoose.connect("mongodb://localhost/test");  // Conectar a la base de datos de test
});

afterAll(async () => {
  await mongoose.connection.close();  // Cerrar la conexión a la base de datos
});

describe('POST API', () => {
  let newPostId;

  afterEach(async () => {
    await POST.deleteMany();  // Elimina todos los posts creados para asegurar un entorno limpio para cada test
  });

  test('Debe crear un nuevo post', async () => {
    const res = await request(app).post('/post/create').send({
      title: 'Post de prueba',
      body: 'Este es un test'
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Post de prueba');
    newPostId = res.body._id;
  });

  test('Debe obtener todos los posts', async () => {
    const res = await request(app).get('/post/');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('Debe obtener un post por id', async () => {
    const res = await request(app).get(`/post/id/${newPostId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(newPostId);
  });
}); 

/*describe('Ruta de prueba para usuarios', () => {
  test('GET /user debe responder con 200', async () => {
    const response = await request(app).get('/user'); // ajustá la ruta según tu app
    expect(response.statusCode).toBe(200);
  });
});*/

/* VERIFICAR UNA RUTA CON BEFORE Y AFTER ALL
//Usando una conexión a una base de datos local (directamente en el código)

beforeAll(async () => {
  await mongoose.connect("mongodb://localhost/test");  // Conectar a la base de datos de test
});

afterAll(async () => {
  await mongoose.connection.close();  // Cerrar la conexión a la base de datos
});

describe("POST /post/create", () => {
  test("Debe crear un post", async () => {
    const res = await request(app)
      .post("/post/create")  // Hacemos la petición POST
      .send({
        title: "Nuevo Post",
        body: "Este es un nuevo post de prueba",
      });

    expect(res.statusCode).toBe(201);  // Verificamos que el código de estado sea 201
    expect(res.body.title).toBe("Nuevo Post");  // Verificamos que el título sea el esperado
  });
});

*/

//#############################################################

// Opcional: setear una DB de test si tenés otra URI
//Usando una URI de conexión desde un archivo .env (con process.env.MONGO_URI)
/*beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});
*/

//##############################################################

/* VERIFICAR MULTIPLES RUTAS EN UN DESCRIBE

describe('POST API', () => {
  let newPostId;

  test('Debe crear un nuevo post', async () => {
    const res = await request(app).post('/post/create').send({
      title: 'Post de prueba',
      body: 'Este es un test'
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Post de prueba');
    newPostId = res.body._id;
  });

  test('Debe obtener todos los posts', async () => {
    const res = await request(app).get('/post/');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('Debe obtener un post por id', async () => {
    const res = await request(app).get(`/post/id/${newPostId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(newPostId);
  });
}); 

*/
//##############################################################

/* VERIFICAR SI UN POST FUE CREADO CORRECTAMENTE

describe("testing/users", () => {

    const user = {
      name: "Username",
      email: "test@example.com",
      password: "123456",
    };

  test("Create a user", async () => {
    let usersCount = await User.countDocuments({});
    expect(usersCount).toBe(0);

    resUser = await request(app).post("/create").send(user).expect(201);
    

    usersCount = await User.countDocuments({});
    expect(usersCount).toBe(1);
  });

  test("Verificar datos de usuario creado", async () => {
    resUser = await request(app).post("/create").send(user).expect(201);
    expect(resUser.body.user._id).toBeDefined();
    expect(resUser.body.user.createdAt).toBeDefined();
    expect(resUser.body.user.updatedAt).toBeDefined();
  });
   */

  //##############################################################
/* LIMPIAR LA BASE DE DATOS DESPUES DE LAS PRUEBAS

  afterAll(() => {
      return User.deleteMany();
    });
  
  */