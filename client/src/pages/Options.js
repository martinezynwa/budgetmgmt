import Notification from '../components/Notification'
import CategoryForm from '../components/CategoryForm'
import Categories from '../components/Categories'
import { CategoryProvider } from '../context/CategoryContext'

const Options = () => {
  return (
    <>
      <CategoryProvider>
        <CategoryForm />
        <Notification />
        <Categories />
      </CategoryProvider>
    </>
  )
}

export default Options
