$(function(){
    $(".various").fancybox({
       width : 854,
       height : 480
    });
    $("#search-term").submit(function(e){
        e.preventDefault();
        var searchTerm = $('#query').val();
        $("#query").val('');
        sendSearch(searchTerm);
    });
});

function params(query){
    var params = {
        q: query,
        r: 'json',
        part: 'snippet',
        key: 'AIzaSyBq0nR3PW85I4XQw5Uq_MhvmtGlgWDt7dw',
        maxResults: 9
    };
    return params;
}

function sendSearch(query){
    console.log(query);
    var getThis = params(query);
    var url = 'https://www.googleapis.com/youtube/v3/search';
    
    $.getJSON(url, getThis, function(data){
        showResults(data.items, url, getThis, data.nextPageToken);
    });
}

function showResults(dataFetched, url, getThis, nextPageToken){
    var content = '';
    for (var i = 0; i < dataFetched.length; i++){
        content += "<h2 id="+(i+1)+">"+(dataFetched[i].snippet.title)+"</h2>";
        // content += "<a href=\"https://www.youtube.com/watch?v="+dataFetched[i].id.videoId+"\"></a>";
        content += "<a class=\"various fancybox.iframe\" href=\"https://www.youtube.com/embed/"+dataFetched[i].id.videoId+"\">";
        content += "<img src=\""+dataFetched[i].snippet.thumbnails.default.url+"\">";
        content += "<a href=\"https://www.youtube.com/channel/"+dataFetched[i].snippet.channelId+"\">See the user's other vids</a>";
    }
    $('.search-results').append(content);
    $(".turn").append("<li id=\"next\"><a href=\"https://thinkful-vmanamino.c9users.io/projects/youTubeAPI/main.html\" >Next</li>");
    $(".turn li#next > a").click(function(e){
        e.preventDefault();
        sendPage(url, getThis, nextPageToken);
    });
}

function sendPage(url, params, token){
    var extendParams = {
        q: params.q,
        r: params.r,
        part: params.part,
        key: params.key,
        maxResults: params.maxResults,
        pageToken: token
    };
    $.getJSON(url, extendParams, function(data){
        showNext(data, url, params);
    });
}

function showNext(dataObject, url, params){
    $('.search-results').empty();
    $('.turn').empty();
    var prevPageToken = dataObject.prevPageToken;
    var nextPageToken = dataObject.nextPageToken;
    var dataFetched = dataObject.items
    var content = '';
    for (var i = 0; i < dataFetched.length; i++){
        content += "<h2 id="+(i+1)+">"+(dataFetched[i].snippet.title)+"</h2>";
        // content += "<a href=\"https://www.youtube.com/watch?v="+dataFetched[i].id.videoId+"\"></a>";
        content += "<a class=\"various fancybox.iframe\" href=\"https://www.youtube.com/embed/"+dataFetched[i].id.videoId+"\">";
        content += "<img src=\""+dataFetched[i].snippet.thumbnails.default.url+"\">";
        content += "<a href=\"https://www.youtube.com/channel/"+dataFetched[i].snippet.channelId+"\">See the user's other vids</a>";
    }
    $(".turn").append("<li id=\"prev\"><a href=\"https://thinkful-vmanamino.c9users.io/projects/youTubeAPI/main.html\" >Prev</li>");
    $(".turn li#prev > a").click(function(e){
        e.preventDefault();
        sendPage(url, params, prevPageToken);
    });    
    $(".turn").append("<li id=\"next\"><a href=\"https://thinkful-vmanamino.c9users.io/projects/youTubeAPI/main.html\" >Next</li>");
    $(".turn li#next > a").click(function(e){
        e.preventDefault();
        sendPage(url, params, nextPageToken);
    });
    $('.search-results').append(content);
}


