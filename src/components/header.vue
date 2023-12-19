<template>
  <div class="header">
    <div class="logo">
      <span style="color: rgba(97, 134, 243); margin-left: 2px;">S</span>
      <span style="color: rgba(200, 65, 48);margin-left: 2px;">c</span>
      <span style="color: rgba(233, 187, 18);margin-left: 2px;">h</span>
      <span style="color: rgba(107, 168, 87);margin-left: 2px;">o</span>
      <span style="color: rgba(97, 134, 243);margin-left: 2px;">l</span>
      <span style="color: rgba(200, 65, 48);margin-left: 2px;">a</span>
      <span style="color: rgba(233, 187, 18);margin-left: 2px;">r</span>
      <span style="color: rgba(107, 168, 87);margin-left: 2px;">S</span>
      <span style="color: rgba(97, 134, 243);margin-left: 2px;">H</span>
      <span style="color: rgba(200, 65, 48);margin-left: 2px;">I</span>
      <span style="color: rgba(233, 187, 18);margin-left: 2px;">P</span>
    </div>
    <div class="menu1">高级搜索</div>
    
    
    <div class="search">
      <div class="form-control">
        <input class="input input-alt" placeholder="搜索......" required="" type="text">
        <span class="input-border input-border-alt"></span>
      </div>

    </div>
    <div class="menu2">
      <button class="btn">
        <span class="box">
          个人中心
        </span>
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header {
  height: 60px;
  display: flex;
  margin: 0px 20px 0px 20px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
  border-bottom-left-radius: 5px;  /* 左下角 */
  border-bottom-right-radius: 5px; /* 右下角 */

  .logo {
    width: 25%;
    line-height: 60px;
    text-align: center;
    font-weight: bold;
    font-size: 30px;
    // background-color: pink;
  }

  .menu1 {
    width: 10%;
    line-height: 60px;
    text-align: center;
    font-weight: bold;
    font-size: 15px;
  }

  .search {
    width: 50%;
    padding: 10px;

    .input {
      color: #000000;
      font-size: 0.9rem;
      background-color: transparent;
      width: 100%;
      box-sizing: border-box;
      padding-inline: 0.5em;
      padding-block: 0.7em;
      border: none;
      border-bottom: var(--border-height) solid var(--border-before-color);
      box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset;
      border-radius: 15px
    }

    .input-border {
      position: absolute;
      background: var(--border-after-color);
      width: 0%;
      height: 2px;
      bottom: 0;
      left: 0;
      transition: width 0.3s cubic-bezier(0.6, -0.28, 0.735, 0.045);
    }

    .input:focus {
      outline: none;
    }

    .input:focus+.input-border {
      width: 100%;
    }

    .form-control {
      position: relative;
      --width-of-input: 300px;
    }

    .input-alt {
      font-size: 1.2rem;
      padding-inline: 1em;
      padding-block: 0.8em;
    }

    .input-border-alt {
      height: 3px;
      background: linear-gradient(90deg, #FF6464 0%, #FFBF59 50%, #47C9FF 100%);
      transition: width 0.4s cubic-bezier(0.42, 0, 0.58, 1.00);

    }

    

    .input-alt:focus+.input-border-alt {
      width: 100%;
    }

    // line-height: 60px;
    // text-align: center;
    // font-weight: bold;
    // font-size: 18px;
    // background-color: rgb(192, 255, 225);

  }

  .menu2 {
    width: 15%;
    line-height: 60px;
    text-align: center;
    font-weight: bold;
    font-size: 18px;

    .btn {
      margin-top: 5px;

      .box {
        width: 100%;
        height: auto;
        float: left;
        transition: .1s linear;
        position: relative;
        display: block;
        overflow: hidden;
        padding: 15px;
        text-align: center;
        margin: 0 5px;
        background: transparent;
        text-transform: uppercase;
        font-weight: 900;
        border-radius: 10px;
        
      }
    }

    // background-color: rgb(255, 192, 192);


    .box:before {
      position: absolute;
      content: '';
      left: 0;
      bottom: 0;
      height: 4px;
      width: 100%;
      border-bottom: 4px solid transparent;
      border-left: 4px solid transparent;
      box-sizing: border-box;
      transform: translateX(100%);
    }

    .box:after {
      position: absolute;
      content: '';
      top: 0;
      left: 0;
      width: 100%;
      height: 4px;
      border-top: 4px solid transparent;
      border-right: 4px solid transparent;
      box-sizing: border-box;
      transform: translateX(-100%);
    }

    .box:hover {
      box-shadow: rgba(0, 0, 0, 0.5) 0px 1px 2px 0px;
    }

    // .box:hover:before {
    //   border-color: #262626;
    //   height: 100%;
    //   transform: translateX(0);
    //   transition: .3s transform linear, .3s height linear .3s;
    // }

    // .box:hover:after {
    //   border-color: #262626;
    //   height: 100%;
    //   transform: translateX(0);
    //   transition: .3s transform linear, .3s height linear .5s;
    // }

    button {
      color: black;
      text-decoration: none;
      cursor: pointer;
      outline: none;
      border: none;
      background: transparent;
    }

    // #btn:hover,
    // :focus {
    //   color: #000000;
    //   background: #006207;
    //   border: 1px solid #008cff;
    //   text-shadow: 0 0 5px #ffffff,
    //     0 0 10px #ffffff,
    //     0 0 20px #ffffff;
    //   box-shadow: 0 0 5px #008cff,
    //     0 0 20px #008cff,
    //     0 0 50px #008cff,
    //     0 0 100px #008cff;
    // }
  }
}
</style>