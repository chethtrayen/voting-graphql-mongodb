import { useMutation, gql } from "@apollo/client";
import { useEffect, useMemo } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { updateOptions } from "../../features/poll/optionSlice";
import { selectVote, setVote } from "../../features/poll/voteSlice";

const Container = styled.div`
  background-color: white;
  border-radius: 20px;
  display: flex;
  height: 100px;
  margin: 0 0 30px 0;
  border: 2px solid ${(p) => (p.highlighted ? "#00D1FF" : "white")};
  transition: border 1s;
`;

const Label = styled.div`
  margin: 5px 0 0 0;
  width: 100%;
  height: 100%;
`;

const OverallProgression = styled.div`
  background-color: #00d1ff;
  border-radius: 5px;
  height: 100%;
  width: ${(p) => p.progression}%;
  transition: width 1s;
`;

const Progression = styled.div`
  background-color: #ecf0f1;
  border-radius: 5px;
  flex: 1;
  max-width: 75%;
  height: 20px;
  margin: 0 10px 0 0;
`;

const ProgressionText = styled.div`
  font-size: 14px;
`;

const ProgressionWrapper = styled.div`
  display: flex;
`;

const Wrapper = styled.div`
  margin: 20px 30px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ADD_VOTE = gql`
  mutation add($vote: AddVoteInput!) {
    addVote(vote: $vote) {
      oldVote
      newVote
      success
    }
  }
`;

export const Option = ({
  closed,
  id,
  label,
  overallResult,
  pollId,
  result,
  winner,
}) => {
  const [addVote, { data }] = useMutation(ADD_VOTE, {
    variables: { vote: { optionId: id, pollId } },
  });

  const dispatch = useDispatch();
  const voted = useSelector(selectVote);

  useEffect(() => {
    if (data) {
      const { addVote } = data;
      if (addVote.success) {
        dispatch(updateOptions(addVote));
        dispatch(setVote(addVote.newVote));
      }
    }
  }, [data]);

  const percentage =
    overallResult === 0 ? 0 : Math.floor((result / overallResult) * 100);
  const isHighlighted = useMemo(() => {
    if (closed != null) {
      if (closed) {
        return winner === id;
      } else {
        return voted === id;
      }
    }
  }, [closed, id, voted, winner]);

  return (
    <Container
      highlighted={isHighlighted}
      onClick={() => {
        console.log(closed);
        if (!closed) addVote();
      }}
    >
      <Wrapper>
        <Label>{label}</Label>

        <ProgressionWrapper>
          <Progression>
            <OverallProgression progression={percentage} />
          </Progression>

          <ProgressionText>
            {percentage}% ({result})
          </ProgressionText>
        </ProgressionWrapper>
      </Wrapper>
    </Container>
  );
};
