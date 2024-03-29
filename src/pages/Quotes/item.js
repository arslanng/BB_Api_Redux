import React from "react";
import { Link } from "react-router-dom";

function Item({ item }) {
  return (
    <div className="quote_item">
      <Link to={`/quotes/${item._id}`}>
        <q>{item.content}</q>
      </Link>{" "}{" "}
      <strong>{item.author}</strong>
    </div>
  );
}

export default Item;
