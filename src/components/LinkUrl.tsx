import React from "react";
import styled from "styled-components";
import colors from "../styles/colors";

interface Props {
  isOver: boolean;
  children: React.ReactNode;
}

const LinkUrlCell = ({ isOver, children }: Props) => {
  const handleClick = (e: React.MouseEvent<HTMLParagraphElement>) => {
    e.stopPropagation();

    if (isOver) {
      return;
    }
    const target = e.target as HTMLParagraphElement;

    navigator.clipboard.writeText(target.innerText).then(() => {
      window.alert(`${target.innerText}\n가 클립보드에 복사되었습니다.`);
    });
  };

  return (
    <LinkUrl className={isOver ? "over" : ""} onClick={handleClick}>
      {isOver && "만료됨"}
      {isOver || children}
    </LinkUrl>
  );
};

export default LinkUrlCell;

const LinkUrl = styled.p`
  text-decoration: underline;

  :hover:not(.over) {
    color: ${colors.teal700};
  }
`;
