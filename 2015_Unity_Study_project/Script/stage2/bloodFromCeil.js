//blood drop from ceil
#pragma strict
var bloodSpread : GameObject;
var waterSound : GameObject;

function OnCollisionEnter(){
	var c = Instantiate(waterSound, transform.position, Quaternion.identity);
	c.GetComponent.<lastSound>().messageReceiver(0);
	bloodSpread.SetActive(true);
	Destroy(gameObject);
}