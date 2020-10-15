import { Get_Messages, Get_Notifies, Get_User_Chat, Notify_Removed, Update_Notifies, Notify_Error, Update_Message, Update_Notification, Notfy_Removed_All } from "../actions/types";


const initialState = {
    message: '',
    messages: [],
    notifies: [],
    notify: '',
    loading: true,
    errors: {}
}

export default (state = initialState, action) => {
    const {type, payload} = action;

    switch(type) {
        case Get_Messages:
            return { ...state, messages: payload, loading: false }
        case Get_Notifies:
            return { ...state, notifies: payload, loading: false }
        case Get_User_Chat:
            return { ...state, messages: payload, loading: false }
        case Notify_Removed:
            return { ...state, notifies: {...state.notifies, messager: state.notifies.messager.filter(message => message._id.toString() !== payload.id.toString()), loading: false } }
        case Notfy_Removed_All:
            return { ...state, notifies: payload, loading:false }
        case Update_Notifies:
            return { ...state, notifies: payload, loading: false }
        case Notify_Error:
            return { ...state, errors: payload, loading: false }
        case Update_Message:
            return { ...state, messages: state.messages.map(message => message._id.toString() == payload.id ? payload.message : message) , loading: false }
        case Update_Notification:
            return { ...state, notifies: {...state.notifies, messager: state.notifies.messager.map(message => message._id.toString() == payload.id ? payload.message : message)}, loading: false }

        default:
            return state;
    }
}