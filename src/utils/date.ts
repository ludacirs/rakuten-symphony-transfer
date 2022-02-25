import { differenceInMinutes, format } from "date-fns";
import {
  FIXED_DAY,
  TIME_OVER,
  TIME_STAMP,
  TimeStampForHuman,
} from "./constants";
const TWO = 2;

export const getExpirationDate = (expires_at: number) => {
  const currentDate = FIXED_DAY;
  const expirationTimeStamp = differenceInMinutes(
    expires_at * TIME_STAMP,
    currentDate
  );

  if (expirationTimeStamp < 0) {
    return TIME_OVER;
  }
  if (expirationTimeStamp > TimeStampForHuman.oneDayToMin * TWO) {
    return `${Math.floor(
      expirationTimeStamp / TimeStampForHuman.oneDayToMin
    )}일`;
  }

  const hour = Math.floor(expirationTimeStamp / 60);
  const min = expirationTimeStamp % 60;

  return `${hour}시간 ${min}분`;
};

export const getKoreaDate = (date: number) => {
  return format(date * TIME_STAMP, "yyyy년 MM월 dd일 hh:mm +09:00");
};
