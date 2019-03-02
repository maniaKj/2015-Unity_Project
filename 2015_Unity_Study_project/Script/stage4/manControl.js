#pragma strict
var theMan : GameObject;
var otherMan : GameObject;
var materialObj : GameObject;
var newSkin : Texture;
var noiseImage : GameObject;
var noiseSound : AudioClip;
var noiseSoundVol : float = 1.0f;
var interval : float = 2.0f;
private var Rend : Renderer;
private var lastSkin : Texture;
private var ads : AudioSource;
//private var anim : Animator;
//private var currentState : AnimatorStateInfo;

function Awake () {
	ads = gameObject.AddComponent.<AudioSource>();
	//anim = GetComponent.<Animator>();
	Rend = materialObj.GetComponent.<Renderer>();
	lastSkin = Rend.material.mainTexture;
}

function FixedUpdate () {
	if(Input.GetKeyDown(KeyCode.A)){
		messageReceiver();
	}
}

function messageReceiver(){
	//anim.enabled = true;
	wakeUp();
	yield WaitForSeconds(interval);
	down();
}

function wakeUp() {
	noiseImage.GetComponent.<UI.Image>().color.a = 0.5f;
	otherMan.GetComponent.<Renderer>().material.mainTexture = newSkin;
	otherMan.SetActive(true);
	theMan.SetActive(false);
	ads.PlayOneShot(noiseSound,noiseSoundVol);
}

function down() {
	Destroy(ads);
	otherMan.SetActive(false);
	theMan.SetActive(true);
	noiseImage.GetComponent.<UI.Image>().color.a = 0.0f;
	Rend.material.mainTexture = lastSkin;
}