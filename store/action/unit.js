import Unit from '../../models/unit';
import { API, graphqlOperation } from "aws-amplify";
import { createUnit, updateUnit, deleteUnit } from '../../src/graphql/mutations';
import { listUnits } from '../../src/graphql/queries';

export const DELETE_UNIT = 'DELETE_UNIT';
export const CREATE_UNIT = 'CREATE_UNIT';
export const UPDATE_UNIT = 'UPDATE_UNIT';
export const SET_UNIT = 'SET_UNIT';
export const DELETE_BUILDING_UNIT = 'DELETE_BUILDING_UNIT';
export const ADD_PAYMENT = 'ADD_PAYMENT';
export const UPDATE_PAYMENT = 'UPDATE_PAYMENT';

export const fetchUnit = (signinId) => {
    return async dispatch => {
        let filter = {
            userId: { contains : signinId}
        };
        try{
            const response = await API.graphql({query: listUnits, variables: {filter: filter}});

            const resData = response.data.listUnits.items;
            const loadedUnitData = [];

            for(const key in resData) {
                loadedUnitData.push(
                    new Unit(
                        resData[key].id, 
                        resData[key].userId,
                        resData[key].buildingId,
                        resData[key].name, 
                        resData[key].phone,
                        resData[key].gender,
                        resData[key].date,
                        resData[key].price,
                        resData[key].email,
                        resData[key].advanceBalance,
                        resData[key].nextPayment,
                        resData[key].dues,
                        resData[key].details
                    )
                );
            }
            dispatch({ type: SET_UNIT, data: loadedUnitData });
        } catch (err) {
            throw (err)
        };
    };
};

export const addUnit = (userId, buildingId, name, phone, gender, date, price, email, advanceBalance, nextPayment, dues, details) => {
    return async dispatch => {
        const unitDetails = {
            userId,
            buildingId,
            name,
            phone,
            gender,
            date,
            price,
            email,
            advanceBalance,
            nextPayment,
            dues,
            details
        };

        try {
            const result = await API.graphql(graphqlOperation(createUnit, {input: unitDetails}));
            // console.log(result);
            dispatch(
                { 
                    type: CREATE_UNIT, 
                    data: { 
                        id: result.data.createUnit.id,
                        userId:userId, 
                        buildingId: buildingId, 
                        name: name, 
                        phone: phone, 
                        gender: gender, 
                        date: date, 
                        price: price, 
                        email: email,
                        advanceBalance,
                        nextPayment,
                        dues,
                        details
                    }
                }
            )
        } catch (err) {
            console.log('error while creating', err)
        } 
    };
};

export const updatingUnit = (unitId, userId, buildingId, name, phone, gender, date, price, email, advanceBalance, nextPayment, dues, details) => {
    return async (dispatch) => {
        const unitDetails = {
            id : unitId,
            userId,
            buildingId,
            name,
            phone,
            gender,
            date,
            price,
            email,
            advanceBalance, 
            nextPayment,
            dues,  
            details
        }

        try {
            const result = await API.graphql(graphqlOperation(updateUnit, {input: unitDetails}));
            dispatch({ type: UPDATE_UNIT, data: { unitId, userId, buildingId, name, phone, gender, date, price, email, advanceBalance, nextPayment, dues, details}});
        } catch (err) {
            console.log('error while creating', err);
        } 
    };    
};

export const deletingUnit = (unitId) => {
    return async (dispatch) => {
        const unitDetails = {
            id: unitId
        }
        try {
            await API.graphql(graphqlOperation(deleteUnit, {input: unitDetails}));
            dispatch({type: DELETE_UNIT, unitId: unitId});
        } catch (err) {
            console.log('error while creating', err)
        }  
    };   
};
