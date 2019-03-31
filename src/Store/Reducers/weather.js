import * as actionTypes from '../Actions/actionTypes';

const initialState = {
    weather: [],
    loading: true
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_WEATHER_INFO_SUCCESS:
            return {
                ...state,
                weather: state.weather.concat(action.data),
                loading: false
            }
        case actionTypes.REFRESH_WEATHER_INFO_SUCCESS:
            const countryId = action.id;
            const weather = [...state.weather];
            weather[countryId] = action.data;
            return {
                ...state,
                weather: weather,
                loading: false
            }
        case actionTypes.REFRESH_WEATHER_START:
            return {
                ...state,
                loading : true
            }
        
        default:
            return state;
    }
}

export default reducer;
