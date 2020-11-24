import { gql } from "@apollo/client";

export const GET_RESERVES = gql`
    query GetReserves{
       reserves{
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