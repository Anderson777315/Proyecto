module.exports = (sequelize, Sequelize) => {
    const Curso = sequelize.define("curso", {
        id_curso: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
        },
        nombre: {
        type: Sequelize.STRING  
        },
        codigo: {
        type: Sequelize.INTEGER
        },
        semestre: {
        type: Sequelize.STRING
        },
        creditos: {
        type: Sequelize.INTEGER
        },
        estado_curso: {
        type: Sequelize.ENUM("activo", "inactivo")
        },
        catedraticoCod: {
        type: Sequelize.INTEGER,
        references: {
            model: 'catedraticos',
            key: 'id_catedratico'
        }
        }
    });
    
    return Curso;
}