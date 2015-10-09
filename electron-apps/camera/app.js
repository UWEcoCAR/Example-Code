navigator.webkitGetUserMedia({video: true, audio: true}, // Standard HTML5 call for AV kernel read
  function(stream) {
    document.getElementById('camera').src = URL.createObjectURL(stream);
  },
  function() {
    alert('could not connect stream');
  }
);
