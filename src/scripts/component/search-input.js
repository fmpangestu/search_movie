class SearchInput extends HTMLElement {
  constructor() {
    super();
    this.searchDom = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  set clickEvent(event) {
    this._clickEvent = event;
    this.render();
  }

  get value() {
    return this.searchDom.querySelector(".input-keyword").value;
  }

  render() {
    this.searchDom.innerHTML = ` 
    <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
            rel="stylesheet"/>            

 <style>
 *{
 margin:0;
 padding: 0;
 }
 .input-keyword{
 font-style: italic;
 border-radius: 9px 9px 9px 9px !important;
 border: none;
 background-color: #5a8172;
 }
 .input-keyword:focus{
 box-shadow: none;
 background-color: #93B1A6;
 color: #040D12;
 }
 .input-keyword:focus::placeholder{
 color: #040D12;
 }
 .btn{
 background-color: #5a8172;
 border-radius: 9px;
 border: none;
 left: 4px;
 color:#040D12;
 }
 .btn:hover{
 background-color: #93B1A6;
 color: #040D12;
 }
 h5{
 color: #93B1A6;
 margin-top: 10%;
 }
 .icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color:rgb(48,60,69) ;
}
@media (max-width: 1200px) {
h5{
margin-top: 15%;
}
}@media (max-width: 786px) {
h5{
margin-top: 15%;
}
}
 @media(max-width: 480px){
 .btn{
 display: none;
 margin-top: 13%;
 }
 h5{
 margin-top: 20%;
 }
 }
 @media (max-width: 330px) {
 h5{
 font-size:12px;
 margin-top: 15%;
 }
 .input-group{
 width: 80%;
 left: 25px;
 }
 }
 </style>
            <div class="row search justify-content-center align-items-center">
                <div class="col-md-8">
                    <h5>Search Movie</h5>
                <div class="input-group mb-3">
                    <input type="text" class="form-control input-keyword" placeholder="Film Kesukaan mu">
                    <div class="input-group-append">
                        <button class="btn btn-outline search-button" type="button"
                        >Search
                        </button>
                        <i class="icon">
                        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd">
                        <path d="M15.853 16.56c-1.683 1.517-3.911 2.44-6.353 2.44-5.243 0-9.5-4.257-9.5-9.5s4.257-9.5 9.5-9.5 9.5 4.257 9.5 9.5c0 2.442-.923 4.67-2.44 6.353l7.44 7.44-.707.707-7.44-7.44zm-6.353-15.56c4.691 0 8.5 3.809 8.5 8.5s-3.809 8.5-8.5 8.5-8.5-3.809-8.5-8.5 3.809-8.5 8.5-8.5z"/></svg></i>
                    </div>
                </div>
              </div>
            </div>
            `;
    this.searchDom
      .querySelector(".input-keyword")
      .addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          if (this._clickEvent) {
            this._clickEvent();
          }
        }
      });
    this.searchDom
      .querySelector(".search-button")
      .addEventListener("click", this._clickEvent);
  }
}

customElements.define("search-bar", SearchInput);
