import React, { useEffect, useState } from 'react';
import ThemeIcons from './ThemeIcons';
import { motion } from 'framer-motion';
import List from './List';
import { useDispatch, useSelector } from 'react-redux';
import { setTodos, toggleTheme } from '../Store/Todoslice';
import { getTodo } from '../localSaver/Local';

const Startingscreen = () => {
  const [theme, setTheme] = useState(true);
  const categories = useSelector((state) => state.todo.categories);
  const [categoryfilter,setcategoryfilter]=useState("All");
  const Ondark = useSelector((state) => state.todo.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    setTheme(Ondark);
  }, [Ondark]);

  useEffect(() => {
    const fetchTodos = async () => {
      const data = await getTodo();
      console.log(data)
      dispatch(setTodos(data));
    };
    fetchTodos();
  }, [dispatch]);

  const changeTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <div 
      className={`${Ondark ? "bg-gray-900" : "bg-white"} h-[100vh]`} 
      style={{ zIndex: -100 }}
    >
      <header className={`text-white text-2xl ${Ondark ? "bg-black" : "bg-[#6B78BD]"} flex justify-between items-center p-2`}>
        <h2 className="font-bold">Todo App</h2>
        <div onClick={changeTheme}>
          <ThemeIcons 
            iconsname={theme ? "fasun" : "famoon"}
            className="text-white" 
            iconClassName="text-3xl"
          />
        </div>
      </header>
      <div className="overflow-x-auto whitespace-nowrap scrollbar-hidden">
        <motion.ul
          className="flex space-x-4 p-2"
          initial={{ x: 0 }}
          animate={{ x: 0 }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          {categories.map((category, index) => (
            <motion.li
              key={index}
              className={`inline-block bg-[#606eac] ${(categoryfilter==category)?"opacity-100":"opacity-70"} font-bold rounded-full p-2 text-white px-4`}
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
              onClick={(e)=>setcategoryfilter(category)}
            >
              {category}
            </motion.li>
          ))}
        </motion.ul>
      </div>
      <List filter={categoryfilter} />
    </div>
  );
}

export default Startingscreen;
