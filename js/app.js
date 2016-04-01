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
    })
});


// https://www.googleapis.com/youtube/v3/search?q=Heavy%20Metal&key=AIzaSyBq0nR3PW85I4XQw5Uq_MhvmtGlgWDt7dw&part=snippet
function sendSearch(query){
    console.log(query);
    var params = {
        q: query,
        r: 'json',
        part: 'snippet',
        key: 'AIzaSyBq0nR3PW85I4XQw5Uq_MhvmtGlgWDt7dw',
        maxResults: 9
    }
    var url = 'https://www.googleapis.com/youtube/v3/search';
    
    $.getJSON(url, params, function(data){
        showResults(data.items)
    })
}

function showResults(dataFetched){
    var content = '';
    // initLightbox();
    for (var i = 0; i < dataFetched.length; i++){
        content += "<h2 id="+(i+1)+">"+(dataFetched[i].snippet.title)+"</h2>";
        // content += "<a href=\"https://www.youtube.com/watch?v="+dataFetched[i].id.videoId+"\">";
        content += "<a class=\"various fancybox.iframe\" href=\"https://www.youtube.com/embed/"+dataFetched[i].id.videoId+"\">";
        content += "<img src=\""+dataFetched[i].snippet.thumbnails.default.url+"\"></a>";
    }
    $('.search-results').append(content);
    console.log(content);
}

