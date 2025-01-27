const mongoose = require("mongoose");

const socket = (io) => {
  io.on("connection", (socket) => {
    /* VIDEOCALL*/
    socket.emit("me", socket.id);
    socket.on("disconnect", () => {
      socket.broadcast.emit("callEnded");
    });
    socket.on("callUser", (data) => {
      io.to(data.userToCall).emit("callUser", {
        signal: data.signalData,
        from: data.from,
        name: data.name,
      });
    });
    socket.on("answerCall", (data) => {
      io.to(data.to).emit("callAccepted", {
        signal: data.signal,
        name: data.userName,
      });
    });

    socket.on("rejectCall", (data) => {
      const { to } = data;
      io.to(to).emit("callRejected", { from: socket.id });
    });
    /*END VIDEOCALL*/

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
            avatar: { type: String },
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
          avatar: msg.avatar,
        });
      } catch (e) {
        console.log("error en creates");
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
