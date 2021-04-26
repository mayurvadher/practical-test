import React from 'react';

function List({ data, ...props }) {
  const handleClick = (event) => {
    props.onServiceSelect(event.target.value);
  };

  return data?.map((item) => (
    <>
      <input type="radio" value={item.key} name="list" key={item.key.toString()} onClick={handleClick} />
      {item.value}
    </>
  ));
}

export default List;
