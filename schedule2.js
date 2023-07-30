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

function listUpcomingEvents() {
    var timeZone = document.getElementById('timeZoneSelect').value;
    fetch('/.netlify/functions/getEvents')
      .then(response => response.json())
      .then(data => {
        var events = data.events;
        if (events.length > 0) {
            for (i = 0; i < events.length; i++) {
                var event = events[i];
                var eventStart = event.start.dateTime || event.start.date;
                var when = moment(eventStart).tz(timeZone).format('MMMM Do YYYY, h:mm:ss a');

                var dateDiv = document.createElement('div');
                dateDiv.innerHTML = when;
                dateDiv.classList.add('event-date');

                var summaryDiv = document.createElement('div');
                summaryDiv.innerHTML = event.summary;
                summaryDiv.classList.add('event-summary');

                // Create a new link that will contain both the date and summary
                var eventContainer = document.createElement('a');
                eventContainer.classList.add('event-container');
                eventContainer.href = "https://www.youtube.com/channel/UClft42jk2lPHSPQv9z4XB9w"; 
                eventContainer.target = "_blank"; // Open in a new tab
                eventContainer.appendChild(dateDiv);
                eventContainer.appendChild(summaryDiv);

                document.getElementById('scheduleDisplay').appendChild(eventContainer);
            }
        }
    });
}

function loadClient() {
    listUpcomingEvents();
}

window.onload = function() {
    var timeZoneSelect = document.getElementById('timeZoneSelect');
    for (var i = 0; i < timezones.length; i++) {
        var option = document.createElement('option');
        option.value = timezones[i];
        option.text = timezones[i];
        timeZoneSelect.add(option);
    }

    timeZoneSelect.addEventListener('change', function() {
        document.getElementById('scheduleDisplay').innerHTML = '';
        listUpcomingEvents();
    });

    loadClient();
}
