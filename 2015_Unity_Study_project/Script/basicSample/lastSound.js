#pragma strict
var waterDrip : AudioClip;
var waterDripVol : float = 1.0f;
var breakSound : AudioClip;
var breakSoundVol : float = 1.0f;

private var ads : AudioSource;

function Awake(){
	ads = GetComponent.<AudioSource>();
}

function messageReceiver(i : int) {
	switch(i){
		case 0 :
			ads.PlayOneShot(waterDrip,waterDripVol);
			Destroy(gameObject,0.2f + waterDrip.length);
			break;
		case 1 :
			ads.PlayOneShot(breakSound, breakSoundVol);
			Destroy(gameObject,0.2f + breakSound.length);
			break;
	}
}