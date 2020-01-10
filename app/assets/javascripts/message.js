$(function(){
  function buildHTML(message){
    if (message.image){
      var html =  `<div class="message">
                    <div class="message__name">
                      ${message.user_name}
                    </div>
                    <div class="message__date">
                      ${message.created_at}
                    </div>
                    <p class="message__text">
                      ${message.body}
                    </p>
                    <img src=${message.image}>
                  </div>`
                  return html;
    } else {
      var html = 
      `<div class="message">
        <div class="message__name">
          ${message.user_name}
        </div>
        <div class="message__date">
          ${message.created_at}
        </div>
        <p class="message__text">
          ${message.body}
        </p>
      </div>`
      return html;
    };
  }

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
});