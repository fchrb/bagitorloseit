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
    var timeMin = new Date();
    timeMin.setHours(timeMin.getHours() - 3); // Subtract 3 hours from the current time

    gapi.client.calendar.events.list({
        'calendarId': '54cc3f6d61bba548f6de7ba85ff358d777f9a51743d7dbdccbd58e02e8d323ae@group.calendar.google.com',
        'timeMin': timeMin.toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 3, // only fetch the next n events
        'orderBy': 'startTime'
    }).then(function(response) {
        var events = response.result.items;

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



function initClient() {
    gapi.client.init({
      'apiKey': 'AIzaSyBeVveAKCKsH3ubCOUipcSXDAU_CPnv92A',
      'discoveryDocs': ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
    }).then(function () {
      listUpcomingEvents();
    });
}

function loadClient() {
    gapi.load('client', initClient);
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
