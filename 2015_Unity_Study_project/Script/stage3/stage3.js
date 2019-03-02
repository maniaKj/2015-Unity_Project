#pragma strict
var mouseTexture : Texture2D;
var mouseTexture2 : Texture2D;
var clickObj : GameObject[];
var clickNum : int[];
var eventObj : GameObject[];
var eventNumbering : int = 0;
var clearButton : GameObject;
var clearDelay : float = 1.5f;
var alphaSpeed : float = 3.0f;
var screamSound : AudioClip;
var screamSoundVol : float = 1.0f;
var ghostSound : AudioClip;
var ghostSoundVol : float = 1.0f;
private var clearAlpha : boolean = false;
private var alphaLerp : float;
private var e_1 : boolean = true;
private var e_2 : boolean = true;
private var e_3 : boolean = true;
private var e_4 : boolean = true;
private var i : int;
private var lastClickObj : int;
private var ads : AudioSource;

function Awake () {
	Camera.main.GetComponent.<Animator>().SetInteger("stage",3);
	ads = GetComponent.<AudioSource>();
	clickNum = new int[clickObj.length];
	for(i=0 ; i< clickObj.length; i++){
		clickObj[i].GetComponent.<click>().objNum = i;			
		clickObj[i].GetComponent.<click>().mouseClickTexture = mouseTexture;
		clickObj[i].GetComponent.<click>().mouseClickTexture2 = mouseTexture2;
		clickObj[i].GetComponent.<click>().hotspot = Vector2(mouseTexture.width/2, mouseTexture.height/2);
		Cursor.SetCursor(mouseTexture2,Vector2(mouseTexture.width/2, mouseTexture.height/2),CursorMode.Auto);
	}	
}

function FixedUpdate(){
	if(Input.GetKeyDown(KeyCode.P))
	{
		Application.LoadLevel("stage1");
	}
	if(clearAlpha)
	imageOn();
}

function getClickSignal(objNum : int) {
	clickNum[objNum]++;
	lastClickObj = objNum;
	eventManager();
	
	Debug.Log("end");
}

function eventManager() {
	//0.paper 1.vase 2.photo 3.lighter 4.bed 5.rabbit 6.lamp
	switch(eventNumbering){
		case 0:
			//phase 1
			if(clickNum[0] >= 1 && lastClickObj == 0){
				//paperUp
				eventObj[0].GetComponent.<paper>().enabled = true;
				eventObj[0].GetComponent.<paper>().messageReceiver();
			}
			
			if(clickNum[2] >= 1 && lastClickObj == 2){
				//photo Up
				eventObj[1].GetComponent.<paper>().enabled = true;
				eventObj[1].GetComponent.<paper>().messageReceiver();
			}
			
			if(clickNum[5] >= 1 && lastClickObj == 5){
				//doll photo up
				eventObj[2].GetComponent.<paper>().enabled = true;
				eventObj[2].GetComponent.<paper>().messageReceiver();
			}
			
			if(clickNum[1] >= 1 && e_1 && lastClickObj == 1){
				//flower bleeding
				clickObj[1].GetComponent.<flower>().enabled = true;
				clickObj[1].GetComponent.<flower>().messageReceiver();
				clickObj[1].GetComponent.<flowerbleeding>().enabled = true;
				clickObj[1].GetComponent.<flowerbleeding>().messageReceiver();
				e_1 = false;
			}
			
			if(clickNum[0] >= 1 && clickNum[2] >= 1 && clickNum[6] >= 1 && !e_1 && lastClickObj == 1){
				phaseChange();
				eventNumbering = 1;
			}
			break;
		case 1:
			if(clickNum[0] >= 1 && lastClickObj == 0){
				//paperUp
				eventObj[0].GetComponent.<paper>().enabled = true;
				if(e_1){
					eventObj[0].GetComponent.<paper>().spriteChange();
					e_1 = false;
				}
				else if (e_3){
					eventObj[0].GetComponent.<paper>().spriteChange();
					e_3 = false;
				}
				eventObj[0].GetComponent.<paper>().messageReceiver();
			}
			
			if(clickNum[4] >= 1 && e_4 && lastClickObj == 4){
				//bed blood spread
				eventObj[7].SetActive(true);
			 	eventObj[7].GetComponent.<BloodAppear>().enabled = true;
			 	eventObj[7].GetComponent.<BloodAppear>().messageReceiver();
			 	e_4 = false;
			}
			
			if(clickNum[5] >= 2 && e_2 && lastClickObj == 5){
				//knife droop
				eventObj[3].GetComponent.<knife>().enabled = true;
				eventObj[3].GetComponent.<knife>().messageReceiver();
				e_2 = false;
			}
			
			if(!e_1 && !e_2 && !e_3 && !e_4 && lastClickObj == 1){
				eventNumbering = 2;
				phaseChange();
				eventObj[6].SetActive(true);
				eventObj[6].GetComponent.<ghostAppear>().enabled = true;
				eventObj[6].GetComponent.<ghostAppear>().messageReceiver();
				ads.PlayOneShot(ghostSound,ghostSoundVol);
			 } 
			break;
		case 2:
			//phase3
			if(clickNum[3] >= 1 && lastClickObj == 3){
				//lighter photo up
				eventObj[4].GetComponent.<paper>().enabled = true;
				eventObj[4].GetComponent.<paper>().messageReceiver();
				clickObj[3].SetActive(false);
				e_1 = false;
			}
			
			if(!e_1 && lastClickObj == 2){
				//photo burn
				eventObj[5].SetActive(true);
				eventObj[5].GetComponent.<burn>().messageReceiver();
				clear();
			}
			break;
	}
	
}

function clickPossibility(OnOff : boolean) {
	for(i=0;i<clickObj.length; i++)
	clickObj[i].GetComponent.<click>().clickPossible = OnOff;
}

function phaseChange(){
	for(i=0;i<clickObj.length;i++)
	clickNum[i] = 0;
	e_1 = true;
	e_2 = true;
	e_3 = true;
	e_4 = true;
}

function imageOn () {
	alphaLerp += Time.deltaTime * alphaSpeed;
	clearButton.GetComponent.<UI.Image>().color.a = alphaLerp;
	if(alphaLerp > 1.0f)
	clearAlpha = false;
}

function clear() {
	clickPossibility(false);
	yield WaitForSeconds(clearDelay);
	ads.PlayOneShot(screamSound,screamSoundVol);
	clearButton.SetActive(true);
	clearAlpha = true;
}