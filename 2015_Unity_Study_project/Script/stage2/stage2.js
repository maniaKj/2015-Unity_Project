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
var noiseSound : AudioClip;
var noiseSoundVol : float = 1.0f;
var smokeSound : AudioClip;
var smokeSoundVol : float = 1.0f;
var ghostSound : AudioClip;
var ghostSoundVol : float = 1.0f;
var toiletSound : AudioClip;
var toiletSoundVol : float = 1.0f;
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
	Camera.main.GetComponent.<Animator>().SetInteger("stage",2);
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
	//1.paper 2. vase 3. toilet 4. tub 5. basin 6. cabinet 7. bottle 8. cutton
	switch(eventNumbering){
		case 0:
			//phase1
			if(clickNum[0] >= 1 && lastClickObj == 0){
				//paperUp
				eventObj[0].GetComponent.<paper>().enabled = true;
				eventObj[0].GetComponent.<paper>().messageReceiver();
				e_1 = false;
			}
			
			if(clickNum[6] >= 1 && lastClickObj == 6){
				//medicine photo up
				eventObj[6].GetComponent.<paper>().enabled = true;
				eventObj[6].GetComponent.<paper>().messageReceiver();
			}
			
			if(clickNum[5] >= 1 && e_2 && lastClickObj == 5){
				//cabinet Open
				clickObj[5].GetComponent.<cabinet>().enabled = true;
				clickObj[5].GetComponent.<cabinet>().messageReceiver();
				e_2 = false;
			}
			
			if(clickNum[1] >= 1 && lastClickObj == 1 && e_3){
				//flower color change
				clickObj[1].GetComponent.<flower>().enabled = true;
				clickObj[1].GetComponent.<flower>().messageReceiver();
				e_3 = false;
			}
			
			if(clickNum[7] >= 1 && lastClickObj == 7 && e_4){
				//cutton
				clickObj[7].GetComponent.<cutton>().enabled = true;
				clickObj[7].GetComponent.<cutton>().messageReceiver();
				e_4 = false;
			}
			
			if(!e_1 && !e_2 && !e_3 && !e_4 && lastClickObj == 1){
				eventNumbering = 1;
				phaseChange();
				eventObj[5].SetActive(true);
				eventObj[5].GetComponent.<ghostAppear>().enabled = true;
				eventObj[5].GetComponent.<ghostAppear>().messageReceiver();
				ads.PlayOneShot(ghostSound,ghostSoundVol);
			}
			break;
		case 1:
			//phase 2
			if(clickNum[0] >= 1 && lastClickObj == 0){
				//paperUp
				eventObj[0].GetComponent.<paper>().enabled = true;
				if(e_1){
					eventObj[0].GetComponent.<paper>().spriteChange();
					e_1 = false;
				}
				eventObj[0].GetComponent.<paper>().messageReceiver();
			}
			
			if(clickNum[6] >= 1 && lastClickObj == 6){
				//medicine photo up
				eventObj[6].GetComponent.<paper>().enabled = true;
				eventObj[6].GetComponent.<paper>().messageReceiver();
			}
			
			if(clickNum[3] >= 1 && e_2 && lastClickObj ==3){
				//tub smoke
				eventObj[1].SetActive(true);
				ads.PlayOneShot(smokeSound,smokeSoundVol);
				e_2 = false;
			}
			
			if(clickNum[2] >= 1 && e_3 && lastClickObj == 2){
				//toilet blood boom
				eventObj[2].GetComponent.<bloodwater>().enabled = true;
				eventObj[2].GetComponent.<bloodwater>().messageReceiver();
				ads.PlayOneShot(toiletSound,toiletSoundVol);
				e_3 = false;
			}
			
			if(!e_3 && !e_2 && !e_1 && lastClickObj == 1){
				eventNumbering = 2;
				phaseChange();
			}
	
			break;
		case 2 :
			//phase3
			if(clickNum[2] >= 1 && clickNum[3] >= 1 && clickNum[4] >= 1 && clickNum[0] >= 1 && e_1 && lastClickObj == 0){
				//head up form bath
				eventObj[4].GetComponent.<upDown>().enabled = true;
				eventObj[4].GetComponent.<upDown>().messageReceiver();
				e_1 = false;
			}
			
			if(clickNum[0] >= 2 && clickNum[2] >= 2 && clickNum[3] >= 1 && clickNum[4] >=1 && !e_1 && e_4 && lastClickObj == 1){
				//blood drop from cell
				eventObj[3].SetActive(true);
				e_4 = false;
			}
			
			if(clickNum[0] >= 1 && lastClickObj == 0){
				//paperUp
				eventObj[0].GetComponent.<paper>().enabled = true;
				if(e_2){
					eventObj[0].GetComponent.<paper>().spriteChange();
					e_2 = false;
				}
				
				if(!e_4 && e_3){
					eventObj[0].GetComponent.<paper>().spriteChange();
					e_3 = false;
				}
				eventObj[0].GetComponent.<paper>().messageReceiver();
			}
			
			if(!e_1 && !e_2 && !e_3 && lastClickObj == 1){
				eventNumbering = 3;
				phaseChange();
				// flower
				clickObj[1].GetComponent.<flower>().enabled = true;
				clickObj[1].GetComponent.<flower>().messageReceiver();
				
			}
			break;
		case 3 :
			if(clickNum[0] >= 1 && e_1 &&lastClickObj == 0){
				//bottle Drop
				clickObj[6].GetComponent.<bottle>().enabled = true;
				clickObj[6].GetComponent.<bottle>().messageReceiver();
				e_1 = false;
			}
			if(clickNum[6] >= 1&& !e_1 && lastClickObj == 6){
				//stage end
				eventObj[5].SetActive(true);
				eventObj[5].GetComponent.<ghostAppear>().enabled = true;
				eventObj[5].GetComponent.<ghostAppear>().messageReceiver();
				clickObj[6].GetComponent.<bottle>().messageReceiver2();
				clickPossibility(false);
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
	clearButton.SetActive(true);
	clearAlpha = true;
}