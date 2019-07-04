const User = require("../models/User");

class SessionController {
  async login(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      req.flash("error", "Usuário não encontrado!");
      return res.redirect("/");
    }

    if (!(await user.compareHash(password))) {
      req.flash("error", "Senha incorreta!");
      return res.redirect("/");
    }

    req.session.user = user;
    return res.redirect("/app/chat");
  }

  logout(req, res) {
    req.session.destroy();
    res.clearCookie(process.env.SESS_NAME);
    return res.redirect("/");
  }
}

module.exports = new SessionController();
