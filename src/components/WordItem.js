import { Button } from "react-bootstrap";
import { useState } from "react";

const WordItem = (props) => {
  const { word, setSavedWordList } = props;

  const saveClickHandler = (e) => {
    setSavedWordList((arr) => [...arr, word]);
    // console.log(savedWordList);
  };

  return (
    <>
      <li>
        {word}
        <Button variant="outline-success" onClick={saveClickHandler}>
          Save
        </Button>
      </li>
    </>
  );
};

export default WordItem;
