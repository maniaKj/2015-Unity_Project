#pragma strict
var ghostFACE : GameObject;
var noiseObj : GameObject;
var sound : AudioClip;
var soundVol : float = 1.0f;
private var ads : AudioSource;
private var noiseImage : UI.Image;

function Awake() {
	ads = gameObject.AddComponent.<AudioSource>();
	noiseImage = noiseObj.GetComponent.<UI.Image>();
}

function messageReceiver(){
	ghostFACE.SetActive(true);
	noiseObj.SetActive(true);
	//anim.enabled = true;
	ads.PlayOneShot(sound,soundVol);
	letsscare();
}

function faceUp(){
	noiseImage.color.a = 0.0f;
}

function noiseUp(){
	noiseImage.color.a = 1.0f;
}

function letsscare(){
	yield WaitForSeconds(0.05f);
	noiseUp();
	yield WaitForSeconds(0.02f);
	faceUp();
	yield WaitForSeconds(0.13f);
	noiseUp();
	yield WaitForSeconds(0.08f);
	faceUp();
	yield WaitForSeconds(0.2f);
	noiseUp();
	yield WaitForSeconds(0.08f);
	faceUp();
	yield WaitForSeconds(0.17f);
	noiseUp();
	yield WaitForSeconds(0.08f);
	faceUp();
	yield WaitForSeconds(0.15f);
	noiseUp();
	yield WaitForSeconds(0.07f);
	faceUp();
	yield WaitForSeconds(0.20f);
	noiseUp();
	yield WaitForSeconds(0.04f);
	faceUp();
	yield WaitForSeconds(0.2f);
	Application.Quit();
}