import { useQuery } from '@apollo/client'
import { ALL_USERS } from '../../graphql/queries'

//logged user's name
const User = ({ loggedUser }) => {
  const { data } = useQuery(ALL_USERS)

  if (data && data.getUsers) {
    const users = [...data.getUsers]
    const { name } = users.find(u => u.username === loggedUser.username)

    //showing only name, without surname
    return <h1>{name.split(' ')[0]}</h1>
  }

  return null
}

export default User
