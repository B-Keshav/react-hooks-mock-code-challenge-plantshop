import React from "react";
import PlantCard from "./PlantCard";

function PlantList({plants, handleDelete, handlePriceEdit}) {
  //render each plant card using .map and PlantCard component 
  const renderedPlants = plants.map((plant) => {
    return <PlantCard key={plant.id} plant={plant} handleDelete={handleDelete} handlePriceEdit={handlePriceEdit}/>
  })
  
  return (
    <ul className="cards">{renderedPlants}</ul>
  );
}

export default PlantList;
