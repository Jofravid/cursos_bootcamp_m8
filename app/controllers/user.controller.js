const {users} = require('../models');
const db_rel = require('../models');
const User = db_rel.users;
const Bootcamp = db_rel.bootcamps;

// 1. Crear y guardar usuarios llamado createUser.

exports.createUser = (user) => {
    return User.create({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
    })
        .then(user => {
            console.log(`>> Se ha creado el usuario: ${JSON.stringify(user, null, 4)}`)
            return user
        })
        .catch(err => {
            console.log(`>> Error al crear el usuario ${err}`)
        })
};

// 2. Obtener los Bootcamp de un usuario llamado findUserById.

exports.findUserById = (userId) => {
    return User.findByPk(userId, {
        include: [{
            model: Bootcamp,
            as: "bootcamps",
            attributes: ["id", "title"],
            through: {
                attributes: [],
            }
        },],
    })
        .then(users => {
            return users
        })
        .catch(err => {
            console.log(`>> Error mientras se encontraba los usuarios: ${err}`)
        })
};

// 3. Obtener todos los Usuarios incluyendo, los Bootcamp llamado findAll.

exports.findAll = () => {
    return User.findAll({
        include: [{
            model: Bootcamp,
            as: "bootcamps",
            attributes: ["id", "title"],
            through: {
                attributes: [],
            }
        },],
    }).then(users => {
        return users
    })
};

// 4. Actualizar usuario por Id llamado updateUserById.

exports.updateUserById = (userId, fName, lName) => {
    return User.update({
        firstName: fName,
        lastName: lName
    }, {
        where: {
            id: userId
        }
    })
        .then(user => {
            console.log(`>> Se ha actualizado el usuario: ${JSON.stringify(user, null, 4)}`)
            return user
        })
        .catch(err => {
            console.log(`>> Error mientras se actualizaba el usuario: ${err}`)
        })
};

// 5. Eliminar un usuario por Id llamado deleteUserById.

exports.deleteUserById = (userId) => {
    return User.destroy({
        where: {
            id: userId
        }
    })
        .then(user => {
            console.log(`>> Se ha eliminado el usuario: ${JSON.stringify(user, null, 4)}`)
            return user
        })
        .catch(err => {
            console.log(`>> Error mientras se eliminaba el usuario: ${err}`)
        })
};