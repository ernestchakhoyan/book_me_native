import { gql } from '@apollo/client';

export const WS_RESERVE_NOTIFY = gql`
  subscription {
    reserveNotify{
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