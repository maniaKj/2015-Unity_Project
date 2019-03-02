#pragma strict
var eventOn : boolean = false;
var handlerSound : AudioClip;
var handlerSoundVol : float = 1.0f;
private var anim : Animator;
private var currentState : AnimatorStateInfo;
private var animC : boolean = true;
private var ads : AudioSource;

function Awake () {
	ads = gameObject.AddComponent.<AudioSource>();
	anim = GetComponent.<Animator>();
	currentState = anim.GetCurrentAnimatorStateInfo(0);
}

function FixedUpdate () {
	if(Input.GetKeyDown(KeyCode.A)){
		messageReceiver();
	}
	if(eventOn){
		if(animC)
		StartCoroutine(animTest());
		if(currentState.nameHash != Animator.StringToHash("Base Layer.New State"))
		{
			anim.SetBool("setBool",false);
		}
		else if(anim.GetBool("setBool") == false){
			eventOn = false;
			anim.enabled = false;
			this.enabled = false;
		}
	}
}

function messageReceiver() {
	eventOn = true;
	anim.enabled = true;
	anim.SetBool("setBool", true);
}

function animSound () {
	ads.PlayOneShot(handlerSound,handlerSoundVol);
}

function animTest(){
	animC = false;
	currentState = anim.GetCurrentAnimatorStateInfo(0);
	yield WaitForSeconds(1.0f);
	animC= true;
}