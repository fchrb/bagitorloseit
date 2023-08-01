document.addEventListener('DOMContentLoaded', (event) => {
    fetch('events.json')
        .then(response => response.json())
        .then(events => {
            var streamsInParis = events.map(event => ({
                start: new Date(event.start),
                summary: event.summary
            }));

            // List of timezones
var timezones = [
    'UTC',
    'Europe/London',
    'Africa/Lagos',
    'Europe/Paris',
    'Europe/Berlin',
    'Africa/Johannesburg',
    'Africa/Nairobi',
    'Asia/Kolkata',
    'Asia/Dhaka',
    'Asia/Shanghai',
    'Asia/Tokyo',
    'Australia/Sydney',
    'America/New_York',
    'America/Chicago',
    'America/Los_Angeles',
    // Add more timezones as necessary
];

// Function to format timezones to city names
function formatTimezone(timezone) {
    var cityNames = {
        'UTC': 'GMT',
        'Europe/London': 'London',
        'Africa/Lagos': 'Lagos',
        'Europe/Paris': 'Paris',
        'Europe/Berlin': 'Berlin',
        'Africa/Johannesburg': 'Johannesburg',
        'Africa/Nairobi': 'Nairobi',
        'Asia/Kolkata': 'Kolkata',
        'Asia/Dhaka': 'Dhaka',
        'Asia/Shanghai': 'Shanghai',
        'Asia/Tokyo': 'Tokyo',
        'Australia/Sydney': 'Sydney',
        'America/New_York': 'New York',
        'America/Chicago': 'Chicago',
        'America/Los_Angeles': 'Los Angeles',
        // Add more mappings as necessary
    };
    return cityNames[timezone];
}


            // Sort the streams and keep only the next 2
            streamsInParis.sort(function (a, b) {
                return a.start.getTime() - b.start.getTime();
            });
            streamsInParis = streamsInParis.filter(event => event.start.getTime() > Date.now()).slice(0, 2);

            // Fill the timezone dropdown
            var select = document.getElementById('timeZoneSelect');
            for (var i in timezones) {
                var opt = document.createElement('option');
                opt.value = timezones[i];
                opt.innerHTML = formatTimezone(timezones[i]);
                select.appendChild(opt);
            }

            // Update the displayed times
            function updateTimes() {
                var timezone = document.getElementById('timeZoneSelect').value;
                var scheduleDisplay = document.getElementById('scheduleDisplay');
                scheduleDisplay.innerHTML = '';

                for (var i in streamsInParis) {
                    var streamTime = new Date(streamsInParis[i].start);
                    var formatter = new Intl.DateTimeFormat('en-US', { timeZone: timezone, month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });

                    // Create the new div and apply the event-container class
                    var div = document.createElement('div');
                    div.className = 'event-container';

                    // Create a span for the stream time and append it to the div
                    var timeSpan = document.createElement('span');
                    timeSpan.className = 'event-time';
                    timeSpan.textContent = formatter.format(streamTime) + ' ' + formatTimezone(timezone);
                    div.appendChild(timeSpan);

                    // Create the summary link and append it to the div
                    var summaryLink = document.createElement('a');
                    summaryLink.href = 'https://www.youtube.com/channel/UClft42jk2lPHSPQv9z4XB9w';
                    summaryLink.textContent = streamsInParis[i].summary;
                    summaryLink.className = 'summary-link';  // Apply the summary-link class
                    div.appendChild(summaryLink);

                    // Append the div to the schedule display
                    scheduleDisplay.appendChild(div);
                }
            }

            // Update the times whenever the selected timezone changes
            document.getElementById('timeZoneSelect').addEventListener('change', updateTimes);

            // Set the default timezone to Paris
            document.getElementById('timeZoneSelect').value = 'Europe/Paris';

            // Update the times on page load
            updateTimes();
        });
});
