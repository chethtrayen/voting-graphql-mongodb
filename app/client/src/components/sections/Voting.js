import styled from "styled-components";
import { Button, Option } from "../index";

import { useSelector } from "react-redux";

import { selectOptions } from "../../features/poll/optionSlice";

const SubheaderContainer = styled.div`
  margin: 0 0 25px 0;
`;

const CloseBtnContainer = styled.div`
  display: flex;
  gap: 20px;
`;

export const Voting = ({
  closed,
  overallResult,
  pollId,
  setActive,
  winner,
  setPoll,
}) => {
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
            setPoll((p) => ({ ...p, closed: true }));
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
        {closed ? <ClosedStateBtn /> : <OpenStateBtn />}
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
