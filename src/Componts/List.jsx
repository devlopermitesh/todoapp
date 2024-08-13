import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeIcons from './ThemeIcons';
import ButtonWithContinuousRipple from './Plusbtn'; // Ensure this imports correctly
import AddtodoForm from './AddtodoForm';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask } from '../Store/Todoslice';
import { deleteTodo } from '../localSaver/Local';

const List = ({ filter }) => {
  const [previousFormData, setPreviousFormData] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(null); // Track the item with visible menu
  const menuRef = useRef(null); // Ref to detect clicks outside the menu
  const Ondark = useSelector((state) => state.todo.theme);
  const todo = useSelector((state) => state.todo.todolists);
  const dispatch = useDispatch();

  // Filter tasks based on the filter prop
  const filteredTodos = filter === 'All' ? todo : todo.filter(task => task.category === filter);
console.log(filteredTodos,filter)
  // a function for previousformdata
  const handleChange = (change) => {
    setPreviousFormData(change);
  };

  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuVisible(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleIconClick = (taskId) => {
    setMenuVisible(menuVisible === taskId ? null : taskId); // Toggle menu visibility for the clicked item
  };

  const handleMenuOptionClick = (option) => {
    // Handle menu option actions here
    console.log(`Selected option: ${option} for item ${menuVisible}`);

    if (option === 'Edit') {
      setIsFormVisible(true);
      todo.map((todo) => {
        if (todo.id === menuVisible) {
          setPreviousFormData(todo);
        }
      });
    } else {
      dispatch(deleteTask({ id: menuVisible }));
      deleteTodo(menuVisible);
    }
    setMenuVisible(null); // Hide the menu after selection
  };

  return (
    <div className={`relative w-full h-auto ${Ondark ? 'bg-gray-900' : 'bg-white'}`}>
      <ul className='flex flex-col items-start justify-center p-4'>
        {(filteredTodos.length<1)?
         (<>
     <li className='w-full h-64 flex justify-center items-center flex-col'>
<img
src={(Ondark)?"https://cdni.iconscout.com/illustration/premium/thumb/no-data-found-illustration-download-in-svg-png-gif-file-formats--paper-website-business-pack-illustrations-7438848.png?f=webp":'https://cdni.iconscout.com/illustration/premium/thumb/email-collaboration-5037986-4202467.png?f=webp'}
alt='image loding' 
height={100}
width={100}
className='w-96 h-80 rounded-sm mt-32'
></img>
<h1 className='text-2xl text-[#6B78BD] font-bold uppercase'>no task</h1>
<p className='capitalize text-2xl text-gray-500' style={{fontFamily:""}}>There is no pending task</p>
<div className='bg-[#6B78BD] rounded-md text-white capitalize px-2 py-2' onClick={() => setIsFormVisible(true)} >
  create a new task
      </div>

     </li>
         </>):""}
        {filteredTodos.map((task) => (
          <li
            key={task.id}
            className={`relative rounded-md shadow-sm h-10 font-bold w-[98%] my-3
              ${Ondark ? 'shadow-slate-200 bg-black text-white' : 'shadow-sky-400 bg-white text-black'} text-xl md:text-2xl lg:text-3xl`}
          >
            <input
              type="radio"
              value="check"
              checked={task.completed} 
              onChange={() => {}}
              className='h-4 w-4 mx-3'
            />
            {task.todotask}
            <sub className='text mr-10' style={{ fontSize: "10px" }}>{task.datetime}</sub>
            <button
              className='float-end my-2'
              onClick={() => handleIconClick(task.id)}
            >
              <ThemeIcons
                iconsname='famenu'
                iconClassName={`${Ondark ? 'text-gray-600' : 'text-gray-600'}`}
                className={`text-3xl ${Ondark ? 'text-white' : 'text-black'}`}
              />
            </button>
            <AnimatePresence>
              {menuVisible === task.id && (
                <motion.div
                  ref={menuRef}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className={`absolute z-50 right-0 top-12 bg-black border border-gray-300 rounded-md shadow-lg p-2
                    ${Ondark ? "bg-black" : "bg-white"}
                    `}
                >
                  <button
                    onClick={() => handleMenuOptionClick('Edit')}
                    className={`w-full text-left text-lg px-2 py-2 text-[#6B78BD] inline-flex
                      ${Ondark ? "hover:bg-gray-700" : "hover:bg-gray-200"}
                    `}
                  >
                    <ThemeIcons iconsname='faEdit' className='text-[#6B78BD] text-2xl my-1 mr-1' />
                    Edit
                  </button>
                  <button
                    onClick={() => handleMenuOptionClick('Delete')}
                    className={`w-full text-left text-lg px-2 py-2 text-red-700 inline-flex
                      ${Ondark ? "hover:bg-gray-700" : "hover:bg-gray-200"}
                    `}
                  >
                    <ThemeIcons iconsname='faDelete' className='text-red-700 text-2xl my-1 mr-1' />
                    Delete
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        ))}
      </ul>
      {isFormVisible && (
        <div
          className={`fixed inset-0 ${Ondark ? 'bg-gray-800' : 'bg-gray-700'} opacity-75`}
          onClick={() => setIsFormVisible(false)}
        />
      )}
      {isFormVisible && (
        <AddtodoForm data={previousFormData} onchangedata={handleChange} onClose={() => setIsFormVisible(false)} />
      )}
      <div className='absolute top-96 right-5 bottom-5' onClick={() => setIsFormVisible(true)}>
        <ButtonWithContinuousRipple />
      </div>
    </div>
  );
};

export default List;
