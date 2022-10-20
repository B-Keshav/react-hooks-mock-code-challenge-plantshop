import React, { useState } from "react";

function NewPlantForm({onPlantSubmit}) {
  //making form changes connected to state
  const [plantForm, setPlantForm] = useState({
    name: "",
    image: "",
    price: ""
  })

  function handleChange(e) {
    const { name, value } = e.target

    setPlantForm({ ...plantForm, [name]: value })
  }
  
  //adding the new plant to the plants db
  function handleSubmit(e){
    e.preventDefault()
    //making new object so I can turn the price to an integer
    const submitedPlant = {
      name: plantForm.name,
      image: plantForm.image,
      price: parseInt(plantForm.price)
    }
    fetch("http://localhost:6001/plants",{ 
      method : "POST",
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(submitedPlant)
    })
    .then(res => res.json())
    .then(data => onPlantSubmit(data))
    setPlantForm({
      name: "",
      image: "",
      price: ""
    })
  }

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Plant name" onChange={handleChange} value={plantForm.name}/>
        <input type="text" name="image" placeholder="Image URL" onChange={handleChange} value={plantForm.image}/>
        <input type="number" name="price" step="0.01" placeholder="Price" onChange={handleChange} value={plantForm.price}/>
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
