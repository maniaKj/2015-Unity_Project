#pragma strict
var system : GameObject;
var Text : GameObject;
var Back : GameObject;
var alphaSpeed : float = 1.0f;
private var alphaLerpT : float = 1.0f;
private var textBool : boolean = false;
private var alphaLerpB : float = 1.0f;
private var backBool : boolean = false;

function FixedUpdate () {
	if(textBool){
		alphaLerpT -= alphaSpeed * Time.deltaTime;
		Text.GetComponent.<UI.Image>().color.a = alphaLerpT;
		if(alphaLerpT < 0.0f){
			textBool = false;
			Destroy(Text.gameObject);
		}
	}
	
	if(backBool){
		alphaLerpB -= alphaSpeed * Time.deltaTime;
		Back.GetComponent.<UI.Image>().color.a = alphaLerpB;
		if(alphaLerpB < 0.0f){
			backBool = false;
			Destroy(Back.gameObject);
		}
	}
}

function alphaLost(i : int){
	switch(i){
		case 0 :
			textBool = true;
			break;
		case 1 :
			backBool = true;
			break;
	}
}

function clickOn (){
	system.SendMessage("clickPossibility",true);
}

function clickOff (){
	system.SendMessage("clickPossibility",false);
}

function Destroy(){
	Destroy(gameObject);
}