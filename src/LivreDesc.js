export default class LivreDesc {
  constructor(id, titre, qtestock, prix) {
    this._id = id;
    this._titre = titre;
    this._qtestock = qtestock;
    this._prix = prix;
  }

  //setter
  set qtestock(qtestock) {
    this._qtestock = qtestock;
  }

  //getter
  get id() {
    return this._id;
  }
  get qtestock() {
    return this._qtestock;
  }
  get titre() {
    return this._titre;
  }
  get prix() {
    return this._prix;
  }
}
