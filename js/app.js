import NotesAPI from "./NotesAPI.js";
import NotesView from "./NotesView.js";



export default class App {
    constructor(root){
        this.notes = [];
        this.activeNote = null;
        this.view = new NotesView(root, this.__handlers());

        this.__refreshNotes();

    }

    __refreshNotes() {
        const notes = NotesAPI.getAllNotes();
        this.__setNotes(notes);
        if(notes.length > 0) {
            this.__setActiveNote(notes[0]);
        }
    }

    __setNotes(notes) {
       this.notes = notes;

       this.view.updateNoteList(notes);
       this.view.updateNotePreviewVisibility(notes.length > 0);
    }
    __setActiveNote(note) {
        this.activeNote = note;
        this.view.updateActiveNote(note);
    }
    __handlers() {
        return {
           onNoteSelect : noteId => {
              const selectNote = this.notes.find(note => note.id == noteId);
              this.__setActiveNote(selectNote);
           },

           onNoteAdd : () => {
            const newNote = {
                title: 'New note',
                body: 'Take note ..'
            }
            NotesAPI.saveNote(newNote);
            this.__refreshNotes();
 
          },
          onNoteEdit :(title,body) => {
              NotesAPI.saveNote({
                id : this.activeNote.id,
                title,
                body
              });
              this.__refreshNotes();
         },
          onNoteDelete : noteId => {
               NotesAPI.deleteNotes(noteId);
               this.__refreshNotes();
          }
  
        };
    }
}