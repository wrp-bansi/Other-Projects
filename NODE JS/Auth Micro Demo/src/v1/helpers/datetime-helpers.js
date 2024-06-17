const moment = require('moment')
const logger = require('../helpers/logger-helper')

var allDateModules = {
  //Monday
  dayName: function (date) {
    const now = moment(date).tz(global.env.TZ).format('dddd')
    return now
  },

  //mongodb format
  mongodbFormat: function (date) {
    const now = moment(date)
      .tz(global.env.TZ)
      .format('YYYY-MM-DDTHH:mm:ss.SSSZ')
    return now
  },

  /* Change date format as per needed with indian standard format */
  changeDateFotmat: function (date, format) {
    let formatted_date

    switch (format) {
      case 'Y-m-d H:i:s':
        formatted_date = moment(date)
          .tz(global.env.TZ)
          .format('YYYY-MM-DD HH:mm:ss')
        break
      case 'd-m-y H:i:s A':
        formatted_date = moment(date)
          .tz(global.env.TZ)
          .format('DD/MM/YYYY, h:mm:ss A')
        break
      case 'Y-m-d':
        formatted_date = moment(date).tz(global.env.TZ).format('YYYY-MM-DD')
        break
      case 'd-m-y':
        formatted_date = moment(date).tz(global.env.TZ).format('DD-MM-YYYY')
        break
      case 'MM/DD/YYYY':
        formatted_date = moment(date).tz(global.env.TZ).format('MM/DD/YYYY')
        break
      case 'HH:mm':
        formatted_date = moment(date).tz(global.env.TZ).format('hh:mm A')
        break
      case 'd/m/y':
        formatted_date = moment(date).format('DD/MM/YYYY')
        break
      case '15-days':
        formatted_date = moment(date)
          .tz(global.env.TZ)
          .subtract(15, 'days')
          .format('YYYY-MM-DD')
        break
      default:
        formatted_date = date // Or throw an error or handle the unknown format in some way
        break
    }

    return formatted_date
  },

  /* get date with start of the day */
  startOfDay: function (date) {
    return moment(date).tz(global.env.TZ).startOf('day').format()
  },

  /* get date with end of the day */
  endOfDay: function (date) {
    return moment(date).tz(global.env.TZ).endOf('day').format()
  },

  /* get date with + specific date on today */
  plusDaysDate: function (days) {
    const current_date = moment().tz(global.env.TZ)
    return current_date.add(days, 'day').format()
  },

  /* get date with + specific time on today */
  plusHourDate: function (hour) {
    const current_date = moment().tz(global.env.TZ)
    return current_date.add(hour, 'hours').format()
  },

  // Check time withing for submit bid
  isBidValidTimeForSubmit: function (endTime) {
    if (!endTime || !global.env.TZ) {
      logger.error('End time or timezone is not defined')
      return false
    }

    const start_moment = moment('00:00 AM', 'hh:mm A').tz(global.env.TZ)
    const end_moment = moment(endTime, 'hh:mm A').tz(global.env.TZ)

    if (!end_moment.isValid()) {
      logger.error('Invalid end time format')
      return false
    }

    if (start_moment.isAfter(end_moment)) {
      logger.error('Start time is after end time')
      return false
    }

    const current_time = moment().tz(global.env.TZ)

    return current_time.isBetween(start_moment, end_moment)
  },

  // condition based on one minute add start + end time
  isTimeWithinOneMinute: function (startTime, endTime, bufferTime = 1) {
    if (!startTime || !endTime || !global.env.TZ) {
      logger.error('Time or timezone is not defined')
      return false
    }

    const start_moment = moment(startTime, 'hh:mm A')
    const end_moment = moment(endTime, 'hh:mm A')

    if (!start_moment.isValid() || !end_moment.isValid()) {
      logger.error('Invalid start or end time format')
      return false
    }

    if (start_moment.isAfter(end_moment)) {
      logger.error('Start time is after end time')
      return false
    }

    const current_time = moment().tz(global.env.TZ)
    const buffer_before_start = start_moment
      .clone()
      .subtract(bufferTime, 'minutes')
    const buffer_after_end = end_moment.clone().add(bufferTime, 'minutes')

    return (
      current_time.isBetween(buffer_before_start, start_moment) ||
      current_time.isBetween(end_moment, buffer_after_end)
    )
  },
}

module.exports = allDateModules

// npm install moment --save      'import moment from 'moment';
