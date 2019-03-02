#pragma strict
var moveUp : float = 4.0f;
var speed : float = 2.0f;
var rabbitDoll : GameObject;
var rabbitDollChange : GameObject;
var bloodSplatter : GameObject;
var knifeSound : AudioClip;
var knifeSoundVol : float = 1.0f;
private var lastPosition : float;
private var eventOn : boolean = false;
private var ads : AudioSource;
function Awake () {
	ads = gameObject.AddComponent.<AudioSource>();
	lastPosition = transform.localPosition.y;
	transform.localPosition.y += moveUp;
}

function FixedUpdate () {
	if(Input.GetKeyDown(KeyCode.A)){
		messageReceiver();
	}

	if(eventOn){
		transform.localPosition.y -= speed * Time.deltaTime;
		if(transform.localPosition.y < lastPosition){
			ads.PlayOneShot(knifeSound,knifeSoundVol);
			rabbitDoll.SetActive(false);
			rabbitDollChange.SetActive(true);
			bloodSplatter.SetActive(true);
			this.enabled = false;
		}
	}
}

function messageReceiver(){
	eventOn = true;
}