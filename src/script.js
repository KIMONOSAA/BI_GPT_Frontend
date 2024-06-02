(function () {
    "use strict";
    //--------------------------------------------------------------------
    //let server = "http://172.18.176.137:9877"; // 广轻工内网 , 请用校园网 （优先打码, 稳定）
    let server = "http://sdfasdddd112f.gnway.cc"; // 外网接口 (稳定性不作保证)
   
    //--------------------------------------------------------------------
    let SIMINPUTFROM_CONNET_AUTOINCREM = 0;
    let submits_count = 0;
   
    window.verify = function () {
      setTimeout(() => {
        try {
          let base_dom = document.querySelector("body").lastChild.childNodes[1].childNodes[0];
          let img_dom = base_dom.childNodes[0].childNodes[2].firstChild.firstChild;
          let info = base_dom.childNodes[1].firstChild.firstChild.innerHTML;
          GM_xmlhttpRequest({
            url: server + "/recognize-url/?url=" + img_dom.src + "&info=" + info,
            method: "POST",
            data: "",
            headers: {
              "Content-type": "application/x-www-form-urlencoded",
              accept: "application/json",
            },
            onload: function (xhr) {
              if (xhr.responseText != "Internal Server Error") {
                let result = JSON.parse(xhr.responseText);
                if (result.state == 200) {
                  let rect = img_dom.getBoundingClientRect();
                  let point_x = rect.left;
                  let point_y = rect.top;
                  let c_x = point_x + 300 * result.message.X;
                  let c_y = point_y + 150 * result.message.Y;
   
                  var clickEvent = new MouseEvent("mousedown", {
                    bubbles: true,
                    cancelable: true,
                    view: unsafeWindow,
                    clientX: c_x,
                    clientY: c_y,
                  });
                  img_dom.dispatchEvent(clickEvent);
                } else {
                  console.log("无法识别,正在重试...");
                  let refresh_vc_dom = document.querySelector("body").lastChild.childNodes[1].childNodes[1].childNodes[1];
                  refresh_vc_dom.click();
                  verify();
                }
              } else {
                console.log("网络错误,正在重试...");
                let refresh_vc_dom = document.querySelector("body").lastChild.childNodes[1].childNodes[1].childNodes[1];
                refresh_vc_dom.click();
                verify();
              }
            },
          });
        } catch {
          console.log("验证码没有找到!");
        }
      }, 1000);
    };
   
    window.edit_text = function () {
      let info_text = "";
      var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < 10; i++) info_text += characters.charAt(Math.floor(Math.random() * charactersLength));
   
      let input_1 = document.querySelector("body > div.container > section > div.mdc-form.mdc-form--horizontal > div:nth-child(1) > div > input");
      let input_2 = document.querySelector(
        "body > div.container > section > div.mdc-form.mdc-form--horizontal > div:nth-child(2) > div > span.mdc-text-field__resizer > textarea"
      );
      let connet = document.getElementById("ueditor_" + SIMINPUTFROM_CONNET_AUTOINCREM + "").contentWindow.document.querySelector("body > p");
      let submit_btn = document.querySelector("body > div.container > section > div.actions > div > button:nth-child(2) > div");
      input_1.value = info_text;
      input_2.value = info_text;
      connet.innerHTML = "<p>" + info_text + "</p>";
   
      var event = document.createEvent("HTMLEvents");
      event.initEvent("input", true, true);
      event.eventType = "message";
   
      input_1.dispatchEvent(event);
      input_2.dispatchEvent(event);
      connet.dispatchEvent(event);
   
      SIMINPUTFROM_CONNET_AUTOINCREM++;
      setTimeout(() => {
        submit_btn.click();
        verify();
      }, 1000);
    };
   
    window.scan_succeed = function () {
      let d;
      let _t = setInterval(() => {
        d = document.querySelector("body > div.container > section > div.mdc-alert.mdc-alert--success > div");
        if (d != null) {
          submits_count++;
          if (submits_count >= 20) {
            document.querySelector("head > title").innerHTML = "🎉 恭喜您已完成! ";
            clearInterval(_t);
          } else {
            wait_cd();
            clearInterval(_t);
          }
        }
      }, 1000);
    };
   
    window.wait_cd = function () {
      let t = 60;
   
      let _t = setInterval(() => {
        document.querySelector("head > title").innerHTML = `🎉&nbsp;${String(submits_count)}&nbsp;/&nbsp;${String(t)}`;
        t = t - 1;
        if (t == 0) {
          wait_cd_after();
          document.querySelector("head > title").innerHTML = "😴 等待验证口令...";
          clearInterval(_t);
        }
      }, 1000);
    };
   
    window.wait_cd_after = function () {
      let continueTo = document.querySelector(
        "body > div.container > section > div.mdc-alert.mdc-alert--success > div > p > a:nth-child(2) > div.mdc-button__ripple"
      );
      continueTo.click();
   
      setTimeout(() => {
        edit_text();
        scan_succeed();
      }, 1000);
    };
   
    setTimeout(() => {
      edit_text();
      scan_succeed();
    }, 2000);
  })();