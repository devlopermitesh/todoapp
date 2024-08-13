import React from 'react';
import RippleEffect from './RippleEffect'; // Import RippleEffect component
import { useSelector } from 'react-redux';
const ButtonWithContinuousRipple = () => {
  const Ondark = useSelector((state) => state.todo.theme);
    return (
    <div style={{ position: 'relative', display: 'inline-block', width: '60px', height: '60px' }}>
      <button
        style={{
          width: '90%',
          height: '90%',
          borderRadius: '50%',
          backgroundColor: `${(Ondark)?"black":'#7585D7'}`,
          color: 'white',
          fontSize: '44px',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          position:'absolute',
          zIndex:10,
        }}
      >
        +
      </button>
      <RippleEffect /> {/* Add the continuous ripple effect */}
    </div>
  );
};

export default ButtonWithContinuousRipple;
