import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  /**************** useParams and new color ********************************************************/
  const { id } = useParams();
  const [ newColor, setNewColor ] = useState(initialColor)

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`/colors/${id}`, colorToEdit)
      .then( res => {
        console.log("colorlist res data", res.data)
        const newColors = colors.filter(color => {
          if(color.id !== id) {
            return color
          }
        })
        updateColors([...newColors, res.data]);
        setEditing(false);
        setColorToEdit(initialColor);
      })
      .catch( err => console.log('error editing colorlist ', err))
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`/colors/${color.id}`)
      .then( res => {
        const newColors = colors.filter((color) => {
          if(color.id !== res.data) {
            return color
          }
        });
        updateColors(newColors)
      })
      .catch( err => console.log('error deleting color', err))
  };

  const submitNewColor = e => {
    e.preventDefault();
    axiosWithAuth()
    .post(`/colors`, newColor)
    .then(res => {
      updateColors(res.data)
      setNewColor(initialColor)
    })
    .catch(err => console.log('error posting new color',err))
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
     <form onSubmit={submitNewColor}>
       <label htmlFor='colorName'>Color:</label>
       <input 
        type="text"
        name="color"
        value={newColor.color}
        onChange={(e) => {
          setNewColor({
            ...newColor,
          color: e.target.value})
        }}
        />

        <label htmlFor="hex">Hex Code</label>
        <input 
          type="text"
          name="hex"
          value={newColor.code.hex}
          onChange={( e ) => {
            setNewColor({
               ...newColor,
            code: { hex: e.target.value}
          })
          }}
        />

        <button>Add a new color</button>

     </form>
     </div>
  );
};

export default ColorList;
