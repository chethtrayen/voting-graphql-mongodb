import styled from "styled-components";
import { Button, Option } from "../index";
import { useMutation, gql } from "@apollo/client";

import { useSelector } from "react-redux";

import { selectOptions } from "../../features/poll/optionSlice";
import { useEffect } from "react";

const SubheaderContainer = styled.div`
  margin: 0 0 25px 0;
`;

const CloseBtnContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const CLOSE_POLL = gql`
  mutation close($id: String!) {
    closePoll(id: $id) {
      success
      winner
    }
  }
`;

export const Voting = ({
  closed,
  overallResult,
  pollId,
  setActive,
  winner,
  setPoll,
}) => {
  const [closePoll, { data: res }] = useMutation(CLOSE_POLL, {
    variables: { id: pollId },
  });

  useEffect(() => {
    if (res?.closePoll.success) {
      setPoll((p) => ({ ...p, closed: true, winner: res.closePoll.winner }));
    }
  }, [res, setPoll]);

  const ClosedStateBtn = () => {
    return (
      <CloseBtnContainer>
        <Button backgroundColor="#bdc3c7">Closed</Button>
        <Button
          backgroundColor="#00D1FF"
          color="white"
          onClick={() => {
            setActive(2);
          }}
        >
          See Results
        </Button>
      </CloseBtnContainer>
    );
  };
  const OpenStateBtn = () => {
    return (
      <>
        <Button
          backgroundColor="white"
          onClick={() => {
            closePoll();
          }}
        >
          Close Voting
        </Button>
      </>
    );
  };

  const options = useSelector(selectOptions);
  return (
    <>
      <SubheaderContainer>
        {closed === true ? (
          <ClosedStateBtn />
        ) : closed === false ? (
          <OpenStateBtn />
        ) : null}
      </SubheaderContainer>

      {options.map((option) => (
        <Option
          closed={closed}
          id={option._id}
          key={option._id}
          label={option.label}
          overallResult={overallResult}
          pollId={pollId}
          result={option.result}
          winner={winner}
        />
      ))}
    </>
  );
};
