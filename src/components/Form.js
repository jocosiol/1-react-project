import { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import "../App.css";
import { v4 as uuidv4 } from "uuid";
import { compareAsc, format } from "date-fns";
import id from "date-fns/locale/id/index.js";
import { set } from "date-fns/esm";

function Form(props) {
  const {
    titleInput,
    setTitleInput,
    notesArray,
    setNotesArray,
    noteInput,
    setNoteInput,
    formData,
    setFormData,
    isFormComplete,
    idSelected,
    setModalIsOpen,
    parent,
  } = props;

  const [selectedTitle, setElectedTitle] = useState();
  const [selectedNote, setElectedNote] = useState();
  const [isEditing, setIsEditing] = useState(false);

  const handleChangeTitle = (e) => {
    setTitleInput(e.target.value);
    if (parent === "ModalList") {
      setElectedTitle(e.target.value);
    }
  };

  useEffect(() => {
    console.log(selectedTitle);
  },[selectedTitle])

  const handleChangeNote = (e) => {
    setNoteInput(e.target.value);
    if (parent === "ModalList") {
      console.log(selectedNote);
      setElectedNote(e.target.value);
    }
  };

  const handleEdit = (e) => {
    console.log("edit", e.target.value, selectedTitle, selectedNote);
    setIsEditing(e.target.value);
    const cleanArray = notesArray.filter((item) => {
      return item.id !== e.target.value;
    });
    setNotesArray(cleanArray);
    const newArray = notesArray.filter((item) => {
      return item.id === e.target.value;
    });
    const newObj = Object.assign({}, ...newArray);

    console.log(newObj);

    const index = newArray.indexOf(e.target.value);

    console.log(index);
    if (index===-1) {
      newObj["createdDate"] = format(new Date(), "dd-MM-yyyy HH:mm");
      newObj["titleInput"] = selectedTitle;
      newObj["noteInput"] = selectedNote;
      setModalIsOpen(false);
    }
    console.log(newObj);

    setNotesArray((prevState) => {
      return [newObj, ...prevState];
    });

  };

  const handleSubmit = () => {
    const finalData = formData;
    finalData["createdDate"] = format(new Date(), "dd-MM-yyyy HH:mm");

    if (parent === "App") {
      finalData["id"] = uuidv4();
    }

    if (parent === "List") {
      finalData["id"] = formData["id"];
    }

    if (parent === "ModalList") {
      // I have to loop to find the id!!
      finalData["id"] = uuidv4();
      finalData["createdDate"] = format(new Date(), "dd-MM-yyyy HH:mm");
      finalData["titleInput"] = selectedTitle;
      finalData["noteInput"] = selectedNote;
      setModalIsOpen(false);
    }

    setNotesArray((prevState) => {
      return [finalData, ...prevState];
    });
    setTitleInput("");
    setNoteInput("");
    setFormData({});
  };

  if (parent == "App") {
    return (
      <div className="form-wrapper">
        {/* Form */}
        <input
          onChange={handleChangeTitle}
          type="text"
          placeholder="Title"
          value={titleInput}
        />
        <textarea
          onChange={handleChangeNote}
          type="text"
          placeholder="Your note..."
          value={noteInput}
        />

        <button
          disabled={!isFormComplete}
          className={`submit-button-${!isFormComplete}`}
          onClick={handleSubmit}
        >
          Add
        </button>
      </div>
    );
  } else if (parent == "ModalList") {
    return (
      <div>
        {/* Form */}
        {notesArray.map((item) => {
          if (item.id === idSelected) {
            return (
              <div className="form-wrapper">
                <input
                  onChange={handleChangeTitle}
                  type="text"
                  defaultValue={item.titleInput}
                />
                <textarea onChange={handleChangeNote}>
                  {item.noteInput}
                </textarea>
                <button
                  disabled={!isFormComplete}
                  value={item.id}
                  className={`submit-button-${!isFormComplete}`}
                  onClick={handleEdit}
                >
                  Edit
                </button>
              </div>
            );
          }
        })}
      </div>
    );
  }
}

export default Form;
