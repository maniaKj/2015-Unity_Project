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
var highlightSound : AudioClip;
var highlightSoundVol : float = 1.0f;
var ghostSound : AudioClip;
var ghostSoundVol : float = 1.0f;
var axeSound : AudioClip;
var axeSoundVol : float = 1.0f;
var axeSoundTerm : float = 0.6f;
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
	Camera.main.GetComponent.<Animator>().SetInteger("stage",1);
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
	switch(eventNumbering){
	 //0.door 1.flower 2.tv 3.cabinet 4.hammer 5.paper
		case 0:
			//phase 1
			if(clickNum[1]>=1&&e_1 && lastClickObj == 1){
				e_1 = false;
				//flower swing
				clickObj[1].GetComponent.<flowerSwing>().enabled = true;
				clickObj[1].GetComponent.<flowerSwing>().messageReceiver();
			}
			
			if(clickNum[2] >= 1 &&e_2 && lastClickObj == 2){
				e_2 = false;
				//TV OnOff
				clickObj[2].GetComponent.<TvOn>().enabled = true;
				clickObj[2].GetComponent.<TvOn>().messageReceiver();
			}
			
			if(clickNum[5] >= 1 && lastClickObj == 5){
				//paperUp
				eventObj[1].GetComponent.<paper>().enabled = true;
				eventObj[1].GetComponent.<paper>().messageReceiver();
				e_3 = false;
			}
			
			if(clickNum[0]>=1&&e_4 && lastClickObj == 0){
				//handler moving
				eventObj[3].GetComponent.<doorHandler>().enabled = true;
				eventObj[3].GetComponent.<doorHandler>().messageReceiver();
				e_4 = false;
			}
			
			if(!e_1 && !e_2 && !e_3 && !e_4 && lastClickObj == 1){
				eventObj[4].SetActive(true);
				eventObj[4].GetComponent.<ghostAppear>().enabled = true;
				eventObj[4].GetComponent.<ghostAppear>().messageReceiver();
				ads.PlayOneShot(ghostSound,ghostSoundVol);
				eventNumbering = 1;
				for(i=0 ; i< clickObj.length; i++)
				clickNum[i] = 0;
				e_1 = true;
				e_2 = true;
				e_3 = true;
				e_4 = true;
			}
			break;
		case 1:
			//phase 2
			if(clickNum[1] >= 2 && e_1 && lastClickObj == 1){
				e_1 = false;
				//flower color change
				clickObj[1].GetComponent.<flower>().enabled = true;
				clickObj[1].GetComponent.<flower>().messageReceiver();
			 } 
			 
			 if(clickNum[2] >= 2 && e_2 && lastClickObj == 2){
				e_2 = false;
				//TV On with strange image
				clickObj[2].GetComponent.<TvOn>().enabled = true;
				clickObj[2].GetComponent.<TvOn>().changeTo = 2;
				clickObj[2].GetComponent.<TvOn>().messageReceiver();
			 } 
			 
			 if(clickNum[1] >=4 && !e_1 && e_3 && lastClickObj == 1){
			 	e_3 = false;
			 	//carpet blood spread
			 	eventObj[0].SetActive(true);
			 	eventObj[0].GetComponent.<BloodAppear>().enabled = true;
			 	eventObj[0].GetComponent.<BloodAppear>().messageReceiver();
			 }
			 if(clickNum[5] >= 1 && lastClickObj == 5){
				//paperUp
				eventObj[1].GetComponent.<paper>().enabled = true;
				if(e_4)
				eventObj[1].GetComponent.<paper>().spriteChange();
				eventObj[1].GetComponent.<paper>().messageReceiver();
				e_4 = false;
			}
			 
			 if(!e_1 && !e_2 && !e_3 && !e_4){
				eventNumbering = 2;
				for(i=0 ; i< clickObj.length; i++)
				clickNum[i] = 0;
				e_1 = true;
				e_2 = true;
				e_3 = true;
				e_4 = true;
			}
			break;
		case 2:
			//phase3
			if(clickNum[3] >= 1 && e_1 && !e_4 && lastClickObj == 3){
				e_1 = false;
				//cabinet opening + bad feeling ost
				clickObj[3].GetComponent.<cabinet>().enabled = true;
				clickObj[3].GetComponent.<cabinet>().messageReceiver();
			} 
			
			if(clickNum[5] >= 1 && lastClickObj == 5){
				//hammer photo up
				eventObj[1].GetComponent.<paper>().enabled = true;
				if(e_4)
				eventObj[1].GetComponent.<paper>().spriteChange();
				eventObj[1].GetComponent.<paper>().messageReceiver();
				e_4 = false;
			}
			
			if(clickNum[4] >= 1 && !e_1 && e_2 &&lastClickObj == 4){
				//hammer photo up
				eventObj[5].GetComponent.<paper>().enabled = true;
				eventObj[5].GetComponent.<paper>().messageReceiver();
				e_2 = false;
			}
			
			if(clickNum[4] >= 3 && !e_1 && !e_2 && e_3 && lastClickObj == 4){
				e_3 = false;
				ads.PlayOneShot(highlightSound,highlightSoundVol);
				StartCoroutine(axeSoundF());
				eventObj[2].SetActive(true);
				//highlight&&stage Clear
			}
			break;
	}
}

function axeSoundF(){
	ads.PlayOneShot(axeSound,axeSoundVol);
	yield WaitForSeconds(axeSoundTerm);
	ads.PlayOneShot(axeSound,axeSoundVol);
	yield WaitForSeconds(axeSoundTerm);
	ads.PlayOneShot(axeSound,axeSoundVol);
	clear();
}

function clickPossibility(OnOff : boolean) {
	for(i=0;i<clickObj.length; i++)
	clickObj[i].GetComponent.<click>().clickPossible = OnOff;
}

function clickNumClear(t : int){
	clickObj[t].GetComponent.<click>().clickNum = 0;
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
	clearButton.SetActive(true);
	clearAlpha = true;
}