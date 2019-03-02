//flower color change
#pragma strict
var colorObj : GameObject;
var colorSpeed : float =5.0f;
var eventOn : boolean = false;
var changeColor : Color = Color.red;
var waitTime : float = 2.0f;
var effectSound : AudioClip;
var effectSoundVol : float = 1.0f;
private var rend : Renderer;
private var ads : AudioSource;
function Awake () {
	rend = colorObj.GetComponent.<Renderer>();
	if(GetComponent.<AudioSource>() != null)
	ads = GetComponent.<AudioSource>();
	else
	ads = gameObject.AddComponent.<AudioSource>();
}

function FixedUpdate () {
	if(Input.GetKeyDown(KeyCode.A)){
		StartCoroutine(messageReceiver());
	}
	if(eventOn){
		rend.material.color = Color.Lerp(rend.material.color, changeColor, Time.deltaTime * colorSpeed);

	}
}

function messageReceiver() {
	eventOn = true;
	ads.PlayOneShot(effectSound,effectSoundVol);
	yield WaitForSeconds(waitTime);
	eventOn = false;
	this.enabled = false;
}