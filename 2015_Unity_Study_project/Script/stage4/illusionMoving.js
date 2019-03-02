//ghost moving
#pragma strict
var startObj : Transform;
var targetObj : Transform;
var speed : float = 1.0f;
private var startPos : Vector3;
private var targetPos : Vector3;
private var lerpVal : float;
private var eventOn : boolean = false;

function Awake(){
	startPos = startObj.position;
	targetPos = targetObj.position;
}

function FixedUpdate () {
	if(Input.GetKeyDown(KeyCode.A)){
		messageReceiver();
	}
	
	if(eventOn){
		lerpVal += speed * Time.deltaTime;
		transform.position = Vector3.Lerp(startPos,targetPos,lerpVal);
		if(lerpVal >= 1.0f){
			eventOn = false;
			this.enabled = false;
		}
	}
}

function messageReceiver(){
	eventOn = true;
}