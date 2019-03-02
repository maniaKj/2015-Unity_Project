//blood water in toilet
#pragma strict
var eventOn : boolean = false;
var speed : float = 1.0f;
var moveDown : float = 6.0f;
private var lastPosition : float;

function Awake () {
	lastPosition = transform.localPosition.y;
	transform.localPosition.y = transform.localPosition.y - moveDown;
	//transform.position = Vector3.(transform.position.x, transform.position.y - moveDown, transform.positoin.z);
}

function FixedUpdate () {
	if(Input.GetKeyDown(KeyCode.A)){
		messageReceiver();
	}
	if(eventOn){
		transform.localPosition.y += speed* Time.deltaTime;
		if(transform.localPosition.y >= lastPosition){
			eventOn =false;
			this.enabled = false;
		}
	}
}

function messageReceiver() {
	eventOn = true;
}