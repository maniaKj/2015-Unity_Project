#pragma strict
var TimeToDestroy : float = 2.5f;
var interval : float = 0.3f;
var noiseBack : GameObject;

function messageReceiver(){
	noiseBack.GetComponent.<UI.Image>().color.a = 1.0f;
	yield WaitForSeconds(interval);
	noiseBack.GetComponent.<UI.Image>().color.a = 0.5f;
	yield WaitForSeconds (TimeToDestroy);
	noiseBack.GetComponent.<UI.Image>().color.a = 1.0f;
	Destroy(gameObject);
	yield WaitForSeconds(interval);
	noiseBack.GetComponent.<UI.Image>().color.a = 0.0f;
}