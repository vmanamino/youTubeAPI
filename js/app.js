$(function(){
    sendSearch();
});


// https://www.googleapis.com/youtube/v3/search?q=Heavy%20Metal&key=AIzaSyBq0nR3PW85I4XQw5Uq_MhvmtGlgWDt7dw&part=snippet
function sendSearch(){
    // $.getJSON('https://www.googleapis.com/youtube/v3/search', {
    //     'q': 'heavy metal',
    //     'r': 'json',
    //     'part': 'snippet',
    //     'key': 'AIzaSyBq0nR3PW85I4XQw5Uq_MhvmtGlgWDt7dw',
        
    //     // maxResults: 10
    // },
    // function(data){
    //     console.log("json" + data.items[0]);
    // });
    $.getJSON('https://www.googleapis.com/youtube/v3/search?q=Heavy%20Metal&key=AIzaSyBq0nR3PW85I4XQw5Uq_MhvmtGlgWDt7dw&part=snippet', function(data){
        console.log(data);
    })
    
}