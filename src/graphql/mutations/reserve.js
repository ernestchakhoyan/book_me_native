import { gql } from "@apollo/client";

export const RESERVE_MUTATION = gql`
    mutation reserve(
        $spotId: String!, 
        $seatId: String!,
        $data: ReserveData,
    ){
        reserveSeat(spotId: $spotId, seatId: $seatId, data: $data){
            fullName
            date
            spotId
            notes
        }
    }
`;

export const REMOVE_RESERVATION = gql`
    mutation RemoveReservation($id: ID!){
          removeReservation(id: $id){
              id
          }
    }
`;