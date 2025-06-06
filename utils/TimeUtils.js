import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
dayjs.extend(utc);
dayjs.extend(timezone);

export function getTimeInTimezone(tz = "Asia/Manila", hoursToAdd = 0) {
	return dayjs().tz(tz).add(hoursToAdd, "hour").format("YYYY-MM-DD HH:mm:ss");
}
