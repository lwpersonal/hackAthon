
var mediaConstraints = {
  audio: true
}

function blobToDataURL(blob, callback) {
  let a = new FileReader()
  a.onload = function (e) { callback(e.target.result) }
  a.readAsDataURL(blob)
}

function onMediaSuccess(stream) {
  var mediaRecorder = new MediaStreamRecorder(stream)
  mediaRecorder.mimeType = 'audio/wav' // check this line for audio/wav
  mediaRecorder.ondataavailable = function (blob) {
      var blobURL = URL.createObjectURL(blob)
      blobToDataURL(blob, function(res) {
        console.log(res)
        // base64
        $('#audio').attr('src', res)
      })
      console.log('ssss')
      console.log(blob)
      console.log(blobURL)
      // mediaRecorder.save(blob, 'FileName.webm')
      // $('#audio').attr('src', blobURL)
  }
  mediaRecorder.start(9999999)
  $('#stop').click(function() {
    console.log('stop')
    mediaRecorder.stop()
  })
}

$('#start').click(function() {
  console.log('start')
  navigator.getUserMedia(mediaConstraints, onMediaSuccess, onMediaError)
})

function onMediaError(e) {
  console.error('media error', e)
}