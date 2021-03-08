/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createBuilding = /* GraphQL */ `
  mutation CreateBuilding(
    $input: CreateBuildingInput!
    $condition: ModelBuildingConditionInput
  ) {
    createBuilding(input: $input, condition: $condition) {
      id
      userId
      buildingName
      imageUrl
      createdAt
      updatedAt
    }
  }
`;
export const updateBuilding = /* GraphQL */ `
  mutation UpdateBuilding(
    $input: UpdateBuildingInput!
    $condition: ModelBuildingConditionInput
  ) {
    updateBuilding(input: $input, condition: $condition) {
      id
      userId
      buildingName
      imageUrl
      createdAt
      updatedAt
    }
  }
`;
export const deleteBuilding = /* GraphQL */ `
  mutation DeleteBuilding(
    $input: DeleteBuildingInput!
    $condition: ModelBuildingConditionInput
  ) {
    deleteBuilding(input: $input, condition: $condition) {
      id
      userId
      buildingName
      imageUrl
      createdAt
      updatedAt
    }
  }
`;
export const createUnit = /* GraphQL */ `
  mutation CreateUnit(
    $input: CreateUnitInput!
    $condition: ModelUnitConditionInput
  ) {
    createUnit(input: $input, condition: $condition) {
      id
      userId
      buildingId
      name
      phone
      gender
      date
      price
      email
      advanceBalance
      nextPayment
      dues
      details {
        date
        paid
        status
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateUnit = /* GraphQL */ `
  mutation UpdateUnit(
    $input: UpdateUnitInput!
    $condition: ModelUnitConditionInput
  ) {
    updateUnit(input: $input, condition: $condition) {
      id
      userId
      buildingId
      name
      phone
      gender
      date
      price
      email
      advanceBalance
      nextPayment
      dues
      details {
        date
        paid
        status
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteUnit = /* GraphQL */ `
  mutation DeleteUnit(
    $input: DeleteUnitInput!
    $condition: ModelUnitConditionInput
  ) {
    deleteUnit(input: $input, condition: $condition) {
      id
      userId
      buildingId
      name
      phone
      gender
      date
      price
      email
      advanceBalance
      nextPayment
      dues
      details {
        date
        paid
        status
      }
      createdAt
      updatedAt
    }
  }
`;
