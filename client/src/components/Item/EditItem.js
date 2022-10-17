const EditItem = props => {
  const { navbar, setNavbar, item } = props

  return (
    <>
      <div className="fixed top-0 right-0 w-full sm:w-80 h-screen p-4 transit bg-sidebar">
        <h2 className="w-full text-center text-2xl font-semibold">Edit Item</h2>
        <button className="w-full text-center text-xl bg-red-200 rounded-md"onClick={() => setNavbar(!navbar)}>Cancel</button>
      </div>
    </>
  )
}

export default EditItem
