class AppBar extends HTMLElement {
  constructor() {
    super();
    this.seaDom = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.seaDom.innerHTML = `
<style>
*{
margin: 0;
padding: 0;
}
:host{
display: block;
  position: fixed;
  z-index: 1000;
width: 100%;
height: 55px;
background-color: #183D3D;
}
h1{
position: absolute;
left: 30px;
color: #5a8172;
}
span{
color: #93B1A6;
}
            @media (max-width: 768px) {
            h1{
            margin-top: 7px;
            left: 7px;
            font-size: 25px;
            }
             @media(max-width:330px ){
 h1{font-size: 15px;}
 :host{
 height: 40px;}
 }
 }
</style>
            <h1><i>Mov<span>Free.</span></i></h1>
            `;
  }
}

customElements.define("app-bar", AppBar);
