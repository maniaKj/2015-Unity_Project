#pragma strict
var mouseTexture : Texture2D;
var mouseTexture2 : Texture2D;
var clickObj : GameObject[];
var clickNum : int[];
var eventObj : GameObject[];
var eventNumbering : int = 0;
var clearButton : GameObject;
var clearBack : GameObject;
var clearDelay : float = 1.5f;
var alphaSpeed : float = 3.0f;
var noiseSound : AudioClip;
var noiseSoundVol : float = 1.0f;
var ghostSound : AudioClip;
var ghostSoundVol : float = 1.0f;
var longBoom : AudioClip;
var longBoomVol : float = 1.0f;
var smokeSound : AudioClip;
var smokeSoundVol : float = 1.0f;
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
	Camera.main.GetComponent.<Animator>().SetInteger("stage",4);
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
	//0.paper 1.vase 2.closed book 3.bed
	switch(eventNumbering){
		case 0:
			//phase 1
			if(clickNum[0] >= 1 && lastClickObj == 0){
				//paperUp
				eventObj[0].GetComponent.<paper>().enabled = true;
				eventObj[0].GetComponent.<paper>().messageReceiver();
			}
			
			if(clickNum[3] >= 1 && lastClickObj == 3 && e_1){
				//bed smoke
				ads.PlayOneShot(smokeSound,smokeSoundVol);
				eventObj[1].SetActive(true);
				e_1 = false;
			}
			
			if(clickNum[2] >= 1 && lastClickObj == 2){
				//book photo up
				eventObj[8].GetComponent.<paper>().enabled = true;
				eventObj[8].GetComponent.<paper>().messageReceiver();
				e_2 = false;
			}
			
			if(!e_1 && !e_2){
				eventNumbering = 1;
				phaseChange();
			}
			break;
		case 1 :
			if(clickNum[0] >= 1 && lastClickObj == 0){
				//paperUp
				eventObj[0].GetComponent.<paper>().enabled = true;
				if(e_1){
					eventObj[0].GetComponent.<paper>().spriteChange();
					e_1 = false;
				}
				eventObj[0].GetComponent.<paper>().messageReceiver();
			}
			
			if(clickNum[3] >= 1 && e_2 && lastClickObj == 3){
				//vase appear
				////eventObj[5].SetActive(true);
				eventObj[5].GetComponent.<UI.Image>().color.a = 1.0f;
				eventObj[5].GetComponent.<particleDestroy>().messageReceiver3();
				clickObj[1].SetActive(true);
				e_2 = false;
				yield WaitForSeconds(1.0f);
				ads.PlayOneShot(longBoom,longBoomVol);
			}
			
			if(clickNum[2] >= 1 && !e_2 && e_3 && lastClickObj == 2){
			//wall ghost illusion
				ads.PlayOneShot(ghostSound,ghostSoundVol);
				eventObj[4].SetActive(true);
				eventObj[4].GetComponent.<ghostWall>().messageReceiver();
				e_3 = false;
			}
			
			if(!e_1 && !e_2 && !e_3 && lastClickObj == 1){
				eventNumbering = 2;
				phaseChange();
				eventObj[6].SetActive(true);
				eventObj[6].GetComponent.<ghostAppear>().enabled = true;
				eventObj[6].GetComponent.<ghostAppear>().messageReceiver();
				ads.PlayOneShot(ghostSound,ghostSoundVol);
			}
			break;
		case 2 :
			if(clickNum[1] >= 2 && lastClickObj == 1 && e_1){
				//something moving
				eventObj[7].SetActive(true);
				eventObj[7].GetComponent.<illusionMoving>().messageReceiver();
				clickNum[1] = 0;
				e_1 = false;
			}
			
			if(clickNum[3] >= 1 && e_3 && lastClickObj == 3){
				//man up
				eventObj[2].GetComponent.<manControl>().enabled = true;
				eventObj[2].GetComponent.<manControl>().messageReceiver();
				e_3 = false;
			}
			
			if(clickNum[0] >= 1 && lastClickObj == 0){
				//paperUp
				eventObj[0].GetComponent.<paper>().enabled = true;
				if(e_2){
					eventObj[0].GetComponent.<paper>().spriteChange();
					e_2 = false;
				}
				eventObj[0].GetComponent.<paper>().messageReceiver();
			}
			
			if(clickNum[1] >= 2 && !e_1 && !e_2 && !e_3 && e_4 && lastClickObj == 1)
			{
				//end game + man moving
				eventObj[5].GetComponent.<UI.Image>().color.a = 1.0f;
				eventObj[3].SetActive(true);
				ads.PlayOneShot(noiseSound,noiseSoundVol);
				e_4 = false;
				////eventObj[5].SetActive(true);
				StartCoroutine(clear());
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
	yield WaitForSeconds(0.3f);
	eventObj[5].GetComponent.<UI.Image>().color.a = 0.5f;
	yield WaitForSeconds(2.5f);
	eventObj[5].SetActive(false);
	clearBack.SetActive(true);
	yield WaitForSeconds(clearDelay);
	clearButton.SetActive(true);
	clearAlpha = true;
}