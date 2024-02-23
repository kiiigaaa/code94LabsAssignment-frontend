import axios from "axios";
import Swal from 'sweetalert2';


export const loginAdmin = (admin) => async dispatch => {

    dispatch({ type: 'ADMIN_LOGIN_REQUEST' })

    try {
        const response = await axios.post('/api/admins/login', admin)
        console.log(response);
        dispatch({ type: 'ADMIN_LOGIN_SUCCESS', payload: response.data })
        localStorage.setItem('currentAdmin', JSON.stringify(response.data))
        window.location.href = '/admin'

    } catch (error) {
        dispatch({ type: 'ADMIN_LOGIN_FAILED', payload: error })
    }
}

export const logoutAdmin = () => dispatch => {

    localStorage.removeItem('currentAdmin')
    localStorage.removeItem('cartItems')
    localStorage.removeItem('currentNotifications')
    window.location.href = 'admin/login'
}

