var buttons = document.getElementsByClassName("button");
var display = document.getElementById("displayy")
var operand1 = 0;
var operand2 = null;
var operator = null;
/*
function dataa()
{
    var value = this.getAttribute('data-value');
    if(value == '+')
    {

    }
    else if(value == '=')
    {

    }
    else
    {
        display.innerText += value;
    }

}
for(var i=0; i<buttons.length;i++)
{
    buttons[i].addEventListener('click',dataa);
}
*/
for(var i=0; i<buttons.length;i++)
{
    buttons[i].addEventListener('click', function()
    {
        var value = this.getAttribute('data-value');
        if(value == '+' || value == '-' || value=='*' || value == '/')
        {
            operand1 = parseFloat(display.textContent);
            display.innerText = "";
            operator = value;
                
        }
        else if(value == '=')
        {
            operand2 = parseFloat(display.textContent);
            var str = operand1 + " " + operator + " " + operand2;
            var result = eval(str);
            display.innerText = result;
        }
        else if(value == 'AC')
        {
            display.innerText = "";
        }
        else
        {
            display.innerText += value;
        }
    
    });
}