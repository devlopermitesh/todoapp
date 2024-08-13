import React from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdOutlineCancel } from "react-icons/md";
import { MdAddBox } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
// Use default parameters in function signature
const ThemeIcons = ({ iconsname = '', iconClassName = '', className = '' }) => {
  const findIcons = () => {
    switch (iconsname) {
      case 'fasun':
        return <FaSun className={iconClassName} />;
        case 'famoon':
            return <FaMoon className={iconClassName} />;
            case 'famenu':
                return <HiOutlineDotsVertical className={iconClassName} />;
                
            case 'facancel':
                return <MdOutlineCancel className={iconClassName} />;
                case "Taskplus":
                    return <MdAddBox className='text-xl my-auto ml-1' />;
                    case 'faEdit':
                      return <FaPencilAlt className={iconClassName} />;
                      case 'faDelete':
                        return <RiDeleteBin6Fill className={iconClassName} />;
      default:
        return null;
    }
  };

  return (
    <i className={className}>
      {findIcons()}
    </i>
  );
};

export default ThemeIcons;
