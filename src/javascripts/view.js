var View = function(serviceManager){



    var currentIndex = 0, activeNumber = 0;

    function navigation(dir){

        if(dir === 'up'){
            if(currentIndex-1 >= 0 && (currentIndex-1 < playlist.channel.item.length-4) ){
                currentIndex--;
                redraw();
            } else if(currentIndex-1 >= 0){
                removeHighlight();
                currentIndex--;
                activeNumber--;

                highlight();
            }
        } else {
            if(currentIndex+1 >= 0 && (currentIndex+1 < playlist.channel.item.length-3)){
                currentIndex++;
                redraw();
            } else if(currentIndex+1 >= 0 && (currentIndex+1 < playlist.channel.item.length)){
                activeNumber++;
                currentIndex++;
                removeHighlight();
                highlight();

            }
        }
    }

    function playVideo(){

        drawVideoUI();

    }

    function togglePlayback(){
        var v = document.getElementById('vid');

        if(v.paused){
            v.play();
        } else {
            v.pause();

        }
    }

    function setUpNavigation(){

        var upArrow = document.getElementById('upArrow');
        var downArrow = document.getElementById('downArrow');

        upArrow.addEventListener('click', function(){
            navigation('up');
        });

        downArrow.addEventListener('click', function(){
            navigation('down');
        });

        window.onkeydown = function(e){
            if(e.keyCode === 38){
                navigation('up');
            } else if(e.keyCode === 40){
                navigation('down');
            } else if(e.keyCode === 13){
                playVideo();
            } else if(e.keyCode === 32){
                togglePlayback();
            }
        };
    }

    function redraw(){

        document.getElementById("mainNav").innerHTML = null;
        document.getElementById('mainNav').appendChild(drawListItems(playlist));
        highlight();




    }

    function highlight(){
        var list = document.getElementsByTagName("ul")[0];
        var lItem = list.getElementsByTagName("li")[activeNumber]
        lItem.className = lItem.className +" li_active";
    }

    function removeHighlight(){
        var list = document.getElementsByTagName("ul")[0];
        for(var i = 0; i < list.childNodes.length; i++){
            var lItem = list.getElementsByTagName("li")[i];
            lItem.className = 'vidlist';
        }

    }

    function drawVideoUI(){

        document.getElementById('videoTitle').innerHTML = playlist.channel.item[currentIndex].title.text;
        document.getElementById('videoDescription').innerHTML = playlist.channel.item[currentIndex].description.text;
        document.getElementById('vid').src = playlist.channel.item[currentIndex].enclosure.attributes.url;

    }



    function drawListItems(playlist) {

        var playListItems = document.createElement('ul'), li;

        for (var i = currentIndex; i < playlist.channel.item.length; i++) {

            li = document.createElement('li');
            if(i === 0){
                li.className = 'li_active';
            } else {
                li.className = 'vidlist';
            }

            li.innerHTML = playlist.channel.item[i].title.text;

            playListItems.appendChild(li);

        }

        return playListItems;

    }

    this.buildUI = function(_playlist){

        playlist = _playlist

        document.getElementById('mainNav').appendChild(drawListItems(playlist));
        document.getElementById('podcastTitle').innerHTML = playlist.channel.title.text;
        document.getElementById('podcastDescription').innerHTML = playlist.channel.description.text;

        drawVideoUI();
        setUpNavigation();

    }
};