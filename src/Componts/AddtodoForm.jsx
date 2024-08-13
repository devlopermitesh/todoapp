import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ThemeIcons from './ThemeIcons';
import Input from './Inputjsx';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { createTask, editTask } from '../Store/Todoslice';
import { createTodo, updateTodo } from '../localSaver/Local';

const AddtodoForm = ({ onClose, data ,onchangedata}) => {
  const categories = useSelector((state) => state.todo.categories);
  const dispatch = useDispatch();
  const uniqueId = uuidv4(); // Generate a unique ID

  const handlesubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    const form = e.target;
    const formData = new FormData(form);

    // Check if the form is valid
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const dataObject = {
      id: data ? data.id : uniqueId,
      completed: false,
    };

    formData.forEach((value, key) => {
      dataObject[key] = value;
    });

    if (!data) {

      dispatch(createTask(dataObject));
      createTodo(dataObject)

    } else {
      dispatch(editTask(dataObject));
      updateTodo(dataObject.id,dataObject)

    }
    onchangedata(null)

    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: -200, y: -80 }}
        animate={{ opacity: 1, x: -140, y: -80 }}
        exit={{ opacity: 1, x: -300 }}
        transition={{ duration: 0.3 }}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#A39898] p-6 h-80 w-72 rounded shadow-lg z-50 dark:bg-gray-800 dark:text-white"
      >
        <button onClick={onClose} className="absolute top-2 right-2">
          <ThemeIcons
            iconsname="facancel"
            className="text-3xl text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
          />
        </button>
        <h2 className="text-lg font-bold mb-4">{data ? "EDIT TODO" : "ADD TODO"}</h2>
        <form onSubmit={handlesubmit}>
          <Input
            inputype="text"
            inputname="todotask"
            inputplaceholder={data ? data.todotask : "Enter your task here.."}
            icons="Taskinput"
            required
          />
          <Input
            inputype="datetime-local"
            inputname="datetime"
            inputplaceholder={data ? data.datetime : "Enter your task time here.."}
            icons="Tasktime"
            required

          />
          <Input
            inputype="text"
            inputname="category"
            inputplaceholder={data ? data.category : "Choose category.."}
            list="categories"
            icons="Taskcategory"
            required

          />
          <button
            type="submit"
            className="inline-flex mt-4 text-center ml-20 px-4 py-2 h-10 text-sm font-medium rounded-lg border-0 bg-purple-600 text-white dark:bg-purple-800 dark:text-gray-200 transition-colors duration-100 ease-in-out hover:bg-purple-500 dark:hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-600"
          >
            Add task <ThemeIcons iconsname="Taskplus" />
          </button>
          <datalist id="categories">
            {categories &&
              categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
          </datalist>
        </form>
      </motion.div>
    </AnimatePresence>
  );
};

export default AddtodoForm;
