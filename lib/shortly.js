// Generated by CoffeeScript 1.6.2
(function() {
  $(function() {
    var base64, check, checksum, deflated, encoded, input, isMobile, mobileCallBack;

    checksum = function(string) {
      var chk, chr, i;

      chk = 0;
      for (i in string) {
        chr = string[i];
        chk += chr.charCodeAt(0) * (i + 1);
      }
      return chk % 10;
    };
    mobileCallBack = function(encoded) {
      var newURL;

      newURL = window.location.protocol + "//" + document.domain + window.location.pathname + "#" + encoded;
      return window.prompt("Your URL has been generated:", newURL);
    };
    isMobile = {
      Android: function() {
        if (navigator.userAgent.match(/Android/i)) {
          return true;
        } else {
          return false;
        }
      },
      BlackBerry: function() {
        if (navigator.userAgent.match(/BlackBerry/i)) {
          return true;
        } else {
          return false;
        }
      },
      iOS: function() {
        if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
          return true;
        } else {
          return false;
        }
      },
      Windows: function() {
        if (navigator.userAgent.match(/IEMobile/i)) {
          return true;
        } else {
          return false;
        }
      },
      any: function() {
        return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows();
      }
    };
    if (isMobile.any()) {
      $("textarea").css({
        "height": "200px"
      });
    }
    $('#save-button').click(function() {
      var base64, check, deflated, encoded, input;

      input = $('#input-field').get(0).value;
      deflated = RawDeflate.deflate(input);
      base64 = Base64.toBase64(deflated);
      check = checksum(base64);
      encoded = base64 + check;
      if (isMobile.any()) {
        mobileCallBack(encoded);
      }
      return window.location.hash = encoded;
    });
    if (window.location.hash) {
      encoded = window.location.hash.replace(/^#/, '');
      base64 = encoded.slice(0, +(encoded.length - 2) + 1 || 9e9);
      check = parseInt(encoded.slice(encoded.length - 1, +encoded.length + 1 || 9e9));
      if (check !== checksum(base64)) {
        return alert('Something got corrupted :(');
      } else {
        deflated = Base64.fromBase64(base64);
        input = RawDeflate.inflate(deflated);
        return $('#input-field').get(0).value = input;
      }
    }
  });

}).call(this);
