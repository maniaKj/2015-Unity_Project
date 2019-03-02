//particle && others destroy or set active false
#pragma strict
var Destime : float = 7.0f;
var donActTime : float = 1.0f;
function messageReceiver(){
	//destroy
	Destroy(gameObject, Destime);
}

function messageReceiver2() {
	//active false
	yield WaitForSeconds(donActTime);
	gameObject.SetActive(false);
}

function messageReceiver3() {
	//only invisible
	yield WaitForSeconds(donActTime);
	gameObject.GetComponent.<UI.Image>().color.a = 0.0f;
}