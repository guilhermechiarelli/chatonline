const User = require("../models/User");

class UserController {
  create(req, res) {
    return res.render("register");
  }

  async store(req, res) {
    const { email } = req.body;

    if (await User.findOne({ email })) {
      req.flash("error", "Esse usuário já existe!");
      return res.redirect("/register");
    }

    await User.create(req.body)
      .then(user => {
        req.flash("success", "Usuário cadastrado! Faça seu login!");
        return res.redirect("/");
      })
      .catch(err => {
        req.flash("error", `Erro: ${err}`);
        return res.redirect("/register");
      });
  }

  async update(req, res) {
    const { senha } = req.body;

    const user = await User.findById(req.params._id);

    if (!(await user.compareHash(senha))) {
      req.flash("error", "Senha incorreta!");
      return res.redirect("/app/profile");
    }

    await User.findByIdAndUpdate(req.params._id, req.body, {
      new: true
    })
      .then(user => {
        req.session.user = user;
        req.flash("success", "Suas informações foram alteradas!");
        return res.redirect("/app/profile");
      })
      .catch(err => {
        req.flash("error", err);
        return res.redirect("/app/profile");
      });
  }

  async delete(req, res) {
    await User.findByIdAndDelete(req.params._id);

    req.session.user = null;

    req.flash("error", "O usuário foi deletado com sucesso!");

    return res.redirect("/");
  }
}

module.exports = new UserController();
