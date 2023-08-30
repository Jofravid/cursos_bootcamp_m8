const { DataTypes: dt } = require('sequelize');

// Definimos la estructura de la tabla bootcamps
module.exports = (sequelize, dt) => {
    const Bootcamp = sequelize.define('bootcamp', {
        title: {
            type: dt.STRING,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "El campo nombre (title) es requerido"
                },
            },
        },
        cue: {
            type: dt.INTEGER,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Números de CUE es necesario, minimo 5 y máximo 20"
                },
                isInt: {
                    args: true,
                    msg: "Debes introducir un número entero"
                },
                max: 20,
                min: 5,
            },
        },
        description: {
            type: dt.STRING,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Se debe introducir una descripción"
                },
            },
        }

    });
    return Bootcamp
};