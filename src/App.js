import logo from "./logo.svg";
import "./App.css";
import InputBar from "./components/InputBar";
import WordList from "./components/WordList";
import { useState, useEffect } from "react";

function App() {
  const [datamuseResults, setDatamuseResults] = useState([]);
  const [wordInput, setWordInput] = useState("");
  const [savedWordList, setSavedWordList] = useState([]);
  const [isRhyme, setIsRhyme] = useState(false);

  // const [url, setUrl] = useState("");

  // useEffect(() => {
  //   fetch("https://api.datamuse.com/words?rel_rhy=hello")
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((json) => setDatamuseResults(Object.values(json)));
  // }, []);

  // console.log("datamuse", datamuseResults);
  // console.log("input", wordInput);
  // console.log(isRhymeListShown);

  return (
    <div className="App">
      <main>
        <h1>Rhyme List React</h1>

        <InputBar
          setWordInput={setWordInput}
          setDatamuseResults={setDatamuseResults}
          wordInput={wordInput}
          setIsRhyme={setIsRhyme}
        />

        <WordList
          datamuseResults={datamuseResults}
          wordInput={wordInput}
          isRhyme={isRhyme}
        />
      </main>
    </div>
  );
}

export default App;
