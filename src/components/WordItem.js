import { Button } from "react-bootstrap";

const WordItem = (props) => {
  const { word, setSavedWordList } = props;

  const saveClickHandler = (e) => {
    setSavedWordList((arr) => [...arr, word]);
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
