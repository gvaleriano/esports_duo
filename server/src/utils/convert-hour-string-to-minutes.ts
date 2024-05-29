// 18:00 -> 1080

export function convertHourStringToMinutes(hourString: string) {
    const [hours, minutes] = hourString.split(":").map(Number)

    const minutesAmount = (hours * 60) + minutes;
    /*var hour = parseInt(hourString, 10);
    var minute = hour * 60;
    return minute;*/

    return minutesAmount;
}