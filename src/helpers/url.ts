const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

// Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
export const devMode: boolean = !!params['dev']

export const environment = window.location.href.includes('localhost') ? 'local' : 'production';