import { useQuery, gql } from "@apollo/client";
import styled from "styled-components";

const GET_RESULT = gql`
  query result($pollId: String!) {
    result(pollId: $pollId) {
      _id
      label
      options {
        label
        result
        voters
      }
    }
  }
`;

const ResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0 50px 0;
`;

const VoterWrapper = styled.div`
  margin: 0 10px;
`;

const VoterContainer = styled.span`
  color: gray;
  margin: 0 4px;
`;

const WinnerIndicator = styled.div`
  background-color: #00d1ff;
  margin: 10px;
  width: 50px;
  padding: 4px 10px;
  border-radius: 5px;
  color: white;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
`;

export const Results = ({ pollId }) => {
  const { loading, data } = useQuery(GET_RESULT, { variables: { pollId } });

  if (loading || !data) return null;
  const {
    result: { options },
  } = data;

  return (
    <>
      {options.map((d, i) => (
        <ResultWrapper>
          <>Who voted for "{d.label}"</>
          {i === 0 && <WinnerIndicator>Winner</WinnerIndicator>}

          <VoterWrapper>
            {d.voters.map((v, i) => (
              <VoterContainer>
                {v}
                {i !== d.voters.length - 1 && ","}
              </VoterContainer>
            ))}
          </VoterWrapper>
        </ResultWrapper>
      ))}
    </>
  );
};
