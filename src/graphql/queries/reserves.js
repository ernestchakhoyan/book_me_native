import { gql } from "@apollo/client";

export const GET_RESERVES = gql`
    query GetReserves($limit: Int, $page: Int, $search: String){
       reserves(limit:$limit, page:$page, search:$search){
            id
            seatName
            fullName
            date
            seatId
            phoneNumber
            notes
            status
       }
    }
`;