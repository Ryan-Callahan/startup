class TimeUtils {
    /**
     * takes a time in epoch format and floors it to the current minute
     * @param time
     * @returns {number}
     */
    static getEpochToMinute(time) {
        return (Math.floor(time / 60000) * 60000);
    }

    /**
     * takes a time in epoch format and floors it to the current day according to users current timezone
     * @param time
     * @returns {number}
     */
    static getEpochToDay(time) {
        return (Math.floor(time / 86400000) * 86400000);
    }

    /**
     * takes a Date, converts it to the current timezone time
     * @param date
     * @returns {Date}
     */
    static getTimezoneTime(date) {
        return new Date(Math.floor(date.getTime()) - (date.getTimezoneOffset() * 60000));
    }

    /**
     * returns the current time but on sunday of the current week
     * @returns {Date}
     */
    static getCurrentWeek() {
        let now = new Date();
        console.log("Current Date: " + now)
        now.setDate(now.getDate() - now.getDay())
        return now;
    }

    /**
     * tales a time in epoch format and converts it to a Date
     * @param date
     * @returns {Date}
     */
    static getDateFromEpoch(date) {
        const then = new Date(date);
        return (then);
    }

    static getDatePlusDays(date, days) {
        const newDate = new Date(date.getTime());
        newDate.setDate(newDate.getDate() + days);
        return newDate;
    }

    static getDatePlusHours(date, hours) {
        const newDate = new Date(date.getTime());
        newDate.setUTCHours(newDate.getUTCHours() + hours);
        return newDate;
    }

    static getDayAsString(date) {
        switch (date.getUTCDay()) {
            case 0:
                return 'Sunday';
            case 1:
                return 'Monday';
            case 2:
                return 'Tuesday';
            case 3:
                return 'Wednesday';
            case 4:
                return 'Thursday';
            case 5:
                return 'Friday';
            case 6:
                return 'Saturday';

        }
    }
}

export default TimeUtils;