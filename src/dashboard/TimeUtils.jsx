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
}

export default TimeUtils;