#pragma strict
var swingObj : GameObject;
var swingSpeed : float =5.0f;
var eventOn : boolean = false;
var waitTime : float = 2.0f;
var swingSound : AudioClip;
var swingSoundVol : float = 1.0f;
private var objT : Transform;
private var swingDir : int = 1;
private var rotationTo : Quaternion;
private var rotationFrom : Quaternion;
private var ads : AudioSource;
function Awake () {
	objT = swingObj.transform;
	rotationTo = objT.rotation;
	objT.rotation.eulerAngles = Vector3(0,-360,0);
	rotationFrom = objT.rotation;
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
		if(swingDir == 1)
		objT.rotation = Quaternion.Slerp(objT.rotation, rotationTo, Time.deltaTime * swingSpeed);
		else
		objT.rotation = Quaternion.Slerp(objT.rotation, rotationFrom, Time.deltaTime * swingSpeed);
	}
}

function messageReceiver() {
	eventOn = true;
	ads.PlayOneShot(swingSound,swingSoundVol);
	yield WaitForSeconds(waitTime);
	swingDir = 2;
	ads.PlayOneShot(swingSound,swingSoundVol);
	yield WaitForSeconds(waitTime);
	eventOn = false;
	this.enabled = false;
}