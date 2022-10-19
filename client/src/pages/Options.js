import NameChange from '../components/Options/NameChange'
import CategoryForm from '../components/Category/CategoryForm'
import Categories from '../components/Category/Categories'
import { CategoryProvider } from '../context/CategoryContext'

//page for various options
const Options = () => {
  return (
    <>
      <div className="flex flex-col gap-8 lg:w-3/4 xl:w-3/5 sm:ml-[340px]">
        <NameChange />
        <CategoryProvider>
          <CategoryForm />
          <Categories />
        </CategoryProvider>
      </div>
    </>
  )
}

export default Options
