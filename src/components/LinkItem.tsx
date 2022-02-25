import React from "react";
import { TIME_OVER } from "../utils/constants";
import fileSize from "filesize";
import { TableCell } from "../pages/LinkPage";
import error from "../assets/icons/error.svg";
import { ILink } from "../type";
import styled from "styled-components";
import colors from "../styles/colors";
import { getExpirationDate } from "../utils/date";
import Avatar from "./Avatar";
import LinkUrlCell from "./LinkUrl";
import { getCurrentLocation } from "../utils/location";

interface Props
  extends Omit<ILink, "files" | "created_at" | "download_count" | "key"> {
  keyId: string;
}

const LinkItem = ({
  size,
  summary,
  expires_at,
  thumbnailUrl,
  count,
  sent,
  keyId,
}: Props) => {
  const location = getCurrentLocation();
  const expiration = getExpirationDate(expires_at);

  const handleError = (e: any) => {
    e.target.src = error;
  };

  return (
    <>
      <TableCell>
        <LinkInfo>
          <LinkImage>
            <img
              referrerPolicy="no-referrer"
              src={thumbnailUrl}
              alt="썸네일_이미지"
              onError={handleError}
            />
          </LinkImage>
          <LinkTexts>
            <LinkTitle>{summary}</LinkTitle>
            <LinkUrlCell isOver={expiration === TIME_OVER}>
              {location}/files/{keyId}
            </LinkUrlCell>
          </LinkTexts>
        </LinkInfo>
        <span />
      </TableCell>
      <TableCell>
        <span>파일개수</span>
        <span>{count.toLocaleString("ko-KR")}</span>
      </TableCell>
      <TableCell>
        <span>파일사이즈</span>
        <span>{fileSize(size)}</span>
      </TableCell>
      <TableCell>
        <span>유효기간</span>
        <span>{expiration}</span>
      </TableCell>
      <TableCell>
        <span>받은사람</span>
        <LinkReceivers>
          {sent?.emails.map((email) => (
            <Avatar key={email} text={email} />
          ))}
        </LinkReceivers>
      </TableCell>
    </>
  );
};

export default LinkItem;

const LinkInfo = styled.div`
  display: flex;
  align-items: center;
`;

const LinkImage = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    border-radius: 4px;
  }
`;

const LinkTexts = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 16px;

  & > * {
    margin: 0;
  }
`;

const LinkTitle = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: ${colors.grey700};
`;

const LinkReceivers = styled.div`
  display: flex;

  & > * + * {
    margin-left: 8px;
  }
`;
