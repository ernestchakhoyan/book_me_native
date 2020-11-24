import { gql } from '@apollo/client';

export const WS_SEAT_UPDATE= gql`
  subscription {
    updateSeatStatus{
        id,
        status
    }
  }
`;