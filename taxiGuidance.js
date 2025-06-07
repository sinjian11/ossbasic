function simulateTaxiArrival(userLat, userLng) {
  const status = document.getElementById("status");
  status.textContent = "택시가 도착했습니다.";
  speak("택시가 도착했습니다. 택시 위치로 안내를 시작합니다.");

  // 택시 위치 시뮬레이션
  let taxiLat = userLat + 0.0003;
  let taxiLng = userLng + 0.0003;

  const interval = setInterval(() => {
    const distance = getDistance(userLat, userLng, taxiLat, taxiLng);
    status.textContent = `택시까지 거리: ${distance.toFixed(2)}m`;

    if (distance < 5) {
      clearInterval(interval);
      speak("택시 바로 앞에 있습니다. 조심해서 탑승하세요.");
    } else {
      speak(`택시까지 ${distance.toFixed(0)}미터 남았습니다.`);
      taxiLat -= 0.00005;
      taxiLng -= 0.00005;
    }
  }, 4000);
}

