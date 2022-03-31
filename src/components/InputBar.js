import { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, InputGroup, FormControl } from "react-bootstrap";

const InputBar = (props) => {
  const { setWordInput, setDatamuseResults, wordInput, setIsRhyme } = props;
  const inputRef = useRef(null);

  const showRhymeList = (e) => {
    setDatamuseResults([]);
    setIsRhyme(true);

    fetch(`https://api.datamuse.com/words?rel_rhy=${wordInput}`)
      .then((response) => {
        return response.json();
      })
      .then((json) => setDatamuseResults(Object.values(json)));

    inputRef.current.value = "";
  };

  const showSynonymList = () => {
    setDatamuseResults([]);
    setIsRhyme(false);

    fetch(`https://api.datamuse.com/words?ml=${wordInput}`)
      .then((response) => {
        return response.json();
      })
      .then((json) => setDatamuseResults(Object.values(json)));

    inputRef.current.value = "";
  };

  return (
    <>
      <InputGroup size="sm" className="mb-3">
        <FormControl
          placeholder="Word"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          ref={inputRef}
          onChange={(e) => setWordInput(e.target.value)}
        />

        <Button variant="primary" onClick={() => showRhymeList()}>
          Show Rhymes
        </Button>
        <Button variant="secondary" onClick={() => showSynonymList()}>
          Show Synonyms
        </Button>
      </InputGroup>
    </>
  );
};

export default InputBar;
