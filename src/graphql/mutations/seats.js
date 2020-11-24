import { gql } from "@apollo/client";

export const UPDATE_SEATS_STATUS = gql`
    mutation updateStatus($id: ID!, $status: Int!, $seatId: ID!){
      updateSeatStatus(id: $id, status: $status, seatId: $seatId){
        id
        status
        seatId
      }
    }
`;