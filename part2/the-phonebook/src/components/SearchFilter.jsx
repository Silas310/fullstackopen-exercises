const SearchFilter = ({ filter, handleFilterChange }) => {
  return (
    <p>filter shown with <input onChange={handleFilterChange} value={filter} /></p>
  )
}

export default SearchFilter