import { gql } from '@apollo/client';

export const WS_NEW_RESERVE = gql`
  subscription {
    newReserve{
        id,
        fullName,
        spotId, 
        seatId,
        date, 
        notes, 
        phoneNumber, 
        status
        seatName
    }
  }
`;