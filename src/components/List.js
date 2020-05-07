import React from "react";

function List({ data }) {

  function showList(data) {
    let xhtml = "no data";
    if (data.length > 0) {
      xhtml = data.map((item, index) => {
        return <li key={index}>{item.name}</li>;
      });
    }
    return <ul>{xhtml}</ul>;
  }

  return (
        <div>
            { showList(data) }
        </div>
      )
}

export default List;
