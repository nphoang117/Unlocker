export const createLocksmith = /* GraphQL */ `
  mutation CreateLocksmith(
    $input: CreateLocksmithInput!
    $condition: ModelLocksmithConditionInput
  ) {
    createLocksmith(input: $input, condition: $condition) {
      id
      type
      latitude
      longitude
      heading
      isActive
      userId
      createdAt
      updatedAt
    }
  }
`;

export const updateLocksmith = /* GraphQL */ `
  mutation UpdateLocksmith(
    $input: UpdateLocksmithInput!
    $condition: ModelLocksmithConditionInput
  ) {
    updateLocksmith(input: $input, condition: $condition) {
      id
      type
      latitude
      longitude
      heading
      isActive
      userId
      createdAt
      updatedAt
    }
  }
`;

export const updateOrder = /* GraphQL */ `
  mutation UpdateOrder(
    $input: UpdateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    updateOrder(input: $input, condition: $condition) {
      id
      createdAt
      type
      status
      originLatitude
      originLongitude
      destLatitude
      destLongitude
      userId
      lockSmithId
      updatedAt
    }
  }
`;
