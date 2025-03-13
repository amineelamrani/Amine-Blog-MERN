// here I will provide the date data that will be used when fetching for the evolution of the documents requested

const dateFns = require("date-fns");

const now = Date.now();

// I will share a list of the last 6 months if period 30
// If period 7 => List of the last 6 weeks

exports.weekData = (period) => {
  if (period === "week") {
    const startDate = new Date(now - 10 * 7 * 24 * 60 * 60 * 1000);
    return dateFns.eachWeekOfInterval({
      start: startDate,
      end: dateFns.nextSunday(now),
    });
  } else if (period === "month") {
    const startDate = new Date(now - 10 * 30 * 24 * 60 * 60 * 1000);
    return dateFns.eachMonthOfInterval({
      start: startDate,
      end: dateFns.lastDayOfMonth(
        dateFns.isLastDayOfMonth(now) ? now : dateFns.addMonths(now, 1)
      ),
    });
  }
};
