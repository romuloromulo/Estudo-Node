class NoteImplementedException extends Error {
  constructor() {
    super("Note Implemented Exception");
  }
}

class ICrud {
  create(item) {
    throw new NoteImplementedException();
  }

  read(query) {
    throw new NoteImplementedException();
  }

  update(id, item) {
    throw new NoteImplementedException();
  }

  delete(id) {
    throw new NoteImplementedException();
  }
}
