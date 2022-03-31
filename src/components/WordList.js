import { useState, useEffect } from "react";
import WordItem from "./WordItem";
import { Button } from "react-bootstrap";

const WordList = (props) => {
  const { datamuseResults, wordInput, isRhyme } = props;
  const [savedWordList, setSavedWordList] = useState([]);
  const [groupedWordList, setGroupedWordList] = useState([]);

  // console.log("saved", savedWordList, savedWordList.length);
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
    const resultList = [];
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

  // groupBy(datamuseResults, "numSyllables");
  // setThrowaway(groupBy(datamuseResults, "numSyllables"));
  // console.log(typeof datamuseResults, datamuseResults);
  console.log(typeof groupedWordList, groupedWordList);

  const helper = () => {
    const resultsWithSyllables = [];
    for (const [key, value] of Object.entries(groupedWordList)) {
      resultsWithSyllables.push(<h3 key={key}>Syllables: {key}</h3>);

      // console.log("HELLO");

      for (const [wordKey, wordValue] of Object.entries(value)) {
        console.log(wordValue.word);
        // value.map((item, index) => {
        // resultsWithSyllables.push(wordValue.word);

        // return (
        //   <li key={index}>{item.word}</li>
        resultsWithSyllables.push(
          <WordItem
            key={wordKey}
            word={wordValue.word}
            setSavedWordList={setSavedWordList}
          />
        );

        // );
        // );
        // });
      }
    }
    return resultsWithSyllables;
  };

  // helper();

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
          <h2>Words with a meaning similar to {wordInput} </h2>
          <ul className="row">{helper()}</ul>
        </>
      ) : (
        <>
          <h2> Words that rhyme with: {wordInput}</h2>
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
