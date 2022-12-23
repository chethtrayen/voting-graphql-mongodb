import styled from "styled-components";
import { Button, Option } from "../index";

import { useSelector } from "react-redux";

import { selectOptions } from "../../features/poll/optionSlice";

const SubheaderContainer = styled.div`
  margin: 0 0 25px 0;
`;

export const Voting = ({ overallResult, pollId, setActive, userVote }) => {
  const options = useSelector(selectOptions);
  return (
    <>
      <SubheaderContainer>
        <Button
          backgroundColor="white"
          onClick={() => {
            setActive(2);
          }}
        >
          Close Voting
        </Button>
      </SubheaderContainer>

      {options.map((option) => (
        <Option
          id={option._id}
          key={option._id}
          label={option.label}
          overallResult={overallResult}
          pollId={pollId}
          result={option.result}
          votedFor={userVote === option._id}
        />
      ))}
    </>
  );
};
