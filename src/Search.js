import React, { useState, useEffect, useContext } from "react";
import ThemeContext from "./ThemeContext";
import Result from "./Result";
import useBreedList from "./useBreedList";
// if state never changes then we can use a hook called ref
// to derive one state from other we can use a memo

const animals = ["bird", "cat", "dog", "rat", "reptile"];
// Object.freeze- to make sure that it does not change
const Search = () => {
  const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [pets, setPets] = useState([]);
  const [breeds] = useBreedList(animal);
  const [theme, setTheme] = useContext(ThemeContext);

  useEffect(() => {
    requestPets();
  }, []); //esline-disable-line react=hooks/exhaustive-deps

  const requestPets = async () => {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );
    const json = await res.json();
    setPets(json.pets);
  };

  //   const locationTuple = useState("New Delhi,India");
  //   const location = locationTuple[0];
  //   const setLocation = locationTuple[1];
  return (
    <div className="my-0 mx-auto w-11/12 ">
      <form
        className="p-10 mb-10 bg-gray-200 shadow-lg flex flex-col justify-center items-center divide-y divide-gray-900 "
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location" className="search-label">
          Location
          <input
            className="search-control"
            type="text"
            id="location"
            value={location.toUpperCase()}
            placeholder="Location"
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <label htmlFor="animal" className="search-label">
          Animal
          <select
            className="search-control"
            value={animal}
            id="animal"
            onChange={(e) => setAnimal(e.target.value)}
            onBlur={(e) => setAnimal(e.target.value)}
          >
            <option />
            {animals.map((animal) => (
              <option value={animal} key={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed" className="search-label">
          Breed
          <select
            className="search-control disabled:opacity-50"
            value={breed}
            id="breed"
            onChange={(e) => setBreed(e.target.value)}
            onBlur={(e) => setBreed(e.target.value)}
          >
            <option />
            {breeds.map((breed) => (
              <option value={breed} key={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="theme" className="search-label">
          Theme
          <select
            className="search-control"
            name=""
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            onBlur={(e) => setTheme(e.target.value)}
            id=""
          >
            <option value="darkblue">Dark Blue</option>
            <option value="peru">Peru</option>
            <option value="chartreuse">Chartreuse</option>
            <option value="mediumorchid">Medium Orchid</option>
          </select>
        </label>
        <button
          className="rounded px-6 py-2 mt-2 text-white hover:opacity-50 border-none"
          style={{ backgroundColor: theme }}
        >
          Submit
        </button>
      </form>
      <Result pets={pets} />
    </div>
  );
};

export default Search;
