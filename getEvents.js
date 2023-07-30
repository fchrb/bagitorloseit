exports.handler = async (event, context) => {
    const API_ENDPOINT = 'https://www.googleapis.com/calendar/v3/calendars/54cc3f6d61bba548f6de7ba85ff358d777f9a51743d7dbdccbd58e02e8d323ae@group.calendar.google.com/events?maxResults=3&key=' + process.env.API_KEY;

    let fetch;
    await import('node-fetch').then(nodeFetch => {
        fetch = nodeFetch.default || nodeFetch;
    });

    return fetch(API_ENDPOINT, { headers: { Accept: 'application/json' } })
        .then(response => response.json())
        .then(data => ({
            statusCode: 200,
            body: JSON.stringify({ events: data.items }),
        }))
        .catch(error => ({ statusCode: 422, body: String(error) }));
};
