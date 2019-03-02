#pragma strict
var mouseClickTexture : Texture2D;
var mouseClickTexture2 : Texture2D;
var cursorMode : CursorMode = CursorMode.Auto;
var clickPossible : boolean = true;
var clickNum : int;
var objNum : int;
private var clickDelay : float = 0.1f;
private var nextClickDelay : float = 0.1f;
private var systemObj : GameObject;
var hotspot : Vector2 = Vector2.zero;
private var clickCountC : boolean = true;

function Awake () {
	systemObj = GameObject.FindGameObjectWithTag("GameController");
}

function OnMouseDown() {
	if(clickPossible)
	if(clickCountC)
	StartCoroutine(clickCount());
}

function OnMouseEnter() {
	Cursor.SetCursor(mouseClickTexture, hotspot, cursorMode);
}

function OnMouseExit() {
	Cursor.SetCursor(mouseClickTexture2, hotspot, cursorMode);
}

function clickCount() {
	clickCountC = false;
	yield WaitForSeconds(clickDelay);
	systemObj.SendMessage("getClickSignal",objNum);
	clickNum++;
	yield WaitForSeconds(nextClickDelay);
	clickCountC = true;
}

function clickOnOff(OnOff : int) {
	switch(OnOff){
	case 0 :
		clickPossible = false;
		break;
		case 1 :
		clickPossible = true;
		break;
		case 2 :
		clickPossible = !clickPossible;
		break;
		}
}