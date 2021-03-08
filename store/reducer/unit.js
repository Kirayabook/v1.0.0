import Unit from "../../models/unit";

import { CREATE_UNIT, DELETE_UNIT, SET_UNIT, UPDATE_UNIT, UPDATE_PAYMENT } from '../action/unit';

const INITIAL_VALUE = {
    availableUnit: [],
};

export default (state= INITIAL_VALUE, action ) => {
    switch (action.type) {
        case CREATE_UNIT:
            const newUnit = new Unit(
                action.data.id,
                action.data.userId,
                action.data.buildingId,
                action.data.name,
                action.data.phone,
                action.data.gender,
                action.data.date,
                action.data.price,
                action.data.email,
                action.data.advanceBalance,
                action.data.nextPayment,
                action.data.dues,
                action.data.details
            );
            return {
                ...state,
               availableUnit: state.availableUnit.concat(newUnit)
            };
        case SET_UNIT:
            return {
                availableUnit: action.data
            };
        case UPDATE_UNIT:
            const index = state.availableUnit.findIndex(uni => uni.id === action.data.unitId)
            const updatedAvailableUnit = [...state.availableUnit]

            updatedAvailableUnit[index].id = action.data.unitId,
            updatedAvailableUnit[index].userId = action.data.userId,
            updatedAvailableUnit[index].buildingId = action.data.buildingId,
            updatedAvailableUnit[index].name = action.data.name,
            updatedAvailableUnit[index].phone = action.data.phone,
            updatedAvailableUnit[index].gender = action.data.gender,
            updatedAvailableUnit[index].date = action.data.date,
            updatedAvailableUnit[index].price = action.data.price,
            updatedAvailableUnit[index].email = action.data.email,
            updatedAvailableUnit[index].advanceBalance = action.data.advanceBalance,
            updatedAvailableUnit[index].nextPayment = action.data.nextPayment,
            updatedAvailableUnit[index].dues = action.data.dues,
            updatedAvailableUnit[index].details = action.data.details
            return {
                ...state,
                availableUnit: updatedAvailableUnit
            };
        case DELETE_UNIT:
            return {
                ...state,
                availableUnit: state.availableUnit.filter(
                    build => build.id !== action.unitId
                )
            };
    }
    return state;
};