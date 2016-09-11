$(function(){

  var RSSReader = function () {

    this.feedUrl = 'http://127.0.0.1:8080/items.json';

    this.articles = document.getElementsByClassName('articles__item');

    this.init();
    this.scroll();

  }

  RSSReader.prototype.init = function function_name (argument) {
    this.getFeed();
  }
  RSSReader.prototype.getFeed = function(){
  $.ajax({
  url: this.feedUrl,
  method: "GET",
  dataType: "json"
  })
    .success(this.onGetData.bind(this))
    .error(function(error){
      console.log(error);
    });
  }

  RSSReader.prototype.onGetData = function (data) {
    this.renderData(data);
  }

  RSSReader.prototype.renderData = function(dataList){
    var self = this,
        listHtml = '';
    dataList.forEach(function(item,i){
      self.renderItem(item,i);
      self.renderItem(item,i);
      
    })

  }

  RSSReader.prototype.renderItem = function(item,i){

    
    var image = document.createElement('img'),
        title = document.createElement('h2'),
        text  = document.createElement('p');

        image.className = 'article--image';
        image.src = item.image;
        this.articles[i].appendChild(image);

        title.className = 'article--title';
        title.innerHTML = item.title;
        this.articles[i].appendChild(title);

        text.className = 'article--text';
        text.innerHTML = item.paragraph;
        this.articles[i].appendChild(text);



  }

  RSSReader.prototype.scroll = function(){
    var self = this;
    window.addEventListener('scroll',_.throttle(
      function(){
        self.throttleScroll.call(self);
      },300));
  }

  RSSReader.prototype.throttleScroll = function () {
    var pixelsFromWindowBottomToBottom = 0 + document.body.offsetHeight - $(window).scrollTop();
    if (pixelsFromWindowBottomToBottom < 700){
      console.log(pixelsFromWindowBottomToBottom);
        this.getFeed(); 
    }
  }


  window.rssReader = new RSSReader();

});