import { useEffect, useState, React } from "react";
import Modal from "react-modal";
import List from "./components/List";
import Form from "./components/Form";
import "./App.css";

Modal.setAppElement("#root");

function App() {
  const [titleInput, setTitleInput] = useState();
  const [noteInput, setNoteInput] = useState();
  const [formData, setFormData] = useState();
  const [notesArray, setNotesArray] = useState([]);
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [idSelected, setIdSelected] = useState();

  useEffect(() => {
    if (formData && formData["noteInput"]) {
      setIsFormComplete(true);
    } else {
      setIsFormComplete(false);
    }
  }, [formData]);

  useEffect(() => {
    const newFormData = {
      titleInput: titleInput,
      noteInput: noteInput,
    };

    setFormData(newFormData);
  }, [titleInput, noteInput]);

  useEffect(() => {
    console.log(idSelected);
  }, [idSelected]);

  useEffect(() => {
    if (notesArray) {
      console.log(notesArray);
    }
  }, [notesArray]);
  return (
    <div className="App">
      <Form
        titleInput={titleInput}
        setTitleInput={setTitleInput}
        setNotesArray={setNotesArray}
        noteInput={noteInput}
        setNoteInput={setNoteInput}
        formData={formData}
        setFormData={setFormData}
        isFormComplete={isFormComplete}
        setModalIsOpen={setModalIsOpen}
        parent="App"
      />
      <List
        notesArray={notesArray}
        setNotesArray={setNotesArray}
        setModalIsOpen={setModalIsOpen}
        modalIsOpen={modalIsOpen}
        idSelected={idSelected}
        setIdSelected={setIdSelected}
      />
      {/* <button onClick={() => setModalIsOpen(true)}>Open Modal</button> */}
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        {notesArray.map((item, index) => {
          if (item.id === idSelected) {
            return (
              <div>
                <Form
                  titleInput={titleInput}
                  setTitleInput={setTitleInput}
                  notesArray={notesArray}
                  setNotesArray={setNotesArray}
                  noteInput={noteInput}
                  setNoteInput={setNoteInput}
                  formData={formData}
                  setFormData={setFormData}
                  isFormComplete={isFormComplete}
                  idSelected={idSelected}
                  setModalIsOpen={setModalIsOpen}
                  parent="ModalList"
                />
                <h2>{item.titleInput}</h2>
                <p>{item.noteInput}</p>
                <div>
                  <button onClick={() => setModalIsOpen(false)}>Close</button>
                </div>
              </div>
            );
          }
        })}
      </Modal>
    </div>
  );
}

export default App;
