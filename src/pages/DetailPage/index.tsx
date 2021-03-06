import React from "react";
import type { FC } from "react";
import styled from "styled-components";
import colors from "styles/colors";
import Button from "components/Button";
import { useGetLink } from "hooks/useGetLinks";
import { useParams } from "react-router-dom";
import fileSize from "filesize";
import { getExpirationDate, getKoreaDate } from "../../utils/date";
import { TIME_OVER } from "../../utils/constants";
import { getCurrentLocation } from "../../utils/location";

const DetailPage: FC = () => {
  const { key } = useParams();
  const { isLoading, data } = useGetLink(key as string);

  if (isLoading) {
    return <>파일 정보 불러오는 중...</>;
  }

  const {
    files,
    download_count,
    summary,
    sent,
    created_at,
    expires_at,
    size,
    count,
  } = data!;

  const isExpiration = getExpirationDate(expires_at) === TIME_OVER;

  const handleClick = () => {
    window.alert(
      isExpiration ? "다운로드 기간이 만료되었습니다." : "다운로드 되었습니다."
    );
  };
  return (
    <>
      <Header>
        <LinkInfo>
          <Title>{summary}</Title>
          <Url>{getCurrentLocation()}</Url>
        </LinkInfo>
        <DownloadButton onClick={handleClick} isExpiration={isExpiration}>
          {!isExpiration ? (
            <>
              <img
                referrerPolicy="no-referrer"
                src="/svgs/download.svg"
                alt=""
              />
              받기
            </>
          ) : (
            "만료"
          )}
        </DownloadButton>
      </Header>
      <Article>
        <Descrition>
          <Texts>
            <Top>링크 생성일</Top>
            <Bottom>{getKoreaDate(created_at)}</Bottom>
            <Top>메세지</Top>
            <Bottom>{sent?.content}</Bottom>
            <Top>다운로드 횟수</Top>
            <Bottom>{download_count.toLocaleString("ko-KR")}</Bottom>
          </Texts>
          <LinkImage>
            <Image />
          </LinkImage>
        </Descrition>
        {!isExpiration && (
          <>
            <ListSummary>
              <div>총 {count}개의 파일</div>
              <div>{fileSize(size)}</div>
            </ListSummary>
            <FileList>
              {files.map(({ key, thumbnailUrl, name, size }) => (
                <FileListItem key={key}>
                  <FileItemInfo thumbnailUrl={thumbnailUrl}>
                    <span />
                    <span>{name}</span>
                  </FileItemInfo>
                  <FileItemSize>{fileSize(size)}</FileItemSize>
                </FileListItem>
              ))}
            </FileList>
          </>
        )}
      </Article>
    </>
  );
};

const Header = styled.header`
  display: flex;
  color: ${colors.grey600};
  margin-bottom: 32px;
`;

const LinkInfo = styled.div`
  overflow: hidden;
  flex-grow: 1;
`;

const Title = styled.h3`
  margin: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 28px;
  color: ${colors.grey700};
  font-size: 20px;
`;

const Url = styled.a`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
  text-decoration: underline;
  line-height: 20px;
  font-size: 14px;

  :hover {
    color: ${colors.teal700};
  }
`;

const DownloadButton = styled(Button)<{ isExpiration: boolean }>`
  font-size: 16px;

  background: ${({ isExpiration }) => (isExpiration ? colors.grey500 : "")};
  :active {
    background: ${colors.grey500};
  }
  img {
    margin-right: 8px;
  }
`;

const Article = styled.article`
  border-radius: 4px;
  border-color: ${colors.grey200};
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  box-shadow: 0 0 0 1px rgb(0 20 61 / 8%), 0 3px 3px 0 rgb(0 20 61 / 4%);
  background-color: ${colors.white};
  color: ${colors.grey600};
  font-size: 14px;
  font-weight: 400;
`;

const Descrition = styled.div`
  display: flex;
  padding: 36px;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    padding: 24px;
  }
`;

const Texts = styled.div`
  flex-grow: 0;
  max-width: 50%;
  flex-basis: 50%;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const Top = styled.label`
  font-weight: 600;
  line-height: 20px;
`;

const Bottom = styled.p`
  color: ${colors.grey700};
  margin: 8px 0 24px;
`;

const LinkImage = styled.div`
  flex-grow: 0;
  max-width: 50%;
  flex-basis: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  display: flex;
  overflow: hidden;
  align-items: center;
  border-radius: 4px;
  justify-content: center;
  background-color: ${colors.grey50};

  @media (max-width: 768px) {
    margin-bottom: 32px;
    max-width: 100%;
  }
`;

const Image = styled.span`
  width: 120px;
  display: inline-block;
  background-image: url(/svgs/default.svg);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  padding-bottom: 100%;
`;

const ListSummary = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 36px;
  font-weight: 600;
  border-top: 1px solid;
  border-color: ${colors.grey200};

  @media (max-width: 768px) {
    padding: 12px 24px;
  }
`;

const FileList = styled.ul`
  border-top: 1px solid;
  border-color: ${colors.grey200};
  padding: 0;
  margin: 0;
  padding: 0 36px;
  color: ${colors.grey700};

  @media (max-width: 768px) {
    padding: 0 24px;
  }

  & > li + li {
    border-top: 1px solid;
    border-color: ${colors.grey200};
  }
`;

const FileListItem = styled.li`
  height: 72px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FileItemInfo = styled.div<{ thumbnailUrl: string }>`
  flex-grow: 0;
  max-width: 50%;
  flex-basis: 50%;
  display: flex;
  align-items: center;

  span:first-child {
    width: 40px;
    height: 40px;
    margin-right: 12px;
    display: inline-block;
    background-image: url(/svgs/default.svg);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
  }
`;

const FileItemSize = styled.div``;

export default DetailPage;
