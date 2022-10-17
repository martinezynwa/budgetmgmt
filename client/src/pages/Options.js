import NameChange from '../components/Options/NameChange'
import CategoryForm from '../components/Category/CategoryForm'
import Categories from '../components/Category/Categories'
import { CategoryProvider } from '../context/CategoryContext'

//page for various options
const Options = () => {
  return (
    <>
      <div className="flex flex-col sm:w-full lg:w-3/4 xl:w-3/5 px-2 sm:ml-12 sm:my-4 gap-8">
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
