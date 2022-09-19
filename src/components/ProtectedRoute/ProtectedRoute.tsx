import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../../redux/hooks'
import { currentUser } from '../../redux/slices/authSlice'

interface IProps {
    children: JSX.Element
}

const ProtectedRoute = ({ children }: IProps) => {
    const user = useAppSelector(currentUser)

    if (!user) {
        return <Navigate to="/login" />
    }

    return children
}

export default ProtectedRoute
