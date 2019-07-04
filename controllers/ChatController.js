const Chat = require("../models/Chat");
const User = require("../models/User");

class ChatController {
  async index(req, res) {
    const messages = await Chat.find();
    const emails = await User.find();

    req.io.sockets.on("connection", socket => {
      socket.removeAllListeners();

      socket.emit("previousMessages", messages);

      socket.on("sendMessage", async data => {
        const msg = await Chat.create(data);
        socket.broadcast.emit("receivedMessage", msg);
      });
    });

    return res.render("app/chat", { emails });
  }
}

module.exports = new ChatController();
