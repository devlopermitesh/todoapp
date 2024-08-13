import React from 'react';
import { RiTodoLine } from "react-icons/ri";
import { MdOutlineAccessTime } from "react-icons/md";
import { TbCategoryFilled } from "react-icons/tb";
const Input = ({ list,inputype,icons, inputname, inputplaceholder, inputclass, iconFirst = true, ...rest}) => {
  const renderIcon = () => {
    switch (icons) {
      case "Taskinput":
        return <RiTodoLine className='text-xl my-auto ml-1' />;
        case "Tasktime":
        return <MdOutlineAccessTime className='text-xl my-auto ml-1' />;
        
        case "Taskcategory":
            return <TbCategoryFilled className='text-xl my-auto ml-1' />;
         
                
      default:
        return null;
    }
  };

  return (
    <div className="bg-[rgba(217,217,217,0.7)] h-auto w-auto rounded-md mt-3 flex">
      {iconFirst && renderIcon()}
      <input
      list={list}
      type={inputype}
        name={inputname}
        placeholder={inputplaceholder}
        className={`placeholder-gray-500 bg-transparent text-white ${inputclass} m-2  border-white hover:border-none focus:border-transparent focus:outline-none focus:ring-0`}
        {...rest}
      />
      {!iconFirst && renderIcon()}
    </div>
  );
};

export default Input;
