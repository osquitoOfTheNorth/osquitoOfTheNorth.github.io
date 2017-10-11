
function Console(configuration){
    var TextArrayLength;
    var CurrentLineNumber = 0;
    var LineIdentifiers = [];
    //an array of text to type
    var text;
    var intervalSpeed;
    var cursorBlinkSpeed;
    var target;
    var textColor;
    var cursorColor;
    var currentCursorColor;
    var typeResponseModeEnabled;
    var animationDone = false;
    //GIANT TODO: CHECK FOR BOUNDS!!
    if(configuration.text !== undefined)
    {
        text = configuration.text;
        TextArrayLength = text.length;
        BuildLineIdentifiersArray(TextArrayLength);
    }
    if(configuration.target !== undefined)
    {
        //a javascript object representing the div that will act as container for shell.
        target = configuration.target;
    }

    if(configuration.speed !== undefined)
    {
        intervalSpeed = configuration.speed;
    }
    else
    {
        //default speed is 1 charachter per 200 ms.
        intervalSpeed = 200    
    };

    if(configuration.cursorBlinkSpeed !== undefined)
    {
        cursorBlinkSpeed = configuration.cursorBlinkSpeed;
    }
    else
    {
        //cursor will blink every 100 ms.
        cursorBlinkSpeed = 100;
    }
    if(configuration.textColor !== undefined)
    {
        textColor = configuration.textColor;
    }
    else
    {
        textColor = "black";
    }

    if(configuration.cursorColor !== undefined)
    {
        cursorColor = configuration.cursorColor;
    }
    else
    {
        cursorColor = "gray";
    }

    this.RunConsole = function(){

        SetupAndRun();
    };



    function AddText()
    {
            var line = text[CurrentLineNumber];
            if(line === undefined){
                //End the recursion array bounds exceeded, place cursor at bottom.
                animationDone = true;
                ResetCursorMoveToNextLine();
                PlaceCursorOnDom();
                
                return;
            }
            currentLine = line.split('');
            currentShellIdString = LineIdentifiers[CurrentLineNumber];
            characterNumber = 0;
            PlaceTextLineSectionOnDom(currentShellIdString);
            PlaceCursorOnDom();
            typeLine(currentLine, currentShellIdString, characterNumber);

    }
    function getNextCursorColor()
    {

        if(currentCursorColor == "white")
        {
            currentCursorColor = cursorColor;
        }
        else
        {
            currentCursorColor = "white";
        }
        return currentCursorColor;
    }
    
    function BlinkCursor()
    {
        cursorbgColor = getNextCursorColor();
         $("#cursor").animate({backgroundColor:cursorbgColor},{duration:150});
    }

    function BuildLineIdentifiersArray(NumLines)
    {
        for(var i = 0; i < NumLines; i++)
        {
            LineIdentifiers.push("ShellLineNumber" + i);
        }
    }

    function typeLine(currentLine, currentLineIdentifier, currentCharacterNumber)
    {
        if(currentCharacterNumber == currentLine.length)
        {
            ResetCursorMoveToNextLine();
            AddText();
            return;
        }
        else
        {
            var c = currentLine[characterNumber];
            $("#" + currentLineIdentifier).append(c);
            characterNumber++;
            window.setTimeout(function() { typeLine(currentLine,currentLineIdentifier,characterNumber); },intervalSpeed);
        }
    }


    function PlaceCursorOnDom()
    {
        target.append("<div style=\"background-color: " + cursorColor + ";\" id=\"cursor\" ></div>");
    }

    function PlaceTextLineSectionOnDom(currentShellIdString)
    {

        target.append("<div class=\"shellLine\" style=\" color:" + textColor + "; \" id=\"" + currentShellIdString + "\"></div>");
    }
    function SetupAndRun()
    {
        target.css("white-space","nowrap");
        window.setInterval(BlinkCursor, cursorBlinkSpeed);
        AddText();
    }

    function ResetCursorMoveToNextLine()
    {
        CurrentLineNumber++;
        $("#cursor").remove();
        if(!animationDone)
        {
            target.append("<br />");
        }
    }


}



