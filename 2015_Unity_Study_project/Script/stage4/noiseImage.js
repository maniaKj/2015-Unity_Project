#pragma strict
var myAnim : Animator;
private var currentState : AnimatorStateInfo;
private var eventOn : boolean = false;
private var animC : boolean = true;

function Awake () {
	myAnim = GetComponent.<Animator>();
	currentState = myAnim.GetCurrentAnimatorStateInfo(0);
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
			myAnim.SetBool("setBool",false);
		}
		else if(myAnim.GetBool("setBool") == false){
			eventOn = false;
			this.enabled = false;
			Destroy(gameObject);
		}
	}
}

function messageReceiver(){
	//click Stop message sending please
	eventOn = true;
	myAnim.enabled = true;
}

function animTest(){
	animC = false;
	currentState = myAnim.GetCurrentAnimatorStateInfo(0);
	yield WaitForSeconds(1.0f);
	animC= true;
}