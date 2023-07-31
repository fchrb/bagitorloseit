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
                'Europe/Paris',
                'America/New_York',
                'America/Los_Angeles',
                'Asia/Shanghai',
                'Asia/Kolkata',
                'Australia/Sydney',
                'Europe/London',
                'Europe/Berlin',
                'Asia/Tokyo',
                // Add more timezones as necessary
            ];

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
                opt.innerHTML = timezones[i];
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
                    div.innerHTML = formatter.format(streamTime) + ' ' + timezone;

                    // Create the summary link and append it to the div
                    var summaryLink = document.createElement('a');
                    summaryLink.href = 'https://www.youtube.com/channel/UClft42jk2lPHSPQv9z4XB9w';
                    summaryLink.textContent = streamsInParis[i].summary;
                    summaryLink.className = 'summary-link';  // Apply the summary-link class

                    // Append the summary link to the div
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
