module.exports = (sequelize, Sequelize) => {
    const Catedratico = sequelize.define("catedratico", {
        id_catedratico: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
        },
        nombre: {
        type: Sequelize.STRING
        },
        apellido: {
        type: Sequelize.STRING
        },
        email: {
        type: Sequelize.STRING
        },
        especialidad: {
        type: Sequelize.STRING  
        },
        telefono: {
        type: Sequelize.STRING
        },
        estado: {
    type: Sequelize.ENUM("activo", "inactivo", "suspendido"),
    allowNull: false,
    defaultValue: "activo"
},
        fecha_ingreso: {
    type: Sequelize.DATE,

}
 });
    
    return Catedratico;
}