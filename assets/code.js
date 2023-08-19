const toggleSwitch = document.getElementById('checkbox');
const currentTheme = localStorage.getItem('theme');
const currentFont = localStorage.getItem('f-family');
const booktheme = localStorage.getItem('book');


if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (currentTheme === 'dark') {
        //toggleSwitch.checked = true;
    }
}

window.onload = function() {
    var element = document.body;
    element.classList.toggle(currentFont);

    if(booktheme == 'true'){
        var body = document.getElementById("mybody"); //.body
        var htmlcolor = document.body;
        var nav = document.querySelector("nav");

        var h1 = document.querySelector("h1");

        body.style.transition = "none";
        htmlcolor.style.transition = "none";
        nav.style.transition = "none";
        h1.style.transition = "none";

        var con = document.getElementById("book");
        
        if(con)
            con.classList.toggle("book");
        
        h1.classList.toggle("h-book");
        body.classList.toggle("bookbody");
        htmlcolor.classList.toggle("bookbackground");
        nav.classList.toggle("nav-book");

        //h1.style = null;
        setTimeout(function(){  body.style = null; htmlcolor.style = null; nav.style = null; h1.style = null; }, 500);
       
    }
}


function fadeInPage() {
    if (!window.AnimationEvent) { return; }
    var fader = document.getElementById('fader');
    fader.classList.add('fade-out');
}

document.addEventListener('DOMContentLoaded', function() {
    if (!window.AnimationEvent) { return; }

    var anchors = document.getElementsByTagName('a');
    
    for (var idx=0; idx<anchors.length; idx+=1) {
        if (anchors[idx].hostname !== window.location.hostname ||
            anchors[idx].pathname === window.location.pathname) {
            continue;
        }
        anchors[idx].addEventListener('click', function(event) {
            var fader = document.getElementById('fader'),
                anchor = event.currentTarget;
            
            var listener = function() {
                window.location = anchor.href;
                fader.removeEventListener('animationend', listener);
            };
            fader.addEventListener('animationend', listener);
            
            event.preventDefault();
            fader.classList.add('fade-in');
        });
    }
});

window.addEventListener('pageshow', function (event) {
    if (!event.persisted) {
      return;
    }
    var fader = document.getElementById('fader');
    fader.classList.remove('fade-in');
  });


function switchTheme(e) {
    if (e.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
    else {        
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }    
}

function toggleTheme(){
    var theme = localStorage.getItem('theme');

    if (theme === "dark") {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
    else {        
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }    
}

function toggleSans() {
    var theme = localStorage.getItem('f-family');
    var element = document.body;

    if (theme == 'serif') {
        element.classList.toggle("serif");
        localStorage.setItem('f-family', 'sans');
    }
    else {        
        element.classList.toggle("serif");
        localStorage.setItem('f-family', 'serif');
    }  
}

function switchFont(){
    var font = localStorage.getItem('f-family');
    var element = document.body;
    var newfont = '';

    switch(font){
        case 'sans':
            newfont = 'serif';
            break;
        case 'serif':
            newfont = 'mono';
            break;
        case 'mono':
            newfont = 'ia';
            break;
        case 'ia':
            newfont = 'sans';
            break;
        default:
            newfont = 'serif';
            break;
    }

    setFont(newfont)

    /*
    switch(font){
        case 'serif':
            newfont = 'sans';
            if(element.classList.contains('serif')){
                element.classList.toggle('serif')
            }
        break;
        case 'sans':
            newfont = 'mono';
            if(element.classList.contains('sans')){
                element.classList.toggle('sans')
            }
        break;
        case 'mono':
            newfont = 'serif';
            if(element.classList.contains('mono')){
                element.classList.toggle('mono')
            }
        break;
        default:
            newfont = 'serif';
        break;
    }
    element.classList.toggle(newfont)
    */
    //localStorage.setItem('f-family', newfont);

}

function setFont(fontname){
    var element = document.body;

    if(element.classList.contains('serif')){
        element.classList.toggle('serif')
    }
    if(element.classList.contains('sans')){
        element.classList.toggle('sans')
    }
    if(element.classList.contains('mono')){
        element.classList.toggle('mono')
    }
    if(element.classList.contains('ia')){
        element.classList.toggle('ia')
    }

    element.classList.toggle(fontname);

    localStorage.setItem('f-family', fontname);
}

//toggleSwitch.addEventListener('change', switchTheme, false);


function toggleBook(){
    var theme = localStorage.getItem('book');
    var body = document.getElementById("mybody"); //document.body;
    /*var content = document.getElementById("bookcontent");*/
    var htmlcolor = document.body;
    var nav = document.querySelector("nav");

    var h1 = document.querySelector("h1");

    var con = document.getElementById("book");
        
    body.classList.toggle("bookbody");
    htmlcolor.classList.toggle("bookbackground");
    nav.classList.toggle("nav-book");
    h1.classList.toggle("h-book");

    if(con)
        con.classList.toggle("book");

    if (theme == 'true') {
        localStorage.setItem('book', 'false');
    }
    else {        
        localStorage.setItem('book', 'true');
    }  
}

function Copy(text){
    navigator.clipboard.writeText(text);
}