#pragma strict
var bloodPack : GameObject;
var blood : GameObject;
var bloodDrop : GameObject[] = new GameObject[4];
var fallPosition : Vector3[] = new Vector3[4];
var fallScale : Vector3;
private var i : int;

function Awake () {
	for(i=0;i<bloodDrop.length;i++){
		fallPosition[i] = bloodDrop[i].transform.position;
	}
	fallScale = bloodDrop[1].transform.localScale;
}

function FixedUpdate () {
	if(Input.GetKeyDown(KeyCode.A)){
		messageReceiver();
	}
}

function messageReceiver() {
	StartCoroutine(event());
}

function bleeding(t : int) {
	var b = Instantiate(blood, Vector3(0,0,0), Quaternion.identity);
	b.transform.parent = bloodPack.transform;
	b.transform.rotation.eulerAngles = Vector3(90,0,0);
	b.transform.position = fallPosition[t];
	b.transform.localScale = fallScale;
	
	Debug.Log(i);
}

function firstbleeding(t:int){
	bloodDrop[t].SetActive(true);
}

function event() {
	firstbleeding(2);
	yield WaitForSeconds(0.2f);
	firstbleeding(3);
	yield WaitForSeconds(0.3f);
	firstbleeding(1);
	yield WaitForSeconds(0.1f);
	firstbleeding(0);
	yield WaitForSeconds(0.2f);
	bleeding(1);
	yield WaitForSeconds(0.3f);
	bleeding(3);
	yield WaitForSeconds(0.1f);
	bleeding(0);
	yield WaitForSeconds(0.2f);
	bleeding(2);
	yield WaitForSeconds(0.1f);
	bleeding(2);
	yield WaitForSeconds(0.2f);
	bleeding(3);
	yield WaitForSeconds(0.2f);
	bleeding(1);
	yield WaitForSeconds(0.3f);
	bleeding(0);
	yield WaitForSeconds(0.1f);
	bleeding(2);
	yield WaitForSeconds(0.2f);
	bleeding(0);
	yield WaitForSeconds(0.1f);
	bleeding(3);
	yield WaitForSeconds(0.1f);
	bleeding(0);
	yield WaitForSeconds(0.3f);
	bleeding(1);
	yield WaitForSeconds(0.1f);
	bleeding(2);
	yield WaitForSeconds(0.2f);
	bleeding(3);
	yield WaitForSeconds(0.1f);
}