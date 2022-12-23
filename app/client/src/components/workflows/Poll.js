import { useQuery, gql } from "@apollo/client";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { setOptions } from "../../features/poll/optionSlice";
import { setVote } from "../../features/poll/voteSlice";

import { Results, Voting } from "../index";

const HeaderWrapper = styled.div`
  max-width: 280px;
  margin 30px 0 20px 0;
`;

const Title = styled.span`
  color: #2c3e50;
  font-size: 24px;
  font-weight: 650;
`;

const Container = styled.div`
  flex: 0 0 100%;
  height: 100%;
  opacity: ${(p) => (p.active === p.index ? 1 : 0)};
  transform: translateX(${(p) => (p.active - 1) * -100}%);
  transition: all 500ms cubic-bezier(0.88, 0.03, 0.09, 0.98);
  width: 100%;
`;

const ContainerWrapper = styled.div`
  align-items: flex-start;
  display: flex;
  flex-wrap: nowrap;
  transition: opacity 500ms cubic-bezier(0.88, 0.03, 0.09, 0.98);
`;

const Wrapper = styled.div`
  margin: 0 10px;
  overflow: hidden;
  width: 90%;
`;

const GET_POLL = gql`
  query poll($id: String!) {
    poll(id: $id) {
      _id
      label
      userVote
      options {
        _id
        label
        result
      }
    }
  }
`;

export const Poll = () => {
  const { loading, data } = useQuery(GET_POLL, {
    variables: { id: "63a38c2bfdcd135cf1dfa276" },
  });

  const dispatch = useDispatch();

  const [active, setActive] = useState(1);
  const [userVote, setUserVote] = useState();

  const overallResult = useMemo(() => {
    if (data?.poll)
      return data.poll.options.reduce((acc, e) => e.result + acc, 0);
    else return 0;
  }, [data?.poll]);

  useEffect(() => {
    if (data) {
      dispatch(setOptions(data.poll.options));
      dispatch(setVote(data.poll.userVote));
      setUserVote(data.poll.userVote);
    }
  }, [data, dispatch]);

  if (loading || !data) return null;

  const components = [
    {
      Component: Voting,
      data: {
        options: data.poll.options,
        overallResult,
        pollId: data.poll._id,
        setUserVote,
        userVote,
      },
    },
    {
      Component: Results,
      data: {},
    },
  ];

  return (
    <Wrapper>
      <HeaderWrapper>
        <Title>{data.poll.label}</Title>
      </HeaderWrapper>

      <ContainerWrapper>
        {components.map(({ Component, data }, i) => (
          <Container
            active={active}
            index={i + 1}
            setActive={setActive}
            key={i}
          >
            {Component && <Component setActive={setActive} {...data} />}
          </Container>
        ))}
      </ContainerWrapper>
    </Wrapper>
  );
};
