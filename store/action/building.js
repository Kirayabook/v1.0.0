import {API,  graphqlOperation } from "aws-amplify";
import { createBuilding, updateBuilding, deleteBuilding } from '../../src/graphql/mutations';
import { listBuildings } from '../../src/graphql/queries';

import Building from '../../models/building';

export const DELETE_BUILDING = 'DELETE_BUILDING';
export const CREATE_BUILDING = 'CREATE_BUILDING';
export const UPDATE_BUILDING = 'UPDATE_BUILDING';
export const SET_BUILDING = 'SET_BUILDING';

export const fetchData = (signinId) => {
    console.log('building');
    return async dispatch => {
            let filter = {
                userId: { contains : signinId}
            }
        try {
            const response = await API.graphql({query: listBuildings, variables: {filter: filter}});

            const resData = response.data.listBuildings.items;

            const loadedBuildingData = [];

            for(const key in resData) {
                loadedBuildingData.push(
                    new Building (
                        resData[key].id, 
                        resData[key].userId,
                        resData[key].buildingName, 
                        resData[key].imageUrl
                    )
                );
            }

            dispatch({ type: SET_BUILDING, data: loadedBuildingData });
        } catch (err) {
            throw err;
        }
    };
};

export const addBuilding = (userId, buildingName, imageUrl) => {
    return async (dispatch) => {
        const buildingDetails = {
            userId,
            buildingName,
            imageUrl
        };
        try {
            const result = await API.graphql(graphqlOperation(createBuilding, {input: buildingDetails}));
            dispatch({ type: CREATE_BUILDING, details: {id: result.data.createBuilding.id, userId, buildingName: buildingName, imageUrl: imageUrl}});
        } catch (err) {
            console.log('error while creating', err);
        }    
    };    
};

export const updatingBuilding = (buildingId, userId, buildingName, imageUrl) => {
    return async (dispatch) => {
        const updatingBuildingDetails = {
            id: buildingId,
            userId: userId,
            buildingName: buildingName,
            imageUrl: imageUrl
        };
        try {
            API.graphql(graphqlOperation(updateBuilding, {input: updatingBuildingDetails}));
            dispatch({ type: UPDATE_BUILDING, details: {buildingId, userId, buildingName, imageUrl}});
        } catch (err) {
            console.log('error while creating', err)
        } 
    };
};

export const deletingBuilding = (buildingId) => {
    return async (dispatch) => {
        const deletingBuildingDetails = {
            id: buildingId,
        };
        console.log(buildingId);
        try {
            const result = await API.graphql({query: deleteBuilding, variables: {input: deletingBuildingDetails}});
            dispatch({ type: DELETE_BUILDING, buildingId: buildingId});
        } catch (err) {
            console.log('error while creating', err)
        } 
    };
};
