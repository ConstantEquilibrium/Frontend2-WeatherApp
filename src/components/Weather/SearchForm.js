import React from 'react'

const SearchForm = ({handleSubmit}) => {
    let formInputStyle = {
        color: '#fff',
        padding:'0.5rem',
        border:'none',
        background:'rgba(255,255,255,0.1',
        marginBottom:'0.5rem',
        width:'100%',
        display:'block'
    }

  return (
    <form onSubmit={handleSubmit}>
        <input style={formInputStyle} type="text" name="city" placeholder="City" />
        <input style={formInputStyle} type="text" name="country" placeholder="Country" />
        <button style={{display:'none'}}>Submit</button>
    </form>
  )
}

export default SearchForm