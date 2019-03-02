//cabinet open
#pragma strict
var Door_1 : GameObject;
var Door_2 : GameObject;
var speed : float = 30.0f;
var event_open : boolean = false;
var openDegree : float = 180;
var openTime : float = 5.3f;
var openingSound : AudioClip;
var openingSoundVol : float = 1.0f;
private var ads : AudioSource;
private var door1T : Transform;
private var door2T : Transform;

function Awake () {
	door1T = Door_1.transform;
	door2T = Door_2.transform;
}

function FixedUpdate () {
	if(Input.GetKeyDown(KeyCode.A)){
		StartCoroutine(messageReceiver());
	}
	if(event_open)
	{
		door1T.Rotate(Vector3(0,0,1)*Time.deltaTime * speed);
		door2T.Rotate(Vector3(0,0,1)*Time.deltaTime * speed);
	}
}

function messageReceiver () {
	ads = gameObject.AddComponent.<AudioSource>();
	ads.PlayOneShot(openingSound,openingSoundVol);
	event_open = true;
	yield WaitForSeconds(openTime);
	event_open = false;
	Destroy(GetComponent.<BoxCollider>());
	this.enabled = false;
	
}