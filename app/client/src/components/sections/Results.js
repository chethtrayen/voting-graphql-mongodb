import { useQuery, gql } from "@apollo/client";

const GET_RESULT = gql`
  query poll($id: String!) {
    poll(id: $id) {
      _id
      closed
      label
      userVote
      options {
        _id
        label
        result
      }
      winner
    }
  }
`;

export const Results = ({}) => {
  return <>results</>;
};
