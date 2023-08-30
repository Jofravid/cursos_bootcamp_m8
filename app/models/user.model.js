const { DataTypes: dt } = require('sequelize');

// Definimos la estructura de la tabla users
module.exports = (sequelize, dt) => {
    const User = sequelize.define('users', {
        firstName: {
            type: dt.STRING,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "El Campo del nombre es requerido"
                },
            },
        },
        lastName: {
            type: dt.STRING,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "El Campo del apellido es requerido"
                },
            },
        },
        email: {
            type: dt.STRING,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "el correo electronico es requerido"
                },
                isEmail: {
                    args: true,
                    msg: 'Formato de correo invalido'
                }
            },
            unique: {
                args: true,
                msg: 'correo electronico actualmente registrado en la base de datos!'
            }

        }

    });
    return User
};
