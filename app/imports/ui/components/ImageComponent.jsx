import React from 'react';
import { connectField } from 'uniforms';
import PropTypes from 'prop-types';

function Image({ onChange, value }) {
  return (
    <div className="ImageField">
      <label htmlFor="file-input">
        <h4>Select photo of your vaccine card</h4>
        <img
          alt="Select a photo of your vaccine card"
          style={{
            cursor: 'pointer',
            width: '150px',
            height: '150px',
            background: '#B0F9FF',
            borderRadius: '3px' }}
          src={value}
        />
      </label>
      <input
        accept="image/*"
        id="file-input"
        onChange={({ target: { files } }) => {
          if (files && files[0]) {
            onChange(URL.createObjectURL(files[0]));
          }
        }}
        style={{ display: 'none' }}
        type="file"
      />
    </div>
  );
}

Image.propTypes = {
  onChange: PropTypes.object,
  value: PropTypes.string,
};

export default connectField(Image);
