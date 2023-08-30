const db_rel = require('./app/models');
const userController = require('./app/controllers/user.controller');
const bootcampController = require('./app/controllers/bootcamp.controller');

async function run() {

    // Crear y guardar usuarios
    const user1 = await userController.createUser({
        firstName: 'Mateo',
        lastName: 'Díaz',
        email: 'mateo.diaz@correo.com',
    });

    const user2 = await userController.createUser({
        firstName: 'Santiago',
        lastName: 'Mejias',
        email: 'santiago.mejias@correo.com',
    });

    const user3 = await userController.createUser({
        firstName: 'Lucas',
        lastName: 'Rojas',
        email: 'lucas.rojas@correo.com',
    });

    const user4 = await userController.createUser({
        firstName: 'Facundo',
        lastName: 'Fernández',
        email: 'facundo.fernandez@correo.com',
    });

    // Crear y guardar un nuevo Bootcamp
    const bootcamp1 = await bootcampController.createBootcamp({
        title: 'Introduciendo El Bootcamp De React',
        cue: 10,
        description: "React es la librería más usada en JavaScript para el desarrollo de interfaces",
    });

    const bootcamp2 = await bootcampController.createBootcamp({
        title: 'Bootcamp Desarrollo Web Full Stack',
        cue: 12,
        description: "Crearás aplicaciones web utilizando las tecnologías y lenguajes más actuales y populares como JavaScript, nodeJS, Angular, MongoDB, ExpressJS",
    });

    const bootcamp3 = await bootcampController.createBootcamp({
        title: 'Bootcamp Big Data, Inteligencia Artificial & Machine Learning',
        cue: 12,
        description: "Domina Data Science todo el ecosistema de lenguajes y herramientas de Big Data e intégralos con modelos avanzados de Artificial Intelligence y Machine Learning",
    });

    // Agregar Usuarios a los Bootcamps
    await bootcampController.addUser(bootcamp1.id, user1.id);
    await bootcampController.addUser(bootcamp1.id, user2.id);
    await bootcampController.addUser(bootcamp2.id, user1.id);
    await bootcampController.addUser(bootcamp3.id, user1.id);
    await bootcampController.addUser(bootcamp3.id, user2.id);
    await bootcampController.addUser(bootcamp3.id, user3.id);

    // Obtener los Bootcamp por id
    const _bootcamp1 = await bootcampController.findById(bootcamp1.id);
    console.log(" Bootcamp  ", JSON.stringify(_bootcamp1, null, 2));

    // Obtener todos los Usuarios incluyendo los Bootcamp
    const bootcamps = await bootcampController.findAll();
    console.log(" Bootcamps: ", JSON.stringify(bootcamps, null, 2));

    // Obtener los Bootcamp de un usuario
    const _user = await userController.findUserById(user1.id);
    console.log(" user1: ", JSON.stringify(_user, null, 2));

    // Obtener todos los Usuarios incluyendo los Bootcamp
    const users = await userController.findAll();
    console.log(">> usuarios: ", JSON.stringify(users, null, 2));

    // Actualizar usuario por Id
    const user = await userController.updateUserById(user1.id, "Pedro", "Sánchez");
    const _user1 = await userController.findUserById(user1.id);
    console.log(" user1: ", JSON.stringify(_user1, null, 2));

    //Eliminar un usuario por id
    const duser1 = await userController.deleteUserById(user1.id);
    console.log(duser1);
}
db_rel.sequelize.sync({
    force: true
  }).then(() => {
    console.log('Eliminando y resincronizando la base de datos.')
    run();
  });
