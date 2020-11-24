import { gql } from "@apollo/client";

export const GET_SEAT_BY_ID = gql`
  query GetSeatById($spotId: ID!){
    seats(spotId: $spotId) {
        id
        name
        description
        images
        price
        status
        capacity
    }
  }
`;