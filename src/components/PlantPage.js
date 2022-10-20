import React, { useEffect, useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  //using state for list of plants
  const [plantList, setPlantList] = useState([])
  //search State
  const [searchQuerry, setSearchQuerry] = useState("")

  //rendering plants when page loads
  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then(res => res.json())
      .then(data => setPlantList(data))
  }, [])

  //function for adding a new plant
  function onPlantSubmit(newPlant) {
    setPlantList([...plantList, newPlant])
  }

  //function for searching
  function onPlantSearch(search) {
    setSearchQuerry(search)
  }
  //filtering plant list based on search
  const filteredPlants = plantList.filter((plant) => {
    return plant.name.toLowerCase().includes(searchQuerry.toLowerCase())
  })

  //function for remvoing a plant and making it persist
  function handleDelete(deletedPlant) {
    const updatedPlants = plantList.filter((plant) => {
      return plant.id !== deletedPlant.id
    })
    setPlantList(updatedPlants)
  }

  //function for edditng plant price
  function handlePriceEdit(editedPlant) {
    const updatedPlants = plantList.map((plant) => {
      if (plant.id !== editedPlant.id) {
        return plant
      }
      else {
        return editedPlant
      }
    })
    setPlantList(updatedPlants)
  }

  return (
    <main>
      <NewPlantForm onPlantSubmit={onPlantSubmit} />
      <Search onPlantSearch={onPlantSearch} />
      <PlantList plants={filteredPlants} handleDelete={handleDelete} handlePriceEdit={handlePriceEdit}/>
    </main>
  );
}

export default PlantPage;
