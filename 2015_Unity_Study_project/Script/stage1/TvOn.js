#pragma strict
var tvImage : Texture[];
var waitTime : float = 3.0f;
var changeTo : int = 1;
var OnSound : AudioClip;
var OffSound : AudioClip;
var OnSoundVol : float = 1.0f;
var OffSoundVol : float = 1.0f;
var noiseSound : AudioClip;
var noiseSoundVol : float = 1.0f;
private var rend : Renderer;
private var ads : AudioSource;

function Awake () {
	ads = gameObject.AddComponent.<AudioSource>();
	rend = GetComponent.<Renderer>();
	ads.clip = noiseSound;
}

function messageReceiver() {
	rend.material.mainTexture = tvImage[changeTo];
	ads.PlayOneShot(OnSound,OnSoundVol);
	if(changeTo == 2)
	ads.Play();
	yield WaitForSeconds(waitTime);
	rend.material.mainTexture = tvImage[0];
	ads.Stop();
	ads.PlayOneShot(OffSound,OffSoundVol);
	this.enabled = false;
}