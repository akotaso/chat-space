$(function(){
  var buildHTML = function(message){
    var DuplicationHTML = `<div class="message" data-message-id="${message.id}" >
                            <div class="message__name">
                              ${message.user_name}
                            </div>
                            <div class="message__date">
                              ${message.created_at}
                          </div>`

    if (message.body && message.image) {
      var html = `${DuplicationHTML}
                   <p class="message__text">
                     ${message.body}
                   </p>
                   <img src=${message.image}>`
    } else if (message.body) {
      var html = 
      `${DuplicationHTML}
        <p class="message__text">
          ${message.body}
        </p>`
    } else if (message.image) {
      var html =
      `${DuplicationHTML}
        <img src=${message.image}>`
    };
    return html;
  };

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.mainchat__messagelist').append(html);
      $('.mainchat__messagelist').animate({ scrollTop: $('.mainchat__messagelist')[0].scrollHeight});
      $('form')[0].reset();
      $('.submit__btn').prop('disabled', false);
    })
    .fail(function(){
      alert('error');
    })
  });

  var reloadMessages = function(){
    last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: "GET",
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages){
      if (messages.length !== 0){
        var insartHTML = '';
        $.each(messages, function(i,message){
          insartHTML += buildHTML(message)
        });
        $('.mainchat__messagelist').append(insartHTML);
        $('.mainchat__messagelist').animate({ scrollTop: $('.mainchat__messagelist')[0].scrollHeight});
      }
    })
    .fail(function(){
      alert('自動更新に失敗しました');
    });
  };

  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});