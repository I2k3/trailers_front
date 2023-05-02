import firebase from "../firebase";

const db = firebase.collection("/trailers");

class TrailerDataService {
  getAll() {
    return db;
  }

  create(trailer) {
    return db.add(trailer);
  }

  update(id, value) {
    return db.doc(id).update(value);
  }

  delete(id) {
    return db.doc(id).delete();
  }
}

const starsDataService = new TrailerDataService();

export default starsDataService;