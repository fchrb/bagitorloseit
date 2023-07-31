document.addEventListener('DOMContentLoaded', (event) => {
    fetch('events.json')
        .then(response => response.json())
        .then(events => {
            var streamsInParis = events.map(event => new Date(event.start + "+02:00")); // adjust for Paris timezone

            // Rest of your code goes here...

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

            // Your YouTube channel URL
            var youtubeUrl = "https://www.youtube.com/yourchannel";

            // Sort the streams and keep only the next 2
            streamsInParis.sort(function (a, b) {
                return a.getTime() - b.getTime();
            });
            streamsInParis = streamsInParis.slice(0, 2);

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
                    var streamTime = new Date(streamsInParis[i]);
                    var formatter = new Intl.DateTimeFormat('en-US', { timeZone: timezone, month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
                    var div = document.createElement('div');
                    div.innerHTML = formatter.format(streamTime);

                    // Create a link to YouTube
                    var link = document.createElement('a');
                    link.href = youtubeUrl;
                    link.innerHTML = "on YouTube";
                    link.target = "_blank";
                    link.className = "youtube-link";

                    // Append the link to the div
                    div.appendChild(document.createElement('br'));
                    div.appendChild(link);

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
