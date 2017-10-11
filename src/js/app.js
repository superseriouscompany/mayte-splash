var $       = document.querySelector.bind(document)
import api, {baseUrl} from './api'

$('form').addEventListener('submit', submit)
$('.js-instagram').addEventListener('click', instagramAuth)
$('.js-linkedin').addEventListener('click', linkedinAuth)

var accessToken;
if( accessToken = qs('at') ) {
  if( qs('login') === 'li' ) {
    showStep('four')
  } else {
    showStep('three')
  }
}

function submit(evt) {
  if( $('.step.one').style.display === 'block' ) {
    if( $('.js-promo').value.toLowerCase() !== 'treats!' ) { return showError('The promo code is incorrect') }
    return showStep('two')
  }

  if( $('.step.three').style.display === 'block' ) {
    // from http://emailregex.com/
    var regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    var email = $('.js-email').value
    if( !email.match(regex) ) { showError('Email is invalid') }
    var ok, statusCode
    return api('/users/me', {
      method:      'PATCH',
      body:        {email: email},
      accessToken: accessToken,
    }).then(() => {
      return showStep('four')
    }).catch((err) => {
      console.error(err)
      showError(err.message)
    })
  }

  console.warn('Form submitted during unknown step')
}

function showStep(step) {
  document.querySelectorAll('.step').forEach(function(el) {
    el.style.display = 'none'
  })
  $(`.step.${step}`).style.display = 'block'
}

function instagramAuth() {
  var redirectUrl = `${baseUrl}/webhooks/instagram`
  var clientId    = '1c6d8f10063b4ac7b9010194c380b6fb'

  var url = 'https://instagram.com/oauth/authorize/?client_id='+clientId+
    '&redirect_uri='+redirectUrl+
    '&response_type=code'+
    '&state=client.web'

  window.location.href = url
}

function linkedinAuth() {
  var redirectUrl = `${baseUrl}/webhooks/linkedin`
  var clientId    = '77jqckdp1kbvtl'
  var perms       = ['r_basicprofile', 'r_emailaddress']

  const url = 'https://www.linkedin.com/uas/oauth2/authorization?client_id='+clientId+
   '&response_type=code'+
   '&state=client.web'+
   '&scope='+perms.join(' ').trim()+
   '&redirect_uri='+redirectUrl

   window.location.href = url
}

function showError(msg) {
  return alert(msg)
}

// https://css-tricks.com/snippets/javascript/get-url-variables/
// via https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
function qs(name) {
  var vars = window.location.search.substring(1).split("&")
  for( var i=0; i<vars.length; i++ ) {
    var pair = vars[i].split("=")
    if(pair[0] == name) return pair[1]
  }
  return null
}
