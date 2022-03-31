import { useState, useEffect } from "react";
import WordItem from "./WordItem";

const WordList = (props) => {
  const { datamuseResults, wordInput, isRhyme } = props;
  const [savedWordList, setSavedWordList] = useState([]);
  const [groupedWordList, setGroupedWordList] = useState([]);

  const groupBy = (objects, property) => {
    if (typeof property !== "function") {
      const propName = property;
      property = (obj) => obj[propName];
    }

    const groupedObjects = new Map();
    for (const object of objects) {
      const groupName = property(object);

      if (!groupedObjects.has(groupName)) {
        groupedObjects.set(groupName, []);
      }
      groupedObjects.get(groupName).push(object);
    }

    const result = {};
    for (const key of Array.from(groupedObjects.keys()).sort()) {
      result[key] = groupedObjects.get(key);
    }
    return result;
  };

  useEffect(() => {
    setGroupedWordList(groupBy(datamuseResults, "numSyllables"));
  }, [datamuseResults]);

  // Joe (GSI) helped me out with this function
  const helper = () => {
    const resultsWithSyllables = [];
    for (const [key, value] of Object.entries(groupedWordList)) {
      resultsWithSyllables.push(<h3>Syllables: {key}</h3>);

      for (const [wordKey, wordValue] of Object.entries(value)) {
        resultsWithSyllables.push(
          <WordItem
            key={wordKey}
            word={wordValue.word}
            setSavedWordList={setSavedWordList}
          />
        );
      }
    }
    return resultsWithSyllables;
  };

  return (
    <main className="container">
      {savedWordList.length == 0 ? (
        <p>Saved Words: None</p>
      ) : (
        <>
          <p>Saved Words: {savedWordList.join(", ")}</p>
        </>
      )}
      {isRhyme ? (
        <>
          <h2> Words that rhyme with: {wordInput}</h2>
          <ul className="row">{helper()}</ul>
        </>
      ) : (
        <>
          <h2>Words with a meaning similar to {wordInput} </h2>
          <ul className="row">
            {datamuseResults.map((words, index) => (
              <WordItem
                key={index}
                word={words["word"]}
                setSavedWordList={setSavedWordList}
              />
            ))}
          </ul>
        </>
      )}
    </main>
  );
};

export default WordList;
