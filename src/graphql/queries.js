/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getBuilding = /* GraphQL */ `
  query GetBuilding($id: ID!) {
    getBuilding(id: $id) {
      id
      userId
      buildingName
      imageUrl
      createdAt
      updatedAt
    }
  }
`;
export const listBuildings = /* GraphQL */ `
  query ListBuildings(
    $filter: ModelBuildingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBuildings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        buildingName
        imageUrl
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUnit = /* GraphQL */ `
  query GetUnit($id: ID!) {
    getUnit(id: $id) {
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
export const listUnits = /* GraphQL */ `
  query ListUnits(
    $filter: ModelUnitFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUnits(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
