/*
Copyright 2017 Ziadin Givan

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

https://github.com/givanz/Vvvebjs
*/
import httpInstance from '../../../src/utils/http'
Vvveb.Gui.download =
  function () {
    let assets = [];

    function addUrl(url, href, binary) {
      assets.push({ url, href, binary });
    }
    function dataURLtoBlob(dataurl) {
      var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime })
    }
    let html = Vvveb.Builder.frameHtml;

    //stylesheets
    $("link[href$='.css']", html).each(function (i, e) {
      addUrl(e.href, e.getAttribute("href"), false);
    });

    //javascripts
    $("script[src$='.js']", html).each(function (i, e) {
      addUrl(e.src, e.getAttribute("src"), false);
    });

    //images
    $("img[src]", html).each(function (i, e) {
      addUrl(e.src, e.getAttribute("src"), true);
    });


    let zip = new JSZip();
    let promises = [];

    for (i in assets) {
      let asset = assets[i];
      let url = asset.url;
      let href = asset.href;
      let binary = asset.binary;

      let filename = href.substring(href.lastIndexOf('/') + 1);
      let path = href.substring(0, href.lastIndexOf('/')).replace(/\.\.\//g, "");
      if (href.indexOf("://") > 0) {
        //ignore path for external assets
        path = "";
      }

      promises.push(new Promise((resolve, reject) => {

        let request = new XMLHttpRequest();
        request.open('GET', url);
        if (binary) {
          request.responseType = 'blob';
        } else {
          request.responseType = 'text';
        }

        request.onload = function () {
          if (request.status === 200) {
            resolve({ url, href, filename, path, binary, data: request.response, status: request.status });
          } else {
            //reject(Error('Error code:' + request.statusText));
            console.error('Error code:' + request.statusText);
            resolve({ status: request.status });
          }
        };

        request.onerror = function () {
          reject(Error('There was a network error.'));
        };

        // Send the request
        try {
          request.send();
        } catch (error) {
          console.error(error);
        }
        /*  
        $.ajax({
          url: url,
          type: 'GET',
         
          success: function (data) {
            resolve({url, href, filename, binary, data});
          },
          error: function (error) {
            reject(error)
          },
        });
        */
      }));
    }

    Promise.all(promises).then((data) => {
      let html = Vvveb.Builder.getHtml();

      for (i in data) {
        let file = data[i];
        let folder = zip;

        if (file.status == 200) {
          if (file.path) {
            file.path = file.path.replace(/^\//, "");
            folder = zip.folder(file.path);
          } else {
            folder = zip;
          }

          let url = (file.path ? file.path + "/" : "") + file.filename.trim().replace(/^\//, "");
          html = html.replace(file.href, url);

          folder.file(file.filename, file.data, { base64: file.binary });
        }
      }

      zip.file("index.html", html);
      zip.generateAsync({ type: "blob" })
        .then(function (content) {
          saveAs(content, Vvveb.FileManager.getCurrentPage());
          // console.log(html)
          let myWindow = window.open('', '', 'width:100%,height:100%');
          let myWindowDocument = myWindow.document;
          myWindowDocument.write(html) //info为html的字符串
          myWindowDocument.close()//必须关闭流，否则表单不生效
          // myWindow.focus();
          // console.log(window.frames["myframe1"].document.getElementById("needCanvas").innerHTML);
          // console.log(Vvveb.FileManager.getCurrentPage());
          // document.getElementById("frameCanvas").src="http://localhost:8080/public/demo/"+Vvveb.FileManager.getCurrentPage()+"/index.html";
          // console.log("http://localhost:8080/public/demo/"+Vvveb.FileManager.getCurrentPage()+"/index.html")
          // var xx = window.frames["myframe1"].document.getElementById("needCanvas").innerHTML;
          // console.log(window.frames["myframe1"].document.getElementById("needCanvas").innerHTML);

          // console.log(html)
          // document.getElementById("ss").innerHTML = xx;
          setTimeout(() => {
            let element = myWindowDocument.body;
            html2canvas(element, {
              useCORS: true,
              // height:'100%',
              // scale: 2, // 处理模糊问题
              // dpi: 300, // 处理模糊问题
            }).then(async canvas => {
              let ak = document.createElement('a');
              ak.href = canvas.toDataURL();
              ak.download = Vvveb.FileManager.getCurrentPage() + '.png';
              ak.click();
              // var blob = dataURLtoBlob(canvas.toDataURL());
              // const formData = new FormData()
              // formData.append('file', blob)
              let a = document.createElement('img');
              var d64 = canvas.toDataURL("image/png")
              // console.log(d64)
              // var img = new Image()
              // img.src = d64
              // myWindowDocument.body.appendChild(img);
              let url = location.search; //获取url中"?"符后的字串
              // console.log(url)
              let workId = ''
              if (url) {
              	url = url.substring(1)
              	let urlList = url.split('&')
              	workId = urlList[0].split('=')[1]
              	// let password = urlList[1].split('=')[1]
              	// console.log(name)
              }
              await httpInstance.post('/page_add', {
                protoName: Vvveb.FileManager.getCurrentPage(),
                workIs: workId, 
                protoInclude: d64
              }).then(res => {
                console.log(res)
              })
              // var imgurl = canvas.toBlob((blob) => {
              //   //以时间戳作为文件名 实时区分不同文件 按需求自己定义就好
              //   let filename = `${new Date().getTime()}.jpg`;
              //   //转换canvas图片数据格式为formData
              //   let file2 = new File([blob], filename, { type: 'image/jpg' });
              //   let formData = new FormData();
              //   formData.append('file', file2);
              //   console.log(formData)
              //   //将转换为formData的canvas图片 上传到服务器
              //   // this.axios.post('后台接口地址', formData).then(res => {
              //   //   //图片上传成功之后，再调用对应的其他接口，传递指定的参数
              //   //   if (res.data.state == 200) {
              //   //     this.axios.post('后台接口地址', {
              //   //       img: res.data.data,
              //   //       type: 0
              //   //     }).then(res => {
              //   //       console.log(res);
              //   //     })
              //   //   }
              //   // })
              // })
            });

          }, 1000);
          // html2canvas(element).then(canvas => {
          //   let a = document.createElement('a');
          //   a.href = canvas.toDataURL();
          //   a.download = Vvveb.FileManager.getCurrentPage() + '.png';
          //   a.click();
          // });
        });
    }).catch((error) => {
      console.log(error)
    })
  };
