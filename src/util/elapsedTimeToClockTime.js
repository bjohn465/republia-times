function elapsedTimeToClockTime(
			startingHour,
			workingHours,
			dayLength,
			elapsedTime
		) {
	const percent = elapsedTime / dayLength;
	const rawHours = percent * workingHours;
	const wholeHours = Math.floor( rawHours );
	const rawMinutes = ( rawHours - wholeHours ) * 60;
	const wholeMinutes = Math.floor( rawMinutes );
	const rawSeconds = ( rawMinutes - wholeMinutes ) * 60;
	const wholeSeconds = Math.floor( rawSeconds );

	return {
		hours: startingHour + wholeHours,
		minutes: wholeMinutes,
		seconds: wholeSeconds
	};
};

module.exports = elapsedTimeToClockTime;
