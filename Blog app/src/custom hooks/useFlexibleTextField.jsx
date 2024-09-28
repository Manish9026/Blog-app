import { useState, useRef, useEffect } from 'react';

// Custom hook to handle flexible height for a textarea
function useFlexibleTextField(dependencies = []) {
  // const [value, setValue] = useState(initialValue);
  const textareaRef = useRef(null);

  // Adjust the height of the textarea dynamically
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset height before calculating the new height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, dependencies);

  // // Handle value change
  // const handleChange = (e) => {
  //   setValue(e.target.value);
  // };

  return {

    textareaRef,
  };
}

export default useFlexibleTextField;
