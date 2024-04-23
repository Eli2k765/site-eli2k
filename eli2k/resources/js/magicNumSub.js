function validateIPAddress(ipAddress) {
  const ipPattern = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
  return ipPattern.test(ipAddress);
}

function validateSubnetMask(subnetMask) {
  return validateIPAddress(subnetMask);
}

function calculateNetworkID2(event) {
  event.preventDefault();
  const ipInput = document.getElementById("ip-input").value;
  const maskInput = document.getElementById("mask-input").value;

  if (!validateIPAddress(ipInput)) {
    document.getElementById("calcResult2").innerHTML = "Invalid input format. Please enter an IP address (e.g. 165.245.77.14).";
    return;
  }

  if (!validateSubnetMask(maskInput)) {
    document.getElementById("calcResult2").innerHTML = "Invalid input format. Please enter a subnet mask in a classful notation (e.g. 255.255.240.0).";
    return;
  }

  const ipOctets = ipInput.split(".");
  const maskOctets = maskInput.split(".");
  const networkIDOctets = [0, 0, 0, 0];
  const broadcastIDOctets = [0, 0, 0, 0];

  for (let i = 0; i < 4; i++) {
    if (maskOctets[i] == 255) {
      networkIDOctets[i] = ipOctets[i];
      broadcastIDOctets[i] = ipOctets[i];
    } else if (maskOctets[i] == 0) {
      networkIDOctets[i] = 0;
      broadcastIDOctets[i] = 255;
    } else {
      const magicNumber = 256 - maskOctets[i];
      const multiple = Math.floor(ipOctets[i] / magicNumber);
      networkIDOctets[i] = multiple * magicNumber;
      broadcastIDOctets[i] = networkIDOctets[i] + magicNumber - 1;
    }
  }

  const resultsDiv = document.getElementById('calcResult2');
  resultsDiv.innerHTML = `
    <h4>Results</h4>
    <p>IP address: ${ipInput}</p>
    <p>Subnet mask: ${maskInput}</p>
    <p>Magic number: ${256 - maskOctets[2]}</p>
    <p>NetworkID: ${networkIDOctets.join(".")}</p>
    <p>BroadcastID: ${broadcastIDOctets.join(".")}</p>
    <br>
    <h4>Steps</h4>
    <p>1. Split the IP address into octets: ipOctets.split(".")</p>
    <p>2. Split the subnet mask into octets: maskOctets.split(".")</p>
    <p>3. Initialize network ID octets to zero: networkIDOctets = [0, 0, 0, 0]</p>
    <p>4. Loop for each octet:</p>
    <p>  a. If maskOctets[i] is 255, copy ipOctets[i] to networkIDOctets[i] and broadcastIDOctets[i]</p>
    <p>  b. If maskOctets[i] is 0, set networkIDOctets[i] to 0 and broadcastIDOctets[i] to 255</p>
    <p>  c. If maskOctets[i] is neither 255 nor 0:</p>
    <p>     - Calculate magicNumber as 256 - maskOctets[i]</p>
    <p>     - Calculate multiple as Math.floor(ipOctets[i] / magicNumber)</p>
    <p>     - Set networkIDOctets[i] to multiple * magicNumber</p>
    <p>     - Set broadcastIDOctets[i] to networkIDOctets[i] + magicNumber - 1</p>
    <p>5. Update results div with calculated values</p>
  `;
}

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('form2');
  form.addEventListener('submit', calculateNetworkID2);
});