/*
 * @Author: WenJW
 * @Date: 2018-10-12 14:36:13
 * @Last Modified by: WenJW
 * @Last Modified time: 2018-10-13 12:28:50
 * @description
 */
!(function(doc, win){

  function scrollBottom() {
    var h = $(document).height()-$(window).height();
    $(document).scrollTop(h); 
  }
  function _getUrlParam(name, url) {
    url = url || window.location.search
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = url.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]); return null;
  }
  function _getDataType (data) { 
    return Object.prototype.toString.call(data).toLowerCase().replace(/^\[object (\w+)\]$/, '$1')
  }
  function sendMsg(str, type, img) {
    console.log(str)
    type = type || 'right'
    var dataType = 1
    var userImg = type === 'left' ? './static/images/user-xz.jpg' : './static/images/WenJW.jpg'
    var requestStr = ''
    if(img) { userImg = img }
    if(str.url) {
      requestStr = ''
      dataType = 2 // 音频
      var msg = [
        '<div class="chat-item chat-item-' + type +'">',
        type === 'left' ? '<img class="user-icon" src="' + userImg +'" alt="">' : '',
        '<div class="dialog-wrap">',
        '<div class="chat-text">',
        '<i class="iconfont ui-yuyin input-icon"></i>',
        '</div><div class="arrow arrow-' + type +'"></div></div>',
        type === 'right' ? '<img class="user-icon" src="' + userImg +'" alt="">' : '',
        '</div>'
      ].join('')
    } else {
      requestStr = str
      var msg = [
        '<div class="chat-item chat-item-' + type +'">',
        type === 'left' ? '<img class="user-icon" src="' + userImg +'" alt="">' : '',
        '<div class="dialog-wrap">',
        '<div class="chat-text">',
        '<p>' + str + '</p >',
        '</div><div class="arrow arrow-' + type +'"></div></div>',
        type === 'right' ? '<img class="user-icon" src="' + userImg +'" alt="">' : '',
        '</div>'
      ].join('')
    }
    $('.js_chat_container').append(msg)
    scrollBottom()
    if(type === 'right') {
      // 如果是用户发起聊天，处理小智的回话
      console.log('requestStr', requestStr)
      callSay({
        type: dataType,
        character: _getUrlParam('character') || 1, // 1,2,3,4
        question: requestStr
      }, function(res) {
        if(res.code === 0) {
          var resStr = res.data.content
          var imgIndex = res.data.type
          var imgUrl = imgIndex ? './static/images/chat-' + imgIndex + '.jpg' : false
          if(resStr) {
            return sendMsg(resStr, 'left', imgUrl) }
        } else {
          return sendMsg('听不懂你在说什么！', 'left', imgUrl)
        }
      })
    }
  }
  function callSay(options, fn) {
    console.log('start')
    $.ajax({
      type: 'POST',
      url: 'http://118.25.210.140:3000' + '/chat',
      dataType: 'json',
      // contentType: 'application/json',
      data: options, // 1 文本；2 音频
			success:function (res) {
        fn(res)
			}
    })
  }
  function event() {
    $('#chatInput').focus(function() {
      $('.js_line').addClass('line-active')
    })
    $('#chatInput').blur(function() {
      $('.js_line').removeClass('line-active')
    })
    $('.js_change').on('click', '[data-icon]', function() {
      var type = $(this).attr('data-icon')
      if(type === 'input') {
        $('[data-icon="input"]').hide()
        $('[data-input]').hide()
        $('[data-icon="audio"]').show()
        $('[data-audio]').show()
      } else {
        $('[data-icon="input"]').show()
        $('[data-input]').show()
        $('[data-icon="audio"]').hide()
        $('[data-audio]').hide()
      }
    })
    $('.js_chat_send').click(function() {
      var val = $('#chatInput').val()
      $('#chatInput').val('')
      if(!/\S/g.test(val)){ return }
      sendMsg(val)
    })
    $(doc).on('contextmenu', function(e){
      console.log(e)
      e.preventDefault()
      return false
    })
  }

  function audioHandle() {

    var mediaConstraints = {
      audio: true
    }

    function blobToDataURL(blob, callback) {
      let a = new FileReader()
      a.onload = function (e) { callback(e.target.result) }
      a.readAsDataURL(blob)
    }
    function onMediaError(e) {
      console.error('media error', e)
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
          // sendMsg({ url: res })
          mediaRecorder.save(blob, 'FileName.wav')
        })
      }
      mediaRecorder.start(9999999)
      $('.js_audio_btn').on('touchend', function() {
        console.log('touch-end')
        $('.js_audio_modal').removeClass('audio-modal-active')
        mediaRecorder.stop()
      })
    }
    $('.js_audio_btn').on('touchstart', function(e) {
      console.log('touch-start')
      $('.js_audio_modal').addClass('audio-modal-active')
      // navigator.getUserMedia(mediaConstraints, onMediaSuccess, onMediaError)
      e.preventDefault()
    })
    $('.js_audio_btn').on('touchend', function(e) {
      console.log('touch-start')
      $('.js_audio_modal').removeClass('audio-modal-active')
      // navigator.getUserMedia(mediaConstraints, onMediaSuccess, onMediaError)
      return sendMsg({url: 'audio'}, 'right')
    })
  }
  function init(){
    $('body').height($(win).height() + 'px')
    event()
    audioHandle()
  }
  init()
}(document, window));
