//blood spread on carpet
#pragma strict
var ball : GameObject[];
var ACvalue : float = 1.0f;
var ACspeed : float = 3.0f;
var eventOn : boolean = false;
var effectSound : AudioClip;
var effectSoundVol : float = 1.0f;
private var ads : AudioSource;

private var rend : Renderer;

function Awake () {
	ads = gameObject.AddComponent.<AudioSource>();
	rend = GetComponent.<Renderer>();
}

function FixedUpdate (){
	if(Input.GetKeyDown(KeyCode.A)){
		messageReceiver();
	}

	if(eventOn){
		ACvalue = Mathf.Lerp(ACvalue,0.03f,Time.deltaTime * ACspeed);
		rend.material.SetFloat("_Cutoff",ACvalue );
		if(ACvalue <= 0.35f)
		this.enabled = false;
	}
	
}

function messageReceiver() {
	eventOn = true;
	ads.PlayOneShot(effectSound,effectSoundVol);
}