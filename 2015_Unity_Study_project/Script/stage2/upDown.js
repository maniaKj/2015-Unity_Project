//head up and down in tub
#pragma strict
var eventOn : boolean = false;
var thisSound : AudioClip;
var thisSoundVol : float = 1.0f;
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
			this.enabled = false;
			Destroy(gameObject);
		}
	}
}

function messageReceiver() {
	eventOn = true;
	anim.SetBool("setBool", true);
	ads.PlayOneShot(thisSound,thisSoundVol);
}

function animTest(){
	animC = false;
	currentState = anim.GetCurrentAnimatorStateInfo(0);
	yield WaitForSeconds(1.0f);
	animC= true;
}