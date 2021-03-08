/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateBuilding = /* GraphQL */ `
  subscription OnCreateBuilding {
    onCreateBuilding {
      id
      userId
      buildingName
      imageUrl
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateBuilding = /* GraphQL */ `
  subscription OnUpdateBuilding {
    onUpdateBuilding {
      id
      userId
      buildingName
      imageUrl
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteBuilding = /* GraphQL */ `
  subscription OnDeleteBuilding {
    onDeleteBuilding {
      id
      userId
      buildingName
      imageUrl
      createdAt
      updatedAt
    }
  }
`;
export const onCreateUnit = /* GraphQL */ `
  subscription OnCreateUnit {
    onCreateUnit {
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
export const onUpdateUnit = /* GraphQL */ `
  subscription OnUpdateUnit {
    onUpdateUnit {
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
export const onDeleteUnit = /* GraphQL */ `
  subscription OnDeleteUnit {
    onDeleteUnit {
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
