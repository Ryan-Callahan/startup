class TimeUtils {
    /**
     * takes a time in epoch format and floors it to the current minute
     * @param time {Number}
     * @returns {number}
     */
    static getEpochToMinute(time) {
        return (Math.floor(time / 60000) * 60000);
    }

    static getEpochToHour(time) {
        return (Math.floor(time / 3600000) * 3600000)
    }

    /**
     * takes a time in epoch format and floors it to the current day according to users current timezone
     * @param time {Number}
     * @returns {number}
     */
    static getEpochToDay(time) {
        return (Math.floor(time / 86400000) * 86400000);
    }

    /**
     * takes a Date, converts it to the current timezone time
     * @param date {Date}
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
     * Returns the active week in local time, not in UTC time. The calendar will be rendered in local time
     *  and this is where the conversion takes place.
     * @returns {Date}
     */
    static getTimezonedCurrentWeek() {
        const currentWeek = TimeUtils.getCurrentWeek();
        let timezoneAdjustedWeek = TimeUtils.getTimezoneTime(currentWeek);
        return TimeUtils.getDateFromEpoch(TimeUtils.getEpochToDay(timezoneAdjustedWeek.getTime()));
    }

    /**
     * tales a time in epoch format and converts it to a Date
     * @param date {Number}
     * @returns {Date}
     */
    static getDateFromEpoch(date) {
        const then = new Date(date);
        return (then);
    }

    /**
     * Returns a new Date x amount of days from the given date
     * @param date {Date}
     * @param days {Number}
     * @returns {Date}
     */
    static getDatePlusDays(date, days) {
        const newDate = new Date(date.getTime());
        newDate.setDate(newDate.getDate() + days);
        return newDate;
    }

    /**
     * Returns a new Date x amount of hours from the given date
     * @param date {Date}
     * @param hours {Number}
     * @returns {Date}
     */
    static getDatePlusHours(date, hours) {
        const newDate = new Date(date.getTime());
        newDate.setUTCHours(newDate.getUTCHours() + hours);
        return newDate;
    }

    static getNextDay(date) {
        return new Date(date.getTime() + 86400000);
    }

    static getNextWeek(date) {
        return new Date(date.getTime() + (86400000 * 7));
    }

    static getPreviousDay(date) {
        return new Date(date.getTime() - 86400000);
    }

    static getPreviousWeek(date) {
        return new Date(date.getTime() - (86400000 * 7));
    }


    /**
     * Returns the day of the week relative to the given date
     * @param date {Date}
     * @returns {string}
     */
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

    /**
     * Returns the day of the week plus the day of the given date
     * @param date {Date}
     * @returns {string}
     */
    static getDateAsString(date) {
        return this.getDayAsString(date) + ' ' + this.getDateWithSuffix(date);
    }

    /**
     * Returns the day of the month with its suffix
     * @param date {Date}
     * @returns {string}
     */
    static getDateWithSuffix(date) {
        const day = date.getUTCDate()
        if (4 <= day && day <= 20) return day + 'th';
        switch (day % 10) {
            case 1:
                return day + 'st';
            case 2:
                return day + 'nd';
            case 3:
                return day + 'rd';
            default:
                return day + 'th';
        }
    }

    static isDateSameDay(day, time) {
        return day.getUTCDate() === time.getUTCDate()
            && day.getUTCMonth() === time.getUTCMonth()
            && day.getUTCFullYear() === time.getUTCFullYear();
    }

    static setupDebug() {
        localStorage.setItem("4", '["1744070400000", "1744085526000"]')
        localStorage.setItem("5", '["1743292800000", "1744070400000", "1744070194236", "1744070399000"]')
        localStorage.setItem("6", '["1744081200000"]')
        localStorage.setItem("1744070400000", '["event1", "event2", "event3", "event4"]')
        localStorage.setItem("1744070399000", '["event3"]')
        localStorage.setItem("1744085526000", '["event2"]')
        localStorage.setItem("1744070194236", '["event1"]')
        localStorage.setItem("1744081200000", '["event5"]')
        localStorage.setItem("event1", '{"name": "Ryans appointment", "description": "the appointed hour shall arrive"}')
        localStorage.setItem("event2", '{"name": "Second appointment", "description": "the appointed hour has arrived"}')
        localStorage.setItem("event3", '{"name": "Third Appointment", "description": "the appointed hour has passed"}')
        localStorage.setItem("event4", '{"name": "Fourth Appointment", "description": "4"}')
        localStorage.setItem("event5", '{"name": "Fifth Appointment", "description": "5"}')
        localStorage.setItem("event6", '{"name": "Sixth Appointment", "description": "6"}')
    }
}

export default TimeUtils;