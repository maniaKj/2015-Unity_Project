#pragma strict
var dropforceValue : float = 200.0f;
var attackforceValue : float = 230.0f;
var TorqueForceValue : float = 200.0f;
var TorqueForce2Value : float = 500.0f;
var liquidSpread : GameObject;
var floor : GameObject;
var throwSound : AudioClip;
var throwSoundVol : float = 1.0f;
var collideSound : AudioClip;
var collideSoundVol : float = 1.0f;
var throwSound2 : AudioClip;
var throwSound2Vol : float = 1.0f;
var lastSound : GameObject;

private var rb : Rigidbody;
private var pc : boolean = true;
private var pc2 : boolean = true;
private var ads : AudioSource;
private var soundOneTime : boolean = true;
function FixedUpdate() {
	if(Input.GetKeyDown(KeyCode.A)&&pc){
		messageReceiver();
		pc = false;
	}
	if(Input.GetKeyDown(KeyCode.S)&&pc2&&!pc){
		messageReceiver2();
		pc2 = false;
	}
}

function messageReceiver(){
	ads = gameObject.AddComponent.<AudioSource>();
	rb = gameObject.AddComponent.<Rigidbody>();
	//yield WaitForSeconds(1.0f);
	ads.PlayOneShot(throwSound,throwSoundVol);
	rb.AddForce(transform.forward * dropforceValue);
	rb.AddTorque(Vector3(TorqueForceValue,100,100));
}

function messageReceiver2(){
	yield WaitForSeconds (1.0f);
	rb.useGravity = false;
	rb.AddForce((Camera.main.transform.position - transform.position) * attackforceValue);
	rb.AddTorque(Vector3(TorqueForceValue,100,100));
	ads.PlayOneShot(throwSound2,throwSound2Vol);
}

function OnCollisionEnter(col : Collision){
	if(col.gameObject == floor.gameObject && soundOneTime){
		ads.PlayOneShot(collideSound,collideSoundVol);
		soundOneTime = false;
	}
	
	if(col.gameObject.tag == "Finish"){
		liquidSpread.SetActive(true);
		var c = Instantiate(lastSound, transform.position, Quaternion.identity);
		c.GetComponent.<lastSound>().messageReceiver(1);
		Destroy(gameObject, 1.0f);
	}
}