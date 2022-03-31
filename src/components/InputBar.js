import { useState, useRef } from "react";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { Button, InputGroup, FormControl } from "react-bootstrap";

const InputBar = (props) => {
  const { setWordInput, setDatamuseResults, wordInput, setIsRhyme } = props;
  const inputRef = useRef(null);

  const [synonymClicked, setSynonymClicked] = useState(false);
  const [rhymeClicked, setRhymeClicked] = useState(false);

  const [rhymeList, setRhymeList] = useState([]);

  const showRhymeList = (e) => {
    setIsRhyme(true);
    console.log("run");
    fetch(`https://api.datamuse.com/words?rel_rhy=${wordInput}`)
      .then((response) => {
        return response.json();
      })
      .then((json) => setDatamuseResults(Object.values(json)));

    console.log(inputRef.current.value);
    inputRef.current.value = "";

    // setWordInput("");
  };

  const showSynonymList = () => {
    setIsRhyme(false);

    fetch(`https://api.datamuse.com/words?ml=${wordInput}`)
      .then((response) => {
        return response.json();
      })
      .then((json) => setDatamuseResults(Object.values(json)));

    console.log(inputRef.current.value);
    inputRef.current.value = "";
    // setWordInput("");
  };

  return (
    <>
      <InputGroup size="sm" className="mb-3">
        <FormControl
          placeholder="Word"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          ref={inputRef}
          // value={inputRef.current.value}

          onChange={(e) => setWordInput(e.target.value)}
        />

        <Button variant="primary" onClick={() => showRhymeList()}>
          Show Rhymes
        </Button>
        <Button variant="secondary" onClick={() => showSynonymList()}>
          Show Synonyms
        </Button>
      </InputGroup>
      {/* <div className="input-bar-group">
        <input
          className="input-bar input"
          onChange={(e) => setWordInput(e.target.value)}
        ></input>

        <Button variant="primary" onClick={() => showRhymeList()}>
          Show Rhymes
        </Button>

        <Button variant="secondary" onClick={() => showSynonymList()}>
          Show Synonyms
        </Button>
      </div> */}
    </>
  );
};

// const showSynonymList = (e) => {
// setSynonymClicked(true);
// console.log(inputWord, "syn");
// getSynonyms(inputWord);
// };

// const getRhymes = (word) => {
//   const url = getDatamuseRhymeUrl(word);
//   datamuseRequest(url, (result) => {
//     setRhymeList(result);
//   });
// };

// const showRhymeList = (e) => {
// setRhymeClicked(true);
// setDatamuseResults(inputWord);
// setInputWord()
// getRhymes(inputWord);
// console.log(rhymeList);
// console.log(inputWord, datamuseResults);
// };
// const showRhymeList = (e) => {
//   setRhymeClicked(true);
//   console.log(inputWord, "rhyme");

//   setRhymeList(() => getRhymes(inputWord));

//   console.log("rhyme list", rhymeList);
// };

// const getRhymes = (rhymeWord) => {
//   const url = getDatamuseRhymeUrl(rhymeWord);
//   console.log(url);

//   datamuseRequest(url, (result) => {
//     if (result.length == 0) {
//       return "no";
//     } else {
//       // console.log(result, typeof result);
//       // return result;
//       console.log(result);
//     }
//   });
// };

export default InputBar;
