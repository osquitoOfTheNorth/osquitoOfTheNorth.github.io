
var cursorbgColor = "grey";
var shellTextArray = ["Oscar = new Oscar()",
                      "Oscar.Location",
                      "\"Toronto, ON, Canada\"",
                      "Oscar.University",
                      "\"University Of Toronto\"",
                      "Oscar.FieldOfStudy",
                      "\"Computer Science and Economics\"",
                      "Oscar.Interests",
                      "[\"code\", \"cooking\", \"music\", \"travel\", \"food\" ]",
                      "Oscar.WorkExperience",
                      "[{ <br> <p id=\"indent\"> company:\"SapientRazorfish\"<br>role: \"Associate Mobile Applications Developer\"<br>startDate:\"July 2016\"<br>endDate: null </p>}," +
                        "{ <br> <p id=\"indent\"> company:\"RBC Capital Markets\"<br>role: \"Technical Systems Analyst\"<br>startDate:\"May 2014\"<br>endDate: Sept 2015 </p>}];",
                      "Oscar.Resume",
                      "<a class=\"link\" href=\"./Oscar Menjivar Resume 2015 v3.docx\">\"oscarmenjivar.doc\"</a>",
                      "Oscar.email",
                      "\"oscarmenj02@gmail.com\"",
                      "Oscar.socialMedia",
                      "[\"<a class=\"link\" href=\"https://github.com/osquitoOfTheNorth\">GitHub</a>\", \"<a class=\"link\" href='http://www.linkedin.com/profile/view?id=217534388&amp;trk=nav_responsive_tab_profile_pic'>LinkedIn</a>\", \"<a class=\"link\" href='http://oscarandthoughts.postach.io/' >Blog</a>\" ]"
                      ];
var shellLineIdentifiers = ["1Declaration", "2Declaration", "3Declaration", "4Declaration", "5Declaration", "6Declaration", "7Declaration",
                            "8Declaration", "9Declaration", "10Declaration", "11Declaration", "12Declaration", "13Declaration","14Declaration","15Declaration",
                            "16Declaration","17Declaration","18Declaration","19Declaration"];

var currentLine;
var cursorInterval;
var characterNumber = 0;
var lineNumber = 0;
var shellLineIdsIndex = 0;
var currentShellIdString;
var animationDone = false;
var animationStarted = false;
var isFirstTime = true;
jQuery(document).ready(function ($) {
    var links = $('.navigation').find('li');
    slide = $('.slide');
    button = $('.button');
    mywindow = $(window);
    htmlbody = $('html,body');


    function goToByScroll(dataslide) {
        htmlbody.animate({
            scrollTop: $('.slide[data-slide="' + dataslide + '"]').offset().top
        }, 2000, 'easeInOutQuint');
    }



    //When the user clicks on the navigation links, get the data-slide attribute value of the link and pass that variable to the goToByScroll function
    links.click(function (e) {
        e.preventDefault();
        dataslide = $(this).attr('data-slide');
        goToByScroll(dataslide);
    });

    //When the user clicks on the button, get the get the data-slide attribute value of the button and pass that variable to the goToByScroll function
    button.click(function (e) {
        e.preventDefault();
        dataslide = $(this).attr('data-slide');
        goToByScroll(dataslide);

    });
    //do stuff when scrolling to this element, waypoints library helps with this!

    var waypoint =  new Waypoint({
                        element: document.getElementById('slide2'),
                        handler: function(direction) {
                            if(direction == "down" && (animationDone || !animationStarted)){
                                if(!isFirstTime){
                                    ClearShell();
                                    ToggleDisplay();
                                }
                                startShellAnimation();
                            }
                        },
                        offset: 25
                    });
    //if scrolling back up to second slide animate the shell again.
    var waypoint2 = new Waypoint({
                    element:document.getElementById('slide3'),
                    handler:function(direction){
                        if(direction == "up"  && (animationDone || !animationStarted)){
                            if(!isFirstTime){
                                ClearShell();
                                ToggleDisplay();
                            }
                            startShellAnimation();
                        }
                    }

    });
    
});

function ToggleDisplay(){
     $("#mypic").animate({
        marginLeft:"100%"
    },{
        duration:1500,
        complete:function(){
            $("#information").css("margin", "0 auto");
            $("#information").css("display","inherit");    
            $("#information").animate({
            width: "50%",
            height: "100%",
            opacity: 1
            },1500);
        }
    });


}
function clearShellTextDisplayNewMessage(){
    clearInterval(cursorInterval);
    $("#mypic").css("display","none");
    $("#information").animate({
            opacity:0,
            height:0,
            width:0
            },
            {
                duration:1500,
                complete:function(){ClearShell(); $("#information").css("display","none"); DisplayNewMessageWithPicture();}
            });
}

function DisplayNewMessageWithPicture(){
    $("#mypic").css("display","flex");
    $("#mypic").animate({
        marginLeft:"0%"
    },1500);
}
function ClearShell(){

    $("#information").html("Python 3.4.3<br />Type \"help\", \"copyright\", \"credits\", or \"license\" for more information. <br /><div class=\"shellLine\" id=\"1Declaration\"></div><div id=\"cursor\"></div>");
    characterNumber = 0;
    lineNumber = 0;
    shellLineIdsIndex = 0;
    animationStarted = false;
    animationDone = true;
}

function getNextCursorColor(){

    if(cursorbgColor == "grey")
    {
        cursorbgColor = "#313131";
    }
    else
    {
        cursorbgColor = "grey";
    }
    return cursorbgColor;
}
function animateCursorColor(){
    cursorbgColor = getNextCursorColor();
    $("#cursor").animate(
            {
                backgroundColor:cursorbgColor
            },
            {
                duration:150,
                complete:function(){typeLine();}
            }
    );

}
//mimicks the shell responding to a statement typed into it
function outputLine(l)
{
    $("#" + currentShellIdString).append(l);
    resetAndGoToNextLine(true);
    addTextToShell();
}
function typeLine()
{
    if(characterNumber == 0 && currentShellIdString !== "1Declaration")
    {
        $("#" + currentShellIdString).append(">>>  ");
    }
    if(characterNumber < currentLine.length )
    {
        var c = currentLine[characterNumber];
        $("#" + currentShellIdString).append(c);
        characterNumber++;
        animateCursorColor();
    }
    else
    {
        if(currentShellIdString === "1Declaration"){
            resetAndGoToNextLine(true);
        }
        else{
            resetAndGoToNextLine(false);
        }

        addTextToShell();
    }
}
//This function animates the cursor at the beginning before any typing
//TODO: Get Rid of this, Blinking cursor should be its own functionality.

function dostartingCursorAnimation()
{
    console.log("animation!");
    cursorbgColor = getNextCursorColor();
     $("#cursor").animate(
            {
                backgroundColor:cursorbgColor
            },
            {
                duration:100
            }
    );
}


function startShellAnimation(){
    animationStarted = true;
    animationDone = false;
    isFirstTime = false;
    $("#1Declaration").append(">>>  ");
    cursorInterval =  window.setInterval(dostartingCursorAnimation,100);
    window.setTimeout(addTextToShell,1000);
}
function addTextToShell(){
    clearInterval(cursorInterval)
    var line = shellTextArray[lineNumber];
    if(line === undefined){
        //End the recursion array bounds exceeded
        animationDone = true;
        //still want blinking cursor
        cursorInterval =  window.setInterval(dostartingCursorAnimation,100);
        window.setTimeout(clearShellTextDisplayNewMessage,3000);
        return;
    }
    currentLine = line.split('');
    currentShellIdString = shellLineIdentifiers[shellLineIdsIndex];
    characterNumber = 0;
    if(lineNumber%2 == 1 || lineNumber == 0)
    {
        typeLine();
    }
    else
    {
        outputLine(line)
    }

}
function resetAndGoToNextLine(IsTyped){
    var className;
    lineNumber++;
    shellLineIdsIndex++;
    var id = shellLineIdentifiers[shellLineIdsIndex];
    if(IsTyped ==  true){
        className="shellLine"
    }
    else{
        className="shellLineResponse"
    }
    $("#cursor").remove();
    $("#information").append("<br />");
    $("#information").append("<div id=\"" + id + "\" class=\"" + className + "\" >");
    $("#information").append("<div id=\"cursor\" ></div>");

}

