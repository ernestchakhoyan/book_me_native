import { gql } from "@apollo/client";

export const GET_SPOTS = gql`
  query GetSpots{
    spots{
        id
        name
        description
        logo
      }
    }
`;

export const GET_SPOT_BY_ID = gql`
  query GetSpotById($id: ID){
    spots(id: $id) {
        id
        name
        description
        logo
        seats {
            id
            name
            description
            price
            capacity
            images
        }
    }
  }
`;