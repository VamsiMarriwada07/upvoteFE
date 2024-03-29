import React from "react";
import { ArrowBigUp } from 'lucide-react';

const ItemCards = ({ item,handleUpvote,handleDownvote}) => {
  console.log(item,"fly");
  // Assuming item is an object with a property 'item' containing the array of items
  const ids = item.id
  const itemName = item.name
  const vote = item.votes
  const cond = item.cond
  return (
    <div key={ids} className="flex flex-row border-[1px] mb-5 rounded-[10px] border-black w-[720px] h-14 items-center justify-center hover:border-green-600 hover:border-[3px] hover:shadow-xl ease-out duration-40">
      <div className="flex justify-center w-3/5">{itemName}</div>
      <div className="text-center w-1/5">{vote}</div>
      {cond !== 0 && <div className="flex justify-center w-1/5 text-green-600 cursor-pointer duration-150"onClick={() => handleDownvote(itemName)}><ArrowBigUp/></div>}
      {!cond && 
      <div className="flex justify-center w-1/5 hover:text-green-600 cursor-pointer duration-150" onClick={() => handleUpvote(ids,itemName)}><ArrowBigUp/></div>}
    </div>
  );
};

export default ItemCards;
