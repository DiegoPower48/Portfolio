const mongoose = require("mongoose");

const socket = (io) => {
  io.on("connection", (socket) => {
    const room = socket.handshake.query.room;
    console.log("un usuario se ha conectado");

    const schemaName = `Item${room}`;
    const collectionName = `ROOM: ${room}`;

    // Verificar si el modelo ya existe
    const Item =
      mongoose.models[schemaName] ||
      mongoose.model(
        schemaName,
        new mongoose.Schema(
          {
            nombre: { type: String },
            comentario: { type: String },
            hora: { type: String },
            fecha: { type: String },
            avatar: { type: String }
          },
          { collection: collectionName }
        )
      );

    socket.on("disconnect", () => {
      console.log("un usuario se ha desconectado");
    });
    socket.on(`chat${room}`, async (msg) => {
      try {
        await Item.create({
          nombre: msg.nombre,
          comentario: msg.comentario,
          hora: msg.hora,
          fecha: msg.fecha,
          avatar: msg.avatar
        });
      } catch (e) {
        console.log("error en create");
      }
      socket.broadcast.emit(`chat${room}`, msg);
    });
    if (!socket.recovered) {
      try {
        Item.find({}).then((recuperado) => {
          recuperado.map((message) => {
            socket.emit(`chat${room}`, message);
          });
        });
      } catch (e) {
        console.log(e);
      }
    }
  });
};

module.exports = socket;
