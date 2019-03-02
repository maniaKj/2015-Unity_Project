//set fire particle on the photo
#pragma strict
var burningLight : Light;
var lightingSpeed : float = 2.0f;
private var lastIntensity : float;
private var eventOn : boolean = false;

function Awake () {
	lastIntensity = burningLight.intensity;
	burningLight.intensity = 0.0f;
}

function FixedUpdate () {
	if(Input.GetKeyDown(KeyCode.A)){
		messageReceiver();
	}
	
	if(eventOn){
		burningLight.intensity += lightingSpeed * Time.deltaTime;
		if(burningLight.intensity >= lastIntensity){
			this.enabled = false;
		}
	}
}

function messageReceiver() {
	eventOn = true;
}