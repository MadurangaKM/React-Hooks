import React from "react";
import Loading from "./Loading";
import { useState, useEffect } from "react";

function Hooks() {
  const useFech = url => {
    const [isLoading, setLoading] = useState(false);
    const [character, setCharacter] = useState({ character: [] });
    const [isError, setIsError] = useState(false);

    useEffect(() => {
      setLoading(true);
      setIsError(false);

      fetch(url)
        .then(response => response.json())
        .then(
          data => {
            setLoading(false);
            setCharacter(data);
            console.log("data" + data);
          },
          error => {
            console.log(error);
            setIsError(true);
            setLoading(false);
          }
        );
    }, []);
    return { character, isLoading, isError };
  };

  const { character, isLoading, isError } = useFech(
    "https://swapi.co/api/people/1/"
  );

  if (isLoading === true) {
    return <Loading />;
  } else if (isError === true) {
    return <h1> API ERROR </h1>;
  } else {
    return <h1>{character.name} </h1>;
  }
}

export default Hooks;
