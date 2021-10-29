import styled from "styled-components";

interface IProps {
  cursor?: string;
}

export default function Logo({ cursor = "default" }: IProps) {
  return (
    <LogoContainer cursor={cursor}>
      <h1 className="necesi">necesi</h1>
      <h1 className="dar">dar</h1>
    </LogoContainer>
  );
}

interface StyleProps {
  cursor: string;
}

const LogoContainer = styled.div`
  cursor: ${({ cursor }: StyleProps) => cursor};
  display: flex;
  > h1 {
    display: inline;
    font-size: 36px;
    text-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
  }
  > h1.necesi {
    color: ${({ theme }) => theme.primary_red};
  }
  > h1.dar {
    color: ${({ theme }) => theme.primary_green};
  }
`;
