#pragma strict
var before_scale : float = 210.0f;
var after_scale : float = 78.0f;
var scaleSpeed : float = 30.0f;
var cuttonSound : AudioClip;
var cuttonSoundVol : float = 1.0f;
private var lerpVal : float = 0.0f;
private var eventOn : boolean = false;
private var myT : Transform;
private var ads : AudioSource;

function Awake(){
	ads = gameObject.AddComponent.<AudioSource>();
	myT = transform;
}
	
function FixedUpdate () {
	if(Input.GetKeyDown(KeyCode.A)){
		messageReceiver();
	}
	
	if(eventOn){
		lerpVal += scaleSpeed * Time.deltaTime;
		myT.transform.localScale.x = Mathf.Lerp(before_scale,after_scale,lerpVal);
		if(lerpVal > 1.0f){
			eventOn = false;
			this.enabled = false;
		}
	}
}

function messageReceiver(){
	ads.PlayOneShot(cuttonSound,cuttonSoundVol);
	eventOn = true;
}