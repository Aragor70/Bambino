import { Add_Quote, Quote_Error, Get_Quotes, Get_Quote, Update_Quote } from "../actions/types"

const initialState = {
    quotes: [],
    quote: null,
    loading: true,
    errors: {}
}
export default function(state = initialState, action){
    const {type, payload} = action

    switch(type){
        case Add_Quote:
            return {...state, quotes: [...state.quotes, payload], loading: false}
        case Quote_Error:
            return {...state, errors: payload, loading: false}
        case Get_Quotes: 
            return {...state, quotes: payload, loading: false}
        case Get_Quote:
            return {...state, quote: payload, loading:false}
        case Update_Quote:
            return {...state, quotes: state.quotes.map(quote => quote._id == payload.id ? {...quote, likes: payload.likes} : quote ), loading: false}
        default:
            return state;
    }
}