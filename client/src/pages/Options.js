import CategoryForm from '../components/CategoryForm'
import Categories from '../components/Categories'
import { CategoryProvider } from '../context/CategoryContext'

const Options = () => {
  return (
    <div className="container">
      <CategoryProvider>
        <CategoryForm />
        <Categories />
      </CategoryProvider>
    </div>
  )
}

export default Options
