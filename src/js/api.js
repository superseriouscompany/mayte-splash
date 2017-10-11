export const baseUrl = window.location.href.match("mayteapp.com") ?
  'https://nwhj3zzqi6.execute-api.us-west-2.amazonaws.com/development':
  'https://superserious.ngrok.io';

export default function request(path, options = {}) {
  if( path[0] != '/' ) path = `/${path}`;

  options.headers = options.headers || {}
  options.headers['Content-Type'] = 'application/json'
  if( options.accessToken ) {
    options.headers['X-Access-Token'] = options.accessToken
    delete options.accessToken
  }
  if( options.body && typeof options.body !== 'string' ) {
    options.body = JSON.stringify(options.body)
  }

  var ok, statusCode;
  return fetch(
    `${baseUrl}${path}`,
    options,
  ).then((response) => {
    ok         = response.ok
    statusCode = response.status
    if( statusCode === 204 ) { return true }
    return response.json()
  }).then((json) => {
    if( !ok ) {
      var err = new Error(json.message || json.error || JSON.stringify(json))
      err.name = 'ApiError'
      err.statusCode = statusCode
      throw err
    }
    return json
  }).catch((err) => {
    if( err.name == 'ApiError' ) { throw err }

    console.log(err.message, err.name)
    console.error(err)
    throw new Error(statusCode)
  })
}
