import React from 'react'

const SearchForm = ({handleSubmit}) => {
    let formInputStyle = {
        color: '#000'
    }

  return (
    <form onSubmit={handleSubmit}>
        <input style={formInputStyle} type="text" name="city" placeholder="City" />
        <input style={formInputStyle} type="text" name="country" placeholder="Country" />
        <button>Submit</button>
    </form>
  )
}

export default SearchForm