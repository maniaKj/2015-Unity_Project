#pragma strict
//쪽지 등에 사용할 수 있는 이미지 올렸다 내리기
var isOn : boolean = false;
private var imageIdle : boolean = true;
var moveTime : float = 0.1f;
var downSpeed : float = 500.0f;
var targetPositionY : float = 0.0f;
var sprite : Sprite[];
var delay : float = 0.3f;
var callBackdelay : float = 0.2f;
var paperSound : AudioClip;
var paperSoundVol : float = 1.0f;
var paperDownSound : AudioClip;
var paperDownSoundVol : float = 1.0f;

private var lastPositionY : float;
private var systemObj : GameObject;
private var rectT : RectTransform;
private var clickRecC : boolean = true;
var spriteNum : int = -1;
private var ads : AudioSource;

function Awake () {
	spriteNum = -1;
	lastPositionY = gameObject.GetComponent.<RectTransform>().anchoredPosition.y;
	rectT = gameObject.GetComponent.<RectTransform>();
	systemObj = GameObject.FindGameObjectWithTag("GameController");
	ads = gameObject.AddComponent.<AudioSource>();
}

function FixedUpdate () {
	if(!isOn) {
		if(imageIdle)
		imageOn(1);
		else
		imageOn(-1);
	}
	if(Input.GetMouseButtonDown(0)){
		StartCoroutine(clickRec());
	}
}

function imageOn (dir : int) {
	var vel : float;
	if(dir == 1){
		rectT.anchoredPosition.y = Mathf.SmoothDamp(rectT.anchoredPosition.y,targetPositionY,vel,moveTime);
		if(targetPositionY - rectT.anchoredPosition.y < 0.1f)
		{
			isOn = true;
			rectT.anchoredPosition.y = targetPositionY;
		}
	}
	else{
		rectT.anchoredPosition.y -= Time.deltaTime * downSpeed;
		if(rectT.anchoredPosition.y - lastPositionY < 0.1f)
		{
			isOn = true;
			rectT.anchoredPosition.y = lastPositionY;
			wrapUp();
		}
	}
}

function messageReceiver () {
	isOn = false;
	imageIdle = true;
	systemObj.SendMessage("clickPossibility", false);
	ads.PlayOneShot(paperSound,paperSoundVol);
}

function clickRec () {
	clickRecC = false;
	yield WaitForSeconds(delay);
	imageIdle = false;
	isOn = false;
	clickRecC = true;
}

function wrapUp () {
	ads.PlayOneShot(paperDownSound,paperDownSoundVol);
	yield WaitForSeconds(callBackdelay);
	systemObj.SendMessage("clickPossibility", true);
	this.enabled = false;
}

function spriteChange () {
	spriteNum++;
	GetComponent.<UI.Image>().sprite = sprite[spriteNum];
}