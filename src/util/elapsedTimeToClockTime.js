module.exports = function elapsedTimeToClockTime(
			startingHour,
			workingHours,
			dayLength,
			elapsedTime
		) {
	var percent = elapsedTime / dayLength;
	var rawHours = percent * workingHours;
	var wholeHours = Math.floor( rawHours );
	var rawMinutes = ( rawHours - wholeHours ) * 60;
	var wholeMinutes = Math.floor( rawMinutes );
	var rawSeconds = ( rawMinutes - wholeMinutes ) * 60;
	var wholeSeconds = Math.floor( rawSeconds );

	return {
		hours: startingHour + wholeHours,
		minutes: wholeMinutes,
		seconds: wholeSeconds
	};
};
