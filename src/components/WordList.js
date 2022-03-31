import { useState, useEffect } from "react";
import WordItem from "./WordItem";
import { Button } from "react-bootstrap";

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
    console.log(result);
    return result;
  };

  useEffect(() => {
    console.log("fired");
    setGroupedWordList(groupBy(datamuseResults, "numSyllables"));
  }, [datamuseResults]);

  const helper = () => {
    const resultsWithSyllables = [];
    console.log("initial helper", resultsWithSyllables);
    for (const [key, value] of Object.entries(groupedWordList)) {
      resultsWithSyllables.push(<h3 key={key}>Syllables: {key}</h3>);

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
                // {groupedWordList[word]["word"]}
              />
            ))}
          </ul>
        </>
      )}
    </main>
  );
};

export default WordList;

{
  /* return 

((<h2>Words with a meaning similar to {wordInput} </h2>),
((<h2> Words that rhyme with: {wordInput}</h2>),

                <WordItem
                  key={index}
                  word={item.word}
                  setSavedWordList={setSavedWordList}
                />;
          } 
  
              {Object.keys(groupedWordList).map((word, value) => {
              <WordItem
                key={value}
                word={groupedWordList[word]["word"]}
                setSavedWordList={setSavedWordList}
              />;
            })}

  {Object.keys(groupedWordList).map((lists) => {
            return groupedWordList[lists].map((words, index) => {
              console.log(words);
              {
                <WordItem
                  key={index}
                  word={words["word"]}
                  setSavedWordList={setSavedWordList}
                />;
              }
            });
          })} */
}
