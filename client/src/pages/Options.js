import NameChange from '../components/Options/NameChange'
import CategoryForm from '../components/Category/CategoryForm'
import Categories from '../components/Category/Categories'
import { CategoryProvider } from '../context/CategoryContext'

const Options = () => {
  return (
    <>
      <NameChange />
      <CategoryProvider>
        <CategoryForm />
        <Categories />
      </CategoryProvider>
    </>
  )
}

export default Options
