#pragma strict
var appearTime : float = 0.8f;
var filmEffectA : float = 0.8f;
var filmEObj : UI.Image;
var blackBackObj : GameObject;
var ghostSound : AudioClip;
var ghostSoundVol : float = 1.0f;
var heartSound : GameObject;
private var blackBackAnim : Animator;
private var eventOn : boolean = false;
private var ads : AudioSource;
private var filmEffectLA : float;

function Awake () {
	filmEffectLA = filmEObj.color.a;
	blackBackAnim = blackBackObj.GetComponent.<Animator>();
}

function FixedUpdate() {
	if(Input.GetKeyDown(KeyCode.A)){
		messageReceiver();
	}
}

function messageReceiver() {
	ads = gameObject.AddComponent.<AudioSource>();
	if(heartSound != null)
	heartSound.SetActive(true);
	ads.PlayOneShot(ghostSound,ghostSoundVol);
	eventOn = true;
	filmEObj.color.a = filmEffectA;
	blackBackAnim.SetBool("setBool",true);
	yield WaitForSeconds(appearTime);
	blackBackAnim.SetBool("setBool",false);
	filmEObj.color.a = filmEffectLA;
	Destroy(ads);
	gameObject.SetActive(false);
}