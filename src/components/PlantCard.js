import React, { useState } from "react";

function PlantCard({ plant, handleDelete, handlePriceEdit }) {
  //destructring the plant object for ease of use
  const { name, image, price, id } = plant

  //adding stock button fucntionality
  const [stock, setStock] = useState(true)

  function handleClick() {
    setStock(!stock)
  }

  //adding edit price functionality
  const [edit, setEdit] = useState(false)
  const [newPrice, setNewPrice] = useState(price)
  function onEditClick() {
    setEdit(!edit)
  }
  function hanldePriceChange(e) {
    setNewPrice(e.target.value)
  }
  function onPriceChangeSubmit(e) {
    e.preventDefault()
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        price: newPrice
      })
    })
      .then(res => res.json())
      .then(data => handlePriceEdit(data))

    setEdit(false)
  }


  //adding delete plant funcitonality
  function onDeleteClick() {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(() => handleDelete(plant))
  }

  return (
    <li className="card">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: {price}</p>
      {stock ? (
        <button onClick={handleClick} className="primary">In Stock</button>
      ) : (
        <button onClick={handleClick}>Out of Stock</button>
      )}
      <br />
      <button onClick={onEditClick} className={edit? null : "primary"}>Edit Price</button>
      {edit ? (
        <form onSubmit={onPriceChangeSubmit}>
          <input
            type="number"
            name="price"
            step="0.01"
            placeholder="Price"
            onChange={hanldePriceChange}
            value={newPrice}
          />
          <button className="primary">Submit</button>
        </form>
      ) : (
        null
      )}
      <br />
      <button onClick={onDeleteClick}>🗑️</button>
    </li>
  );
}

export default PlantCard;
