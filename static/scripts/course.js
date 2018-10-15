/*
 * @Author: WenJW
 * @Date: 2018-10-13 00:11:01
 * @Last Modified by: WenJW
 * @Last Modified time: 2018-10-13 11:11:29
 * @description
 */
!(function(doc, win){

  var xzSay = [
    '好记性不如烂笔头。',
    '每天我都问自己，比昨天更博学了吗？',
    '哎哟，干嘛啦，快学习。',
    '哎哟，干嘛啦，别戳我咯。',
    '好好学习，不要胡思乱想。'
  ]
  var list = [
    {
      teacher: {
        content: 'Hi，我是你的托福口语基础能力老师-Fido，我将陪伴你完成托福口语基础能力的学习。',
        modal: ''
      },
      left: '准时来上课啦，我会和你一起听课学习，不要被我落下哦。',
      right: []
    },
    {
      teacher: {
        content: '盛世美颜的同学们好，我们在独立口语备考中，往往很轻易就能选择一个观点，之后大家需要有多个理由对自己的观点进行论证。',
        modal: ''
      },
      left: '',
      right: []
    },
    {
      teacher: {
        content: '但是这恰恰是我们经常会面临的一个困惑，就是不知道如何丰富论证自己的观点。',
        modal: ''
      },
      left: '',
      right: ['我也有这个问题。','我这个方面到还可以。']
    },
    {
      teacher: {
        content: '嗯，要解决这个问题，除了平时要注意在学习和生活中多训练积累之外，掌握独立口语的万能理由是解决这一尴尬的独门秘籍。',
        modal: ''
      },
      left: '（猛点头）',
      right: []
    },
    {
      teacher: {
        content: '下面，正式进入今天的学习内容——托福独立口语万能理由',
        modal: [
          '万能理由之一：Enrich one\'s horizons 丰富视野。',
          '例如：Do you agree or disagree that government should help to build more recreational facilities?',
          'Answer: Yes.',
          'Reason 1: expand young people\'s horizons.',
          'Reason 2: have a place to go for fun on weekends.',
          'Reason 3: art exhibitions can improve public taste.',
          '题目问是否同意政府应该建造更多的设施这一观点。如果同意，那么就可以从丰富视野这一理由方面进行拓展。',
          '除此之外，在以上的例子中，还分别从增强娱乐，提升公众品味两个方面进行了展开。'
        ].join('<br />')
      },
      left: '',
      right: []
    },
    {
      teacher: {
        content: '学习了这些万能理由之后，我们不妨在遇到独立口语题时，多从这些理由中选取合适的角度进行阐述。',
        modal: ''
      },
      left: '（露出理解的表情）',
      right: ['明白咯。','糊里糊涂的，还需要练习。']
    },
    {
      teacher: {
        content: '在一定量的练习后，你一定能越来越快的形成思路、高效答题！',
        modal: ''
      },
      left: '',
      right: ['课后还是要多多练习哈。']
    },
    {
      teacher: {
        content: '来吧，出道题考考你们，看看你们学习的掌握情况。',
        modal: ''
      },
      left: '尽管考吧，老师',
      right: ['没问题！','没那么有信心。']
    },
    {
      teacher: {
        content: 'Topic：Which do you prefer: working with techonology or working without much techlogy?',
        modal: [
          '思考上述问题，然后青葱给出的四个万能理由中选择进行作答',
          'A. Efficiency',
          'B. Money is everything',
          'C. Learning\'s always good',
          'D. Communication'
        ].join('<br />')
      },
      left: '额，我再想想。',
      right: ['A','B','C','D']
    },
    {
      teacher: {
        content: '正确答案是A，可以这么展开： First, it can improve my work efficiency. Whenever I have problems I can search them on the Internet and try to find out solutions. ',
        modal: ''
      },
      left: '（露出深深认同的表情）',
      right: ['答对了，不错。','打错啦，可惜']
    },
    {
      teacher: {
        content: '好啦，小小尝试之后，今天的课程内容就到这里啦，如果题没刷爽，去做课后加餐，赚积分去吧~',
        modal: ''
      },
      left: '一起刷起来。',
      right: ['挺有收获的。','Just so so.']
    }
  ]
  var _index = 0, len = list.length
  function next() {
    console.log(_index)
    _index++
    if(_index >= len) {
      // 结束
      changeModal('<p style="line-height: 1.5;">你怎么这么棒啊！分享给朋友，自己也能免费获得一节课！</p>')
      $('.js_modal').show()
    } else {
      changeItem(_index)
    }
  }
  function event() {
    $('.operating-box').click(next)
    $('body').on('click', '[data-radio]', function() { 
      setTimeout(next, 500)
    })
    $('.js_xz_icon').click(function(){
      var num = Math.floor(Math.random() * xzSay.length)
      showChat(xzSay[num], 1)
    })
    $('.js_hide').click(function() {
      $('.js_modal').hide()
    })
  }
  function changeModal(content) {
    $('.js_modal_content').html(content)
  }
  function showChat(text, index) {
    var local = [
      $('.js_teacher'),
      $('.js_left'),
      $('.js_right')
    ]
    $('.js_2').hide()
    $('.js_1').hide()
    index = index || 0
    var res = ''
    if(index === 2) {
      $.map(text, function(item, index) {
        res += '<div class="radio-box"><input data-radio class="lw-input-radio radio" id="index_' + index + '" type="radio" name="1" value="1" />'
        res += '<label for="index_' + index + '" class="lw-input-radio-label">&nbsp;</label><label style="padding: 0 0 0 5px;" for="index_' + index + '">' + item + '</label></div>'
      })
      local[2].html(res)
    } else { local[index].html(text) }
    $('.js_0').show()
    $('.js_' + index).show()
  }
  
  function changeItem(index) {
    var data = list[index]
    
    var modalShow = data.teacher.modal ? '<p class="js_show_modal" style="color:red;text-align: right;">&nbsp;展开>>></p>' : ''
    showChat(data.teacher.content + modalShow)
    if(data.teacher.modal) {
      changeModal('<p style="line-height: 1.5;">' + data.teacher.modal + '</p>')
      $('.js_show_modal').click(function() {
        $('.js_modal').show()
      })
    }
    if(data.left) {
      showChat(data.left, 1)
    }
    if(data.right && data.right[0]) {
      showChat(data.right, 2)
    }
  }
  function init () {
    event()
    changeItem(_index)
  }
  init()
}(document, window));