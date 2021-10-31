import { useState } from "react/cjs/react.development";
import "../App.css";
import Modal from "react-modal";

function List(props) {
  const [isEditing, setIsEditing] = useState(false);
  const {
    notesArray,
    setNotesArray,
    setModalIsOpen,
    modalIsOpen,
    idSelected,
    setIdSelected,
  } = props;

  const handleDelete = (e) => {
    let r = window.confirm("Are you sure you want to delete your note?");

    if (r === true) {
      const newArray = notesArray.filter((item) => {
        return item.id !== e.target.value;
      });
      setNotesArray(newArray);
      setModalIsOpen(false);
    }
  };

  const handleEdit = (e) => {
    console.log("edit");
    setIsEditing(e.target.value);
  };

  return (
    <div>
      {/* List */}
      {notesArray.map((item, index) => {
        function handleListClick() {
          setIdSelected(item.id);
          setModalIsOpen(true);
        }

        return (
          <div>
            <div key={item.id} onClick={() => handleListClick()}>
              {<small>{item.createdDate}</small>}
              {<h1>{item.titleInput}</h1>}
              {<p>{item.noteInput}</p>}
            </div>
            <div>
              <button value={item.id} onClick={handleDelete}>
                Delete
              </button>
              {/* EDIT BUTTON */}
              {/* <button value={item.id} onClick={handleEdit}>
                Edit
              </button> */}
            </div>
            {isEditing === item.id && (
              <div>
                <input type="text" value={item.titleInput} />
                <input type="text" value={item.noteInput} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default List;
