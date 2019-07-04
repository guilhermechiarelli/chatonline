class IndexContoller {
  index(req, res) {
    return res.render("index");
  }

  profile(req, res) {
    return res.render("app/profile");
  }
}

module.exports = new IndexContoller();
