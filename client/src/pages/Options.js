import ThemeSetting from '../components/Options/ThemeSetting'
import NameChange from '../components/Options/NameChange'
import CategoryForm from '../components/Category/CategoryForm'
import Categories from '../components/Category/Categories'
import { CategoryProvider } from '../context/CategoryContext'

//page for various options
const Options = () => {
  return (
    <>
      <div className="page">
        <ThemeSetting />
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
