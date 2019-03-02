//blood drop from the flower
#pragma strict
var lastSound : GameObject;
function OnCollisionEnter(){
	var c = Instantiate(lastSound, transform.position, Quaternion.identity);
	c.GetComponent.<lastSound>().messageReceiver(0);
	Destroy(gameObject);
}