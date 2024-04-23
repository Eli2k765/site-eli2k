function calculateNetworkID(event) {
  event.preventDefault();

  const input = document.getElementById('cidr-input').value.trim(); // get the input value and remove leading/trailing whitespace
  const cidrPattern = /^([0-9]{1,3}\.){3}[0-9]{1,3}\/([0-9]|[1-2][0-9]|3[0-2])$/; // regex pattern to validate input format

  if (!cidrPattern.test(input)) { // check if input matches pattern
    const resultsDiv = document.getElementById('calcResult');
    resultsDiv.innerHTML = '<p class="error">Invalid input format. Please enter an IP address and subnet mask in CIDR notation (e.g. 192.168.0.123/24).</p>';
    return;
  }

  const [ipAddress, subnetMaskLengthStr] = input.split('/'); // split input into IP address and subnet mask length
  const subnetMaskLength = parseInt(subnetMaskLengthStr); // convert subnet mask length to integer
  const ipAddressBinary = ipAddress.split('.').map(decimal => parseInt(decimal).toString(2).padStart(8, '0')).join(''); // convert each octet of the IP address to binary and join them
  const subnetMaskBinary = '1'.repeat(subnetMaskLength).padEnd(32, '0'); // generate the subnet mask in binary
  const networkIDBinary = ipAddressBinary.split('').map((bit, index) => bit & subnetMaskBinary[index]).join(''); // generate the network ID in binary by ANDing each bit of the IP address and the subnet mask
  const networkID = networkIDBinary.match(/.{1,8}/g).map(binary => parseInt(binary, 2)).join('.'); // convert each octet of the network ID to decimal and join them

  // Calculate the broadcast ID
  const broadcastIDBinary = networkIDBinary.slice(0, subnetMaskLength) + '1'.repeat(32 - subnetMaskLength); // flip the host bits of the network ID to get the broadcast ID in binary
  const broadcastID = broadcastIDBinary.match(/.{1,8}/g).map(binary => parseInt(binary, 2)).join('.'); // convert each octet of the broadcast ID to decimal and join them

  const resultsDiv = document.getElementById('calcResult');
  resultsDiv.innerHTML = `
    <h4>Results</h4>
    <p>IP address: ${ipAddress}</p>
    <p>Binary IP: ${ipAddressBinary}</p>
    <p>Binary subnet mask: ${subnetMaskBinary}</p>
    <p>Binary Network ID: ${networkIDBinary}</p>
    <p>Binary Broadcast ID: ${broadcastIDBinary}</p>
    <p>Network ID: ${networkID}</p>
    <p>Broadcast ID: ${broadcastID}</p>
    <h4>Steps</h4>
    <p>1. Split the input into IP address and subnet mask length using '/' as the delimiter.</p>
    <p>3. Convert each octet of the IP address to binary and join them together to form a binary representation of the IP address.</p>
    <p>4. Generate the subnet mask in binary by repeating the string '1' for subnetMaskLength times and padding the result with '0' to make it 32 bits long.</p>
    <p>5. Generate the network ID in binary by performing a bitwise AND operation (&) on each bit of the binary IP address and the binary subnet mask, and then join the resulting bits together.</p>
    <p>6. Convert each octet of the network ID from binary to decimal and join them together to form the decimal representation of the network ID.</p>
    <p>7. Calculate the broadcast ID in binary by flipping the host bits (i.e., the bits after the subnet mask length) of the network ID to '1' and padding the result with '0' to make it 32 bits long.</p>
    <p>8. Convert each octet of the broadcast ID from binary to decimal and join them together to form the decimal representation of the broadcast ID.</p>
  `;
}

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('form1');
  form.addEventListener('submit', calculateNetworkID);
});