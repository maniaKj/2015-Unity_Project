#pragma strict
var FR : float = 30.0f;
function Start () {
	QualitySettings.vSyncCount = 0;
	Application.targetFrameRate = FR;
	Screen.SetResolution(720,350,true);
}
