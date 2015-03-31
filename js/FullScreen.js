/**
 * Created by guoguo on 2015/3/30.
 */
$(document).ready(function(){
    init();
    $('#fullScreen_switcher').text("Enter FullScreen");
    $('#fullScreen_switcher').bind('click',function(){
        enterFullscreen()
    });
});

function enterFullscreen(){
    console.log("enterFullscreen");
    var de = document.documentElement;
    if(de.requestFullscreen){
        console.log("requestFullscreen");
        de.requestFullscreen();
    } else if(de.mozRequestFullScreen) {
        console.log("mozRequestFullscreen");
        de.mozRequestFullScreen();
    } else if (de.webkitRequestFullscreen){
        console.log("webkitRequestFullscreen");
        de.webkitRequestFullscreen();
    } else{
        console.log("unknown");
    }
}

function exitFullscreen(){

    if(document.exitFullscreen){
        console.log("de.exitFullscreen");
        document.exitFullscreen();
    } else if(document.mozCancelFullScreen) {
        console.log("mozCancelFullscreen");
        document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen){
        console.log("webkitCancelFullscreen");
        document.webkitCancelFullScreen();
    } else {
        console.log("unknown");
    }
}

function init(){
    registeFullScreenChangeListener();
}

function registeFullScreenChangeListener(){
    document.addEventListener("fullscreenchange",
        function() {
            fullScreenChangeListener(document.fullscreen)
        });
    document.addEventListener("mozfullscreenchange", function() {
        fullScreenChangeListener(document.mozFullScreen);
    });
    document.addEventListener("webkitfullscreenchange",function(){
        fullScreenChangeListener(document.webkitIsFullScreen)
    } );
    document.addEventListener("msfullscreenchange",function(){
        fullScreenChangeListener(document.msFullscreenElement)
    } );
}

function getFullScreenState(){
    return document.webkitIsFullScreen;

}

function fullScreenChangeListener(isFullScreen){

    var button = $('#fullScreen_switcher');
    var fullScreenState = getFullScreenState();

    if(isFullScreen){
        button.unbind('click', enterFullscreen());
        button.text("Exit FullScreen");
        //button.click(exitFullscreen());
        console.log("on click exitFullScreen");
        button.bind('click',function(){
            exitFullscreen()
        } );
    } else {
        button.unbind('click', exitFullscreen());
        button.text("Enter FullScreen");
        button.bind('click',function(){
            enterFullscreen()
        });
    }
}