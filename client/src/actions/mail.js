import axios from 'axios';
import {setAlert} from './alert';

export const addFeedback = (formData) => async dispatch => {
    try {
        await axios.post('/api/mails/feedback', formData)
        dispatch(setAlert('Feedback message sent.', 'success'))

    } catch(err) {
        setAlert('Error message.', 'danger')
    }
}