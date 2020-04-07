import React from 'react';

const Text = ({ text, value, idTest}) => {
  return (
    <div>
        {value && <p data-testid={idTest}>{`${text}${value}`}</p>}
    </div>
  )
}

export default Text

