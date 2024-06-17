const moment = require('moment')
const logger = require('./logger-helper')

const allDateModules = {
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
    let formattedDate

    switch (format) {
    case 'Y-m-d H:i:s':
      formattedDate = moment(date)
        .tz(global.env.TZ)
        .format('YYYY-MM-DD HH:mm:ss')
      break
    case 'd-m-y H:i:s A':
      formattedDate = moment(date)
        .tz(global.env.TZ)
        .format('DD/MM/YYYY, h:mm:ss A')
      break
    case 'Y-m-d':
      formattedDate = moment(date).tz(global.env.TZ).format('YYYY-MM-DD')
      break
    case 'd-m-y':
      formattedDate = moment(date).tz(global.env.TZ).format('DD-MM-YYYY')
      break
    case 'MM/DD/YYYY':
      formattedDate = moment(date).tz(global.env.TZ).format('MM/DD/YYYY')
      break
    case 'HH:mm':
      formattedDate = moment(date).tz(global.env.TZ).format('hh:mm A')
      break
    case 'd/m/y':
      formattedDate = moment(date).format('DD/MM/YYYY')
      break
    case '15-days':
      formattedDate = moment(date)
        .tz(global.env.TZ)
        .subtract(15, 'days')
        .format('YYYY-MM-DD')
      break
    default:
      formattedDate = date // Or throw an error or handle the unknown format in some way
      break
    }
    return formattedDate
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
    const currentDate = moment().tz(global.env.TZ)
    return currentDate.add(days, 'day').format()
  },

  /* get date with + specific time on today */
  plusHourDate: function (hour) {
    const currentDate = moment().tz(global.env.TZ)
    return currentDate.add(hour, 'hours').format()
  },

  // Check time withing for submit bid
  isBidValidTimeForSubmit: function (endTime) {
    if (!endTime || !global.env.TZ) {
      logger.error('End time or timezone is not defined')
      return false
    }

    const startMoment = moment('00:00 AM', 'hh:mm A').tz(global.env.TZ)
    const endMoment = moment(endTime, 'hh:mm A').tz(global.env.TZ)

    if (!endMoment.isValid()) {
      logger.error('Invalid end time format')
      return false
    }

    if (startMoment.isAfter(endMoment)) {
      logger.error('Start time is after end time')
      return false
    }

    const currentTime = moment().tz(global.env.TZ)

    return currentTime.isBetween(startMoment, endMoment)
  },

  // condition based on one minute add start + end time
  isTimeWithinOneMinute: function (startTime, endTime, bufferTime = 1) {
    if (!startTime || !endTime || !global.env.TZ) {
      logger.error('Time or timezone is not defined')
      return false
    }

    const startMoment = moment(startTime, 'hh:mm A')
    const endMoment = moment(endTime, 'hh:mm A')

    if (!startMoment.isValid() || !endMoment.isValid()) {
      logger.error('Invalid start or end time format')
      return false
    }

    if (startMoment.isAfter(endMoment)) {
      logger.error('Start time is after end time')
      return false
    }

    const currentTime = moment().tz(global.env.TZ)
    const bufferBeforeStart = startMoment
      .clone()
      .subtract(bufferTime, 'minutes')
    const bufferAfterEnd = endMoment.clone().add(bufferTime, 'minutes')

    return (
      currentTime.isBetween(bufferBeforeStart, startMoment) ||
      currentTime.isBetween(endMoment, bufferAfterEnd)
    )
  },
}

module.exports = allDateModules

// npm install moment --save      'import moment from 'moment';
