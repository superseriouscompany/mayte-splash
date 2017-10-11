var $ = document.querySelector.bind(document)

$('form').addEventListener('submit', submit)
$('.js-instagram').addEventListener('click', instagramAuth)
$('.js-linkedin').addEventListener('click', linkedinAuth)

function submit(evt) {
  if( $('.js-promo').value.toLowerCase() !== 'treats!' ) { showError('The promo code is incorrect') }
  document.querySelectorAll('.step').forEach(function(el) {
    el.style.display = 'none'
  })
  $('.step.two').style.display = 'block'
}

function instagramAuth() {
  console.log('instagram')
}

function linkedinAuth() {
  console.log('linkedin')
}

function showError(msg) {
  return alert(msg)
}
