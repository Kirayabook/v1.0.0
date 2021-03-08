import Building from '../../models/building';
import { CREATE_BUILDING, DELETE_BUILDING, SET_BUILDING, UPDATE_BUILDING } from '../action/building';

const INITIAL_VALUE = {
    availableBuilding: []
};

export default (state= INITIAL_VALUE, action ) => {
    switch (action.type) {
        case CREATE_BUILDING:
            const newBuilding = new Building(
                action.details.userId,
                action.details.id,
                action.details.buildingName,
                action.details.imageUrl
            );
            return {
                ...state,
               availableBuilding: state.availableBuilding.concat(newBuilding)
            };
        case SET_BUILDING:
            return {
                availableBuilding: action.data
            }
        case UPDATE_BUILDING:
            const index = state.availableBuilding.findIndex(
                build => build.id === action.details.buildingId
            );
            const updatedBuilding = new Building(
                action.details.buildingId,
                action.details.userId,
                action.details.buildingName,
                action.details.imageUrl
            );
            const updatedAvailableBuilding = [...state.availableBuilding];
            updatedAvailableBuilding[index] = updatedBuilding;
            return {
                ...state,
                availableBuilding: updatedAvailableBuilding
            };
        case DELETE_BUILDING:
            return {
                ...state,
                availableBuilding: state.availableBuilding.filter(
                    build => build.id !== action.buildingId)
            }
    }
    return state;
};


