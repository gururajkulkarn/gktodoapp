import React, { useState, useEffect } from "react";
import "./style.css";
import todo from '../Images/todo.png';
// import pic from '../Images/pic.jpg';

// get the localStorage data back
const getLocalData = () => {
  const lists = localStorage.getItem("mytodolist");

  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputdata, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);

  // add the items fucnction
  const addItem = () => {
    if (!inputdata) {
      alert("Please Add Your Todo ✍");
    } else if (inputdata && toggleButton) {
      setItems(
        items.map((curElem) => {
          if (curElem.id === isEditItem) {
            return { ...curElem, name: inputdata };
          }
          return curElem;
        })
      );

      setInputData("");
      setIsEditItem(null);
      setToggleButton(false);
    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputdata,
      };
      setItems([...items, myNewInputData]);
      setInputData("");
    }
  };

  //edit the items
  const editItem = (index) => {
    const item_todo_edited = items.find((curElem) => {
      return curElem.id === index;
    });
    setInputData(item_todo_edited.name);
    setIsEditItem(index);
    setToggleButton(true);
  };

  // how to delete items section
  const deleteItem = (index) => {
    const updatedItems = items.filter((curElem) => {
      return curElem.id !== index;
    });
    setItems(updatedItems);
  };

  // remove all the elements
  const removeAll = () => {
    setItems([]);
  
  };

  // adding localStorage
  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(items));
  }, [items]);

  return (
    <>
     <div className="main-div">
        <div className="container">
          <figure>
             <img src={todo} alt="todologo" style={{width:"320px",height:"150px",marginLeft:"70px",marginTop:"50px"}} />
             {/* <img src={pic} alt="todologo" style={{width:"140px",height:"140px"}} /> */}

            {/* <h1 style={{fontSize:"50px",color:"black",marginLeft:"100px",marginTop:"30px"}}>Todo App</h1> */}

          </figure>
          <div className="addItems">
            <input
              type="text" maxLength={50}
              placeholder="✍ "
              
              value={inputdata} style={{color:"black",border:"2px solid black",fontSize:"30px",textTransform:"uppercase",}}
              onChange={(event) => setInputData(event.target.value)}
            /><br/>
          
            {toggleButton ? (
              <i className="far fa-edit add-btn" onClick={addItem} style={{fontSize:"40px",marginLeft:'220px'}}></i>
            ) : (
              <i className="fa fa-plus add-btn" onClick={addItem} style={{fontSize:"20px",borderRadius:"15px",backgroundColor:"green",border:"2px solid black",marginTop:"20px",color:"black"}}></i>
              // <button className="btn btn-primary">Add Item</button>
            )}
          </div>
          {/* show our items  */}
          <div className="showItems">
            {items.map((curElem) => {
              return (
                <div className="container">
                <div className="eachItem" key={curElem.id} style={{textTransform:"uppercase"}}>
                  <h2 style={{marginTop:"10px",marginLeft:"-10px",textDecoration:"justify"}}>{curElem.name}</h2>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn" style={{fontSize:"30px",marginTop:'60px',marginRight:'8px',marginLeft:"-30px"}}
                      onClick={() => editItem(curElem.id)}></i>
                    <i
                      className="far fa-trash-alt add-btn"  style={{fontSize:"30px",marginTop:'60px',marginLeft:"10px"}}
                      onClick={() => deleteItem(curElem.id)}></i>
                  </div>
                </div><br/>
                </div>
              );
            })}
          </div>


          {/* rmeove all button  */}
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All" style={{backgroundColor:"#f27408",marginBottom:"50px"}}
              onClick={removeAll}>
              <span style={{color:"black",fontSize:"20px", fontFamily:"fantasy"}}> Remove All</span>
            </button>
          </div>



          <span style={{fontSize:"15px",fontWeight:"bold",color:"white"}}> © 2022copyright with  Gururaj Kulkarni <br/>https://gururajkulkarn.github.io/gururajkulkarni</span>
        </div>
      </div>

    </>
  );
};

export default Todo;