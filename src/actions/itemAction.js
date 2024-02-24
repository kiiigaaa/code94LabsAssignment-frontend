import axios from "axios";
import Swal from "sweetalert2";





//Add new items
export const addItemsAction = (formData) => async dispatch => {

    dispatch({ type: 'NEW_ITEM_SENDING' })

    try {
            const response = await axios.post('/api/items/add/item', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
       
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'success',
            title: 'Item added successfully!'
        })
       
        setTimeout(function () {
            window.location.reload('/admin/newsfeedmanagement');
        }, 1500);
        console.log(response);
        
        dispatch({ type: 'ITEMS_ADDED_SUCCESS' })

    } catch (error) {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'error',
            title: 'Item add falied!'
        })
        dispatch({ type: 'ITEM_ADDED_FAILED', payload: error })
    }
}

export const getAllitems = () => async dispatch => {

    dispatch({ type: 'GET_ITEMS_REQUEST' })


    try {

        const response = await axios.get('/api/items/getallitems')
        console.log(response)
        dispatch({ type: 'GET_ITEMS_SUCCESS', payload : response.data })

    } catch (error) {

        dispatch({ type: 'GET_ITEMS_FAILED', payload : error })
    }
    

}

//Update Items
export const updateItemsAction = (formData, id) => async dispatch => {

    dispatch({ type: 'UPDATE_ITEMS_REQUEST' })

    try {
    
        const response = await axios.put(`/api/items/update/item/${id}`, formData ,{headers: {
            'Content-Type': 'multipart/form-data',
          },})
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'success',
            title: 'Items updated successfully!'
        })
       
        setTimeout(function () {
            window.location.reload('/admin/additemcatalogue');
        }, 1500);
        console.log(response);
        
        dispatch({ type: 'UPDATE_ITEMS_SUCCESS' })


    } catch (error) {

        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'error',
            title: 'Items update failed!'
        })
        dispatch({ type: 'UPDATE_ITEMS_FAILED', payload: error })
    }
}

//Delete Items
export const deleteItemsAction = (itemId) => async dispatch => {

    dispatch({ type: 'ITEM_DELETE_REQUEST' })


    try {
        const response = await axios.delete(`/api/items/delete/item/${itemId}`)

        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'success',
            title: 'Item deleted successfully!'
        })

        setTimeout(function () {
            window.location.reload('/admin/newsfeedmanagement');
        }, 1500);



        console.log(response);
        dispatch({ type: 'DELETE_ITEM_SUCCESS' })




    } catch (error) {

        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'error',
            title: 'Unsuccessful Operation'
        })


        dispatch({ type: 'DELETE_OPERATION_FAILED', payload: error })
    }
}
